import { Component } from '@angular/core';

import { Router } from '@angular/router';
import {UserService} from './user.service';
import {
	        FormGroup,
	        FormBuilder,
	        Validators,
	        FormControl
		} from '@angular/forms';
import {NgForm} from '@angular/forms';


@Component({
  moduleId: module.id,
  selector: 'login',
  template: `

  <div  class="well">
        <div *ngIf="errorMessage"  class="alert alert-danger" >
	              Error: {{errorMessage}}. Try again.
	    </div>

        <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
            <div class="form-group">
                <label>Login</label>
                <input name="username" [(ngModel)]="user.username"   #username="ngModel"   class="form-control" required />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input name="password" type="password"  [(ngModel)]="user.password" #password="ngModel" class="form-control"  required />
			</div>
			<div class="text-center">
			     <button type="submit" class="btn btn-success" [disabled]="!f.form.valid">Login</button>
			</div>
		</form>

  </div>


  `,
})
export class LoginComponent  { 

	public user: any = {};
	//public accessToken: string = null;
	public errorMessage: string = null;

	constructor( private userService: UserService, private _router: Router  ){
	}

	onSubmit( f: NgForm ){
		this.userService.login( this.user.username, this.user.password )
		.subscribe(
			data  => {
				//this.accessToken = data.json().access_token;
				this.errorMessage = null;
				//console.log(   this.user.username+"  "+ this.accessToken );
				localStorage.setItem('currentUser',JSON.stringify({ username: this.user.username, token: data.json().access_token}));
				this._router.navigate(['/']);
		   },
			error => {
				console.log( error );
				//this.accessToken = null;
				this.errorMessage =  'Incorrect username or password';
			}
		);
	}

}
