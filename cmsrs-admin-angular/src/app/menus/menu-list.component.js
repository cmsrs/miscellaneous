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
//import { Router } from '@angular/router';
var menu_service_1 = require('./menu.service');
var MenuListComponent = (function () {
    function MenuListComponent(menuService) {
        this.menuService = menuService;
    }
    MenuListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuService.getMenus().subscribe(function (menus) {
            //console.log( menus );
            _this.menus = menus;
        });
    };
    MenuListComponent.prototype.deleteMenu = function (id) {
        var _this = this;
        this.menuService.deleteMenu(id).subscribe(function (del) {
            for (var i = 0; i < _this.menus.length; i++) {
                if (id == _this.menus[i].id) {
                    _this.menus.splice(i, 1);
                }
            }
        });
    };
    MenuListComponent = __decorate([
        core_1.Component({
            selector: 'menu-list',
            template: "\n<h2>Menus</h2>\n\n<div class=\"panel panel-default row\" ng-controller=\"menuListCtrl\">\n\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th class=\"text-center\">Id</th>\n                    <th class=\"text-center\">Name</th>\n                    <th class=\"text-center\">Published</th>\n                    <th class=\"text-center\">Position</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let item of menus\">\n                    <td class=\"text-center\">{{item.id}}</td>\n                    <td class=\"text-center\">{{item.menu_short_title}}</td>\n                    <td class=\"text-center\">{{item.published}}</td>\n                    <td class=\"text-center\">{{item.position}}</td>\n\t\t\t\t\t\t<td><a [routerLink]=\"['/menu-edit', item.id ]\" class=\"btn btn-small btn-primary\">edit</a></td>\n\t\t\t\t\t\t<td><a (click)=\"deleteMenu(item.id)\" class=\"btn btn-small btn-danger\">delete</a></td>\n                </tr>\n            </tbody>\n\n        </table>\n\n        <div class=\"text-center\">\n            <a   [routerLink]=\"['/menu-add']\" class=\"btn btn-primary\">add</a>\n        </div>\n</div>\n  ",
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService])
    ], MenuListComponent);
    return MenuListComponent;
}());
exports.MenuListComponent = MenuListComponent;
//# sourceMappingURL=menu-list.component.js.map