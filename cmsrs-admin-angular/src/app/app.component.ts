import { Component } from '@angular/core';
import { AuthGuard } from './users/auth.guard';

@Component({
  selector: 'my-app',
  template: `
	<div  class="well">

		  <h4  [hidden]="authGuard.isLogged()"  class="text-center"><a routerLink='/'>CMSRS-ADMIN</a></h4>

          <nav    [hidden]="!authGuard.isLogged()"    class="navbar navbar-default">
            <div class="container-fluid">
	             <div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" routerLink="/">Admin Cmsrs</a> 
                 </div>
				 <div id="navbar" class="collapse navbar-collapse">
					<ul class="nav navbar-nav navbar-left">
                       <li><a routerLink="/menu-list">Menus</a></li>
                       <li><a routerLink="/page-list">Pages</a></li>
                    </ul>
					<ul class="nav navbar-nav navbar-right">
                       <li><a  (click)="logout()" >Log-out</a></li>
					</ul>
				 </div>
            </div>
          </nav>

		  <div class="container">
			 <router-outlet></router-outlet>
		  </div>
	</div>
  `,
})
export class AppComponent  { 

	
    constructor(  private authGuard: AuthGuard  ){
    }
	logout(){
		this.authGuard.logOut();
	}


}
