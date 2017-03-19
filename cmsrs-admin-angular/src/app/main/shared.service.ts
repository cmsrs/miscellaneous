import {Injectable} from '@angular/core';
import {Http,  Response ,  Headers, RequestOptions} from '@angular/http';
import { UserService } from '../users/user.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService{

	private apiUrlGetConfig  = 'http://cmsrs2admin.loc/api/main/getconfig'; 
	private options : any;

    constructor(private http: Http, private  userService: UserService ){
		//let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        let headers = new Headers({ 'Authorization': 'Bearer ' +  userService.getToken() });
        let options = new RequestOptions({ headers: headers });
		this.options = options;
    }


    getConfig() {
        let ret =  this.http.get( this.apiUrlGetConfig, this.options  )
		            .map(
							( res : Response )   => {
		                    //console.log(res.json()  );
		                    return res.json();
							}
			            );
		//console.log( ret );
	    return ret;
	}

}
