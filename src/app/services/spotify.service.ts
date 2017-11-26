import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable()
export class SpotifyService{
private searchUrl: string;
private base_url: string;
private artistUrl: string;
private token: string;
private albumsUrl: string;
private albumUrl: string;

constructor(private http: Http, private router: Router){

}


searchMusic(str:string, type='artist', token:string){
    this.base_url = 'https://api.spotify.com/v1/search?';
    this.searchUrl = this.base_url + 'query=' +str+ '&offset=0&limit=20&type='+type+'&market=US';
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(this.searchUrl, {headers:headers})
            .map(res => res.json());        
  } 
  
  getArtist(id: string){
    console.log(id);
    this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
    let headers = new Headers();
    this.token = localStorage.getItem('access_token');
    //console.log(this.token);
    headers.append('Authorization', 'Bearer ' + this.token);
    return this.http.get(this.artistUrl, {headers:headers})
      .map(res => res.json());
    }

    getAlbums(artistId: string){
      console.log(artistId);
      this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
      let headers = new Headers();
      this.token = localStorage.getItem('access_token');
      //console.log(this.token);
      headers.append('Authorization', 'Bearer ' + this.token);
      return this.http.get(this.albumsUrl, {headers:headers})
        .map(res => res.json());
      }
    
      getAlbum(artistId: string){
        console.log(artistId);
        this.albumUrl = 'https://api.spotify.com/v1/albums/' + artistId;
        let headers = new Headers();
        this.token = localStorage.getItem('access_token');
        ///console.log(this.token);
        headers.append('Authorization', 'Bearer ' + this.token);
        return this.http.get(this.albumUrl, {headers:headers})
          .map(res => res.json());
        }
      
}



