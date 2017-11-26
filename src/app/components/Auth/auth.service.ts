import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Http} from '@angular/http';
import 'rxjs';

@Injectable()
export class AuthService{
    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    get isLoggedIn(){
        console.log(this.loggedIn);
        return this.loggedIn.asObservable();
    }

    constructor(private router: Router, private http: Http){

    }

    login(access_token, refresh_token){
        if(access_token)
        {
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            this.loggedIn.next(true);
            console.log(this.loggedIn);
            this.router.navigate(['/search']);
        }
        else
            this.router.navigate(['/']);
    }

    getAccessToken(refresh_token){
        return this.http.get('http://localhost:3000/refresh_token?refresh_token='+ refresh_token)
                       .map(res => res.json()); 

    }

    logout(){
        localStorage.removeItem('access_token');
        this.loggedIn.next(false);
        localStorage.removeItem('loggedIn');
        console.log(this.loggedIn);
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_time');
       /*this.http.get('http://localhost:3000/logout').
        toPromise().then(res => {
            console.log(res.json());
        });*/
        window.location.href = 'https://www.spotify.com/us/logout/';
        this.router.navigate(['/login']);        
    }

    private hasToken(): boolean{
        if(localStorage.getItem('access_token'))
            return true;
        else{
            return false;
        }
    }

}