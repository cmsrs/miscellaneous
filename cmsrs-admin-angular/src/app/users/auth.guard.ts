import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if ( this.isLogged()  ) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

	isLogged() : boolean {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
		return false;
	}

	logOut(){
        if ( this.isLogged()  ) {
			localStorage.removeItem('currentUser' );
			this.router.navigate(['/login']);
		}
	}


}
