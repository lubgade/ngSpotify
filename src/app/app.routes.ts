import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router';

import {SearchComponent} from './components/search/search.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/login/login.component';
import {ModalComponent} from './components/modal/modal.component';
import {AuthGuard} from '../app/components/Auth/auth.guard';
import {ArtistComponent} from '../app/components/artist/artist.component';
import {AlbumComponent} from '../app/components/album/album.component';

const routes: Routes = [
    /*{
        path : '',
        component: AboutComponent
    },*/
    {
        path: 'loginAngular',
        component: LoginComponent,
    },
    {
        path: '',
        component: SearchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'artist/:id',
        component: ArtistComponent
    },
    {
        path: 'album/:id',
        component: AlbumComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class routing {}