import {Injectable} from '@angular/core';
import {
//	    FormGroup,
//		FormArray,
	    FormBuilder,
	    Validators
//	    FormControl
} from '@angular/forms';

//import {Http,  Response ,  Headers, RequestOptions} from '@angular/http';


@Injectable()
export class  TranslateService{

    constructor( private fb: FormBuilder  ){}


	//zdbedna funkcja - a jest ona bo taka jest struktura w api serwerowym
	//do refaktoryzacji api serwera
	transformObj( data : any, id : number ){
		let out = {};

		let t: any = {};
		for( var i=0; i<data.translates.length; i++ ){

			t[data.translates[i]['type']] = {};
			for( var i=0; i<data.translates.length; i++ ){
				t[data.translates[i]['type']][ data.translates[i]['lang']] = data.translates[i]['value'];
			}
		}
		delete( data.translates);
		data.translates = t;
		data.id = id;
		out['data'] = data;

		return JSON.stringify( out );
	}

	initTranslate( lang: string, type: string, value: string ){
        return this.fb.group({
			lang:  [lang, Validators.required],
			type:  [type, Validators.required],
			value: [value, Validators.required]
        });
	}

}
