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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'menu-edit',
	templateUrl: 'app/menus/menu-form.html'

})

export class MenuEditComponent  implements OnInit{
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
				private route: ActivatedRoute, 
				private sharedService: SharedService,
				private fb: FormBuilder	
			   ){
    }

	ngOnInit(){
		this.route.params.subscribe(params => {
			this.id = params['id'];
		});
		//console.log( this.id );

		this.menuForm = this.fb.group({
			published: false,  //['', Validators.required ], 
			position:  ['', Validators.required ], 
			translates: this.fb.array([
			])
		});


		this.menuService.getMenuById( this.id ).subscribe(
			menu => {
				this.positions = this.menuService.getPositions( menu.menus_count );

				this.menuForm = this.fb.group({
					published:  ('1' ===  menu.published) ? true : false,  //['', Validators.required ], 
					//position: [ this.positions[menu.position], Validators.required ], 
					position: [ parseInt(menu.position), Validators.required ], 
					translates: this.fb.array([
					])
				});

				let control = <FormArray>this.menuForm.controls['translates'] ;
				for (var lang in   menu.translates.menu_short_title ) {
					control.push( this.translateService.initTranslate( 
					  lang, 
					  'menu_short_title', 
					  menu.translates.menu_short_title[lang] 
					));
				}

				console.log( this.menuForm );

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
