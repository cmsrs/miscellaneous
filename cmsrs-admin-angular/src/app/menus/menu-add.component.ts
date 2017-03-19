import { Component, OnInit  } from '@angular/core';
import { MenuEdit } from './menu-edit';
import {MenuService} from './menu.service';
import {SharedService} from '../main/shared.service';
import { TranslateService } from  '../translates/translate.service';

import {
	    FormGroup,
		FormArray,
	    FormBuilder,
	    Validators,
	    FormControl
} from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'menu-add',
	templateUrl: 'app/menus/menu-form.html'
})

export class MenuAddComponent  implements OnInit{
	public menuForm: FormGroup;

	//public menu: MenuEdit = {};
	public id : number = 0;
	public menu: MenuEdit;
	public langs: any = [];
    public isEdit: boolean = false;
	public positions: number[];
	errorMessage: string;


	constructor( private menuService: MenuService, 
				private translateService: TranslateService, 
				private router: Router,  
				private sharedService: SharedService,
				private fb: FormBuilder	
			   ){
    }

	ngOnInit(){
		this.sharedService.getConfig().subscribe( 
			config => {
				let langs =  config.langs;
				this.langs =  langs;

				let control = <FormArray>this.menuForm.controls['translates'] ;
				for (var index = 0; index < langs.length; index++  ) {
					//console.log(langs[index]+"====");
					control.push( this.translateService.initTranslate( langs[index], 'menu_short_title', '' ) );
				}
			},
			error => {
				console.log( error );
			}
		);

		this.menuForm = this.fb.group({
			published: false,  //['', Validators.required ], 
			position:  ['', Validators.required ], 
			translates: this.fb.array([
			])
		});

		this.menuService.getMenuById( this.id ).subscribe(
			menu => {
				this.positions = this.menuService.getPositions( menu.menus_count );
			},
			error => {
				console.log( error );
			}
		);
	}
	

	log(val: any) { console.log(val); }

	onSubmit(f: NgForm) {

		let data =  this.translateService.transformObj( f.value, this.id );

		this.menuService.createMenu( data ).
			subscribe(
				menu  => {
					this.router.navigateByUrl('/menu-list');
				}, 
				error => {
					this.errorMessage = <any>error;
					console.log( error );
				}
			);				
	}

}
