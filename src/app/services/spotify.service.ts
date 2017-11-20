import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService{
private searchUrl: string;
private redirect_uri: string;
//private client_id = 'b0a17de4c18e4565859e3ee9fee63baf';
//private client_secret = '6b2bd269568347e0b4e62b211b158ac7';
private access_token = 'BQBqs50wg9gJKh4S5vsRmkSy91NSCJPJr_f-lxbQGS-b1vpu8aLsob7_VlEJn6NNPSI1t6iGZZv-IDey3FShkji_sGmGmqoshkPpjrwNNLoUnPa1n3nfOJckygn2P4CPFPWy33y7Sxr_SRq9PHvFPTedi-OveeA';
//private encodedStr = btoa(this.client_id + ':' + this.client_secret);
private base_url: string;
private url: string;

constructor(private http: Http){

}

getToken(){
    const body = {'grant_type':'client_credentials'};
    var params = ('grant_type=client_credentials');

    var headers = new Headers();
  //  this.url = 'http://localhost:3000/proxy?url=https://accounts.spotify.com/api/token';
    this.url = 'http://localhost:3000/spotify/api/token';
    //headers.append('Authorization','Basic ' +  this.encodedStr);
    headers.append('Content-Type','application/x-www-form-urlencoded');
    
    
    return this.http.post(this.url, body, {headers:headers})
            .map(res => res.json());
            
}

searchMusic(str:string, type='artist', token:string){
    this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
    let headers = new Headers();
    headers.append('Authorization', 'Bearer' + this.access_token);
    return this.http.get(this.searchUrl, {headers:headers}).
            map(res => res.json());
}


}