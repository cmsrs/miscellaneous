import {Injectable} from '@angular/core';
import {Http,  Response ,  Headers, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{

	private apiUrl = 'http://cmsrs2admin.loc/api/users/login'; 
	private options : any;


    constructor(private http: Http){
		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		this.options = options;
    }

	login(username: string, password: string): Observable<Response> { 

		var data_in = JSON.stringify( {data: { username: username, password: password }} );
		return this.http.post( this.apiUrl,  data_in, this.options );

	}

	getToken(){
		let currentUser = JSON.parse(  localStorage.getItem( 'currentUser' ) );
		return  currentUser.token;
	}


}
