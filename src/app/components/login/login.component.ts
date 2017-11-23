import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {AuthService} from '../Auth/auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,  
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [SpotifyService]
})

export class LoginComponent implements OnInit{
    isLoggedIn$: Observable<boolean>;
    access_token: string;
    refresh_token: string;
  
    constructor(private spotifyService:SpotifyService, 
                private authService: AuthService,
                private router: Router){

    }

    ngOnInit(){
      this.isLoggedIn$ = this.authService.isLoggedIn;  
      console.log(this.router.parseUrl(this.router.url).queryParams.access_token);
      this.access_token = this.router.parseUrl(this.router.url).queryParams.access_token;
      this.refresh_token = this.router.parseUrl(this.router.url).queryParams.refresh_token;
      if(this.access_token)
        this.authService.login(this.access_token, this.refresh_token);      
    }

    
}