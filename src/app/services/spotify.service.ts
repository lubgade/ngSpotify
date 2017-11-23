import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable()
export class SpotifyService{
private searchUrl: string;
private base_url: string;

constructor(private http: Http, private router: Router){

}


searchMusic(str:string, type='artist', token:string){
    this.base_url = 'https://api.spotify.com/v1/search?';
    this.searchUrl = this.base_url + 'query=' +str+ '&offset=0&limit=20&type='+type+'&market=US';
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(this.searchUrl, {headers:headers}).
            map(res => res.json());
  }            
}


