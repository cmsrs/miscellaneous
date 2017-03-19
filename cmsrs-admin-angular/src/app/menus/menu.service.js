"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var user_service_1 = require('../users/user.service');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var MenuService = (function () {
    //constructor(private http: Http ,  private menuService: MenuService  , private _router: Router ){
    function MenuService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.apiUrlGetMenus = "http://cmsrs2admin.loc/api/menus/index";
        this.apiUrlGetMenu = "http://cmsrs2admin.loc/api/menus/get";
        this.apiUrlDelMenu = "http://cmsrs2admin.loc/api/menus/delete";
        this.apiUrlSaveMenu = "http://cmsrs2admin.loc/api/menus/save";
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + userService.getToken() });
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        this.options = options;
    }
    MenuService.prototype.getMenus = function () {
        var ret = this.http.get(this.apiUrlGetMenus, this.options)
            .map(function (res) {
            //console.log(res.status);
            //console.log(res);
            return res.json().out;
        });
        return ret;
    };
    MenuService.prototype.getMenuById = function (id) {
        var ret = this.http.get(this.apiUrlGetMenu + '/' + id.toString(), this.options)
            .map(function (res) {
            //console.log(res.status);
            //console.log(res);
            return res.json().out;
        });
        return ret;
    };
    MenuService.prototype.deleteMenu = function (id) {
        var out = this.http.delete(this.apiUrlDelMenu + '/' + id.toString(), this.options);
        return out;
    };
    MenuService.prototype.createMenu = function (menu) {
        //console.log( menu  );
        return this.http.post(this.apiUrlSaveMenu, menu, this.options);
        //.map(this.extractData)
        //.catch(this.handleError);
    };
    MenuService.prototype.getPositions = function (menusCount) {
        var positions = [];
        for (var i = 0; i < menusCount; i++) {
            positions[i] = i + 1;
        }
        return positions;
    };
    MenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map