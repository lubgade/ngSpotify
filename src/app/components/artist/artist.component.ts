import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Artist} from '../../../Artist';
import {Album} from '../../../Album';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import{AuthService} from '../Auth/auth.service';


@Component({
    moduleId: module.id,  
    selector: 'artist',
    templateUrl: 'artist.component.html',
    //providers: [SpotifyService]
  })

  export class ArtistComponent implements OnInit{
    id: string;
    artist: Artist[];
    albums: Album[];
    isLoggedIn$: Observable<boolean>;
    

    constructor(private spotifyService: SpotifyService,
                private route: ActivatedRoute,
                private authService: AuthService ){

    }

    ngOnInit(){
      this.isLoggedIn$ = this.authService.isLoggedIn;        
      this.route.params.
      map(params => params['id'])
      .subscribe((id) => {  
        this.spotifyService.getArtist(id)
        .subscribe(artist => {
          this.artist = artist;
          console.log(this.artist);
        })
        this.spotifyService.getAlbums(id)
        .subscribe(albums => {
          this.albums = albums.items;
          console.log(this.albums);
        })
      });
    }
  }
  
