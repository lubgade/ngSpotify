import { Component } from '@angular/core';
import {AboutComponent} from './components/about/about.component';
import {SearchComponent} from './components/search/search.component'
import {NavbarComponent} from './components/navbar/navbar.components'

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  entryComponents: [SearchComponent, AboutComponent, NavbarComponent]
})
export class AppComponent {
  title = 'app';
}
