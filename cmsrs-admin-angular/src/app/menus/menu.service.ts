import {Injectable} from '@angular/core';
import {Http,  Response ,  Headers, RequestOptions} from '@angular/http';
import { UserService } from '../users/user.service';
//import { Menu } from './menu';
//import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuService{

	private options : any;
	private apiUrlGetMenus =  "http://cmsrs2admin.loc/api/menus/index";
	private apiUrlGetMenu =  "http://cmsrs2admin.loc/api/menus/get";
	private apiUrlDelMenu = "http://cmsrs2admin.loc/api/menus/delete"; 
	private apiUrlSaveMenu = "http://cmsrs2admin.loc/api/menus/save"; 


    //constructor(private http: Http ,  private menuService: MenuService  , private _router: Router ){
    constructor( private http: Http,  private userService: UserService ){

        let headers = new Headers({ 'Authorization': 'Bearer ' +  userService.getToken() });
		headers.append( 'Content-Type', 'application/json'  );
        let options = new RequestOptions({ headers: headers });

		//let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

		this.options = options;
    }

	getMenus() : Observable<Response>  {
		let ret =  this.http.get( this.apiUrlGetMenus, this.options  )
			.map(
				( res : Response )   => {
					//console.log(res.status);
					//console.log(res);
					return res.json().out;
				}
			);
		return ret;
	}

	getMenuById( id : number ) : Observable<any>  {
		let ret =  this.http.get( this.apiUrlGetMenu+'/'+id.toString(), this.options  )
			.map(
				( res : Response )   => {
					//console.log(res.status);
					//console.log(res);
					return res.json().out;
				}
			);
		return ret;
	}


	deleteMenu(id : number ) :  Observable<Response>  {
		let out = this.http.delete(  this.apiUrlDelMenu+'/'+id.toString(), this.options );
		return out;
	}

    createMenu(menu : any) : Observable<Response> {
		//console.log( menu  );
        return  this.http.post( this.apiUrlSaveMenu, menu  , this.options );
						//.map(this.extractData)
						//.catch(this.handleError);
	}

	getPositions( menusCount: number  ) : number[] {

		var positions: any = [];
		for( var i=0; i < menusCount; i++ ){
			positions[i] = i+1;
		}
		return positions;
	}

}
