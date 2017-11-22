import { Component } from '@angular/core';
import {AboutComponent} from './components/about/about.component';
import {SearchComponent} from './components/search/search.component';
import {NavbarComponent} from './components/navbar/navbar.components';
import {LoginComponent} from './components/login/login.component';
import {ModalComponent} from './components/modal/modal.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  entryComponents: [AboutComponent, NavbarComponent, LoginComponent]
})
export class AppComponent {
  title = 'app';
}
