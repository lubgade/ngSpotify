import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../Auth/auth.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,  
  selector: 'navbar',
  templateUrl: 'navbar.components.html',

})
export class NavbarComponent implements OnInit{
  isLoggedIn$:Observable<boolean>;

  constructor(private authService: AuthService, private router: Router){
}

  ngOnInit(){
    this.isLoggedIn$ = this.authService.isLoggedIn;

    console.log(this.isLoggedIn$);
  }


  onLogout(){
    this.authService.logout();
  }
}
