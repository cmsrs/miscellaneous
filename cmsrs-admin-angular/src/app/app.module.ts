import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule    } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { DesktopComponent }  from './desktop/desktop.component';
import {SharedService} from './main/shared.service';

import { LoginComponent }  from './users/login.component';
import { UserService } from './users/user.service';
import { AuthGuard } from './users/auth.guard';

import { MenuListComponent } from './menus/menu-list.component';
import { MenuAddComponent } from './menus/menu-add.component';
import { MenuEditComponent } from './menus/menu-edit.component';
import { MenuService } from './menus/menu.service';

import { TranslateService } from  './translates/translate.service';

import { PageListComponent } from './pages/page-list.component';

const appRoutes: Routes = [
	{path: 'login',     component: LoginComponent  },
	{path: 'menu-list', component: MenuListComponent },
	{path: 'menu-add',  component: MenuAddComponent },
	{path: 'menu-edit/:id', component: MenuEditComponent },
	{path: 'page-list', component: PageListComponent },

	{path: '', component: DesktopComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '' }
];


@NgModule({
  imports:      [ 
      BrowserModule,
	  ReactiveFormsModule, 
      HttpModule,
      FormsModule,
      RouterModule.forRoot(appRoutes)
  ],
  declarations: [ 
	  DesktopComponent,
	  LoginComponent,
	  MenuListComponent,
	  MenuAddComponent,
	  MenuEditComponent,
	  PageListComponent,
	  AppComponent 
  ],
  providers: [ 
	  AuthGuard,	  
	  UserService, 
	  SharedService,
	  TranslateService,
	  MenuService 
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

