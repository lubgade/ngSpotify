import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../Auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {Artist} from '../../../Artist';

@Component({
  moduleId: module.id,  
  selector: 'search',
  templateUrl: 'search.component.html',
  providers: [SpotifyService]
})

export class SearchComponent implements OnInit{
  private searchstr: string;
  access_token: string;
  refresh_token: string;
  isLoggedIn$: Observable<boolean>;
  searchRes: Artist[];

  constructor(private spotifyService: SpotifyService, 
              private router: Router, 
              private authService:AuthService){
  }

  ngOnInit(){
    this.isLoggedIn$ = this.authService.isLoggedIn;  
  }

  
  searchMusic(){
    this.access_token = localStorage.getItem('access_token');
    this.spotifyService.searchMusic(this.searchstr, 'artist', this.access_token).
    subscribe(res =>{
        this.searchRes = res.artists.items;
    });
  }

}