import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SpotifyService} from '../../services/spotify.service';
import {Album} from '../../../Album';
import {Observable} from 'rxjs/Observable';
import{AuthService} from '../Auth/auth.service';




@Component({
    moduleId: module.id,
    selector: 'album',
    templateUrl: 'album.component.html'
})

export class AlbumComponent implements OnInit{
    id: string;
    album: Album[];
    isLoggedIn$: Observable<boolean>;
    

    constructor(private spotifyService: SpotifyService,
                private route: ActivatedRoute,
                private authService: AuthService){

    }

    ngOnInit(){
        //this.isLoggedIn$ = this.authService.isLoggedIn;        
        this.route.params.
        map(params => params['id'])
        .subscribe((id) => {   
          this.spotifyService.getAlbum(id)
          .subscribe(album => {
            this.album = album;
            console.log(this.album);
          })
    });
}

}

