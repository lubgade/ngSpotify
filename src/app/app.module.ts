import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {Cookie} from 'ng2-cookies/ng2-cookies';

import { AppComponent } from './app.component';
import {NavbarComponent} from './components/navbar/navbar.components';
import {AboutComponent} from './components/about/about.component';
import {SearchComponent} from './components/search/search.component';
import {routing} from './app.routes';
import {LoginComponent} from './components/login/login.component';
import {ModalComponent} from './components/modal/modal.component';
import {SpotifyService} from './services/spotify.service';
import {AuthGuard} from '../app/components/Auth/auth.guard';
import {AuthService} from '../app/components/Auth/auth.service';
import {ArtistComponent} from '../app/components/artist/artist.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    SearchComponent,
    LoginComponent,
    ModalComponent,
    ArtistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    JsonpModule,
    BootstrapModalModule,
  ],
  providers: [SpotifyService, AuthService, AuthGuard, Cookie],
  bootstrap: [AppComponent]
})
export class AppModule { }
