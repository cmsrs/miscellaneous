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
var auth_guard_1 = require('./users/auth.guard');
var AppComponent = (function () {
    function AppComponent(authGuard) {
        this.authGuard = authGuard;
    }
    AppComponent.prototype.logout = function () {
        this.authGuard.logOut();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\t<div  class=\"well\">\n\n\t\t  <h4  [hidden]=\"authGuard.isLogged()\"  class=\"text-center\"><a routerLink='/'>CMSRS-ADMIN</a></h4>\n\n          <nav    [hidden]=\"!authGuard.isLogged()\"    class=\"navbar navbar-default\">\n            <div class=\"container-fluid\">\n\t             <div class=\"navbar-header\">\n\t\t\t\t\t<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n                        <span class=\"sr-only\">Toggle navigation</span>\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                    </button>\n                    <a class=\"navbar-brand\" routerLink=\"/\">Admin Cmsrs</a> \n                 </div>\n\t\t\t\t <div id=\"navbar\" class=\"collapse navbar-collapse\">\n\t\t\t\t\t<ul class=\"nav navbar-nav navbar-left\">\n                       <li><a routerLink=\"/menu-list\">Menus</a></li>\n                       <li><a routerLink=\"/page-list\">Pages</a></li>\n                    </ul>\n\t\t\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n                       <li><a  (click)=\"logout()\" >Log-out</a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t </div>\n            </div>\n          </nav>\n\n\t\t  <div class=\"container\">\n\t\t\t <router-outlet></router-outlet>\n\t\t  </div>\n\t</div>\n  ",
        }), 
        __metadata('design:paramtypes', [auth_guard_1.AuthGuard])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map