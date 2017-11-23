import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router';

import {SearchComponent} from './components/search/search.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/login/login.component';
import {ModalComponent} from './components/modal/modal.component';
import {AuthGuard} from '../app/components/Auth/auth.guard';
import {ArtistComponent} from '../app/components/artist/artist.component';

const routes: Routes = [
    /*{
        path : '',
        component: AboutComponent
    },*/
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        component: SearchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    },
    {
        path: 'artist/:id',
        component: ArtistComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class routing {}