import {Component} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Artist} from '../../../Artist';
import {Album} from '../../../Album';

@Component({
    moduleId: module.id,  
    selector: 'artist',
    templateUrl: 'artist.component.html',
    //providers: [SpotifyService]
  })

  export class ArtistComponent{
    id: string;
    artist: Artist[];
    album: Album[];

    constructor(private spotifyService: SpotifyService){

    }
  }
  
