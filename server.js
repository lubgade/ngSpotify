var express  = require('express');
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const path = require('path');
//var referrerPolicy = require('referrer-policy');

//app.use(referrerPolicy({policy: 'none-when-downgrade'}));


var client_id = 'b0a17de4c18e4565859e3ee9fee63baf';
var client_secret = '6b2bd269568347e0b4e62b211b158ac7';
//var redirect_uri = 'http://localhost:3000/callback';
var redirect_uri = '/callback';
var show_dialog = true;

const port = process.env.PORT || 8080;
//const port = 3000;
//var access_token, refresh_token;

/*var spauthOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};



app.all("/spotify/api/token", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Credentials", "true");
    //res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   //console.log(req.url);  
   //var url = req.url.replace('/proxy?url=','');    
   console.log("Sending Request:" + spauthOptions.url);
   console.log(req.body);
   console.log(req.headers);
   (request.post(spauthOptions)).pipe(res);
  });
  */


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

//app.use(express.static(__dirname + 'public'))

app.use(express.static(path.join(__dirname, 'dist')));
app.use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
      show_dialg: show_dialog
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  //var redirect_uri = 'http://localhost:3000';

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        //console.log(response);
        console.log(body);
        
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          //console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        //var redirectBack = 'http://localhost:4200/loginAngular?';
        var redirectBack = '/loginAngular?';
        res.redirect(redirectBack +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.all('/logout', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  console.log(req);
  req.pipe(request.get('https://spotify.com/us/logout/'));
  //res.redirect('http://localhost:4200/loginAngular');  
  /*res.send({
    'log_out': true
  });*/
  
  /*.
  onRequestError(function(error){
    console.log(error);
  }),
  onRequestResponse(function(response){
    console.log(response);
  })).pipe(res);*/
  next();
});


app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () =>{
  console.log('Listening on port' + port);
});
