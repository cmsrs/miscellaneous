import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';

import { MenuService } from './menu.service';
import { Menu } from './menu';

@Component({
  selector: 'menu-list',
  template: `
<h2>Menus</h2>

<div class="panel panel-default row" ng-controller="menuListCtrl">

        <table class="table">
            <thead>
                <tr>
                    <th class="text-center">Id</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Published</th>
                    <th class="text-center">Position</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let item of menus">
                    <td class="text-center">{{item.id}}</td>
                    <td class="text-center">{{item.menu_short_title}}</td>
                    <td class="text-center">{{item.published}}</td>
                    <td class="text-center">{{item.position}}</td>
						<td><a [routerLink]="['/menu-edit', item.id ]" class="btn btn-small btn-primary">edit</a></td>
						<td><a (click)="deleteMenu(item.id)" class="btn btn-small btn-danger">delete</a></td>
                </tr>
            </tbody>

        </table>

        <div class="text-center">
            <a   [routerLink]="['/menu-add']" class="btn btn-primary">add</a>
        </div>
</div>
  `,
})
export class  MenuListComponent implements OnInit  { 
	menus: any;

    constructor( private menuService: MenuService  ){
    }

	ngOnInit(){
		this.menuService.getMenus().subscribe( menus => {
			//console.log( menus );
			this.menus = menus;
		});
	}

    deleteMenu( id: number ){
        this.menuService.deleteMenu(id).subscribe( del => {
            for( let i = 0; i < this.menus.length;i++ ){
                if( id == this.menus[i].id  ){
                    this.menus.splice(i, 1);
                }   
            }   
        }); 
    } 
}
