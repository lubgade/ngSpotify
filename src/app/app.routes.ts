import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router';

import {SearchComponent} from './components/search/search.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/login/login.component';
import {ModalComponent} from './components/modal/modal.component';
import {AuthGuard} from '../app/components/Auth/auth.guard';

const routes: Routes = [
    {
        path : '',
        component: AboutComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'search',
        component: SearchComponent,
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