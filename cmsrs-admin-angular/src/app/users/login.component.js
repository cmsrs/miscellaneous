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
var router_1 = require('@angular/router');
var user_service_1 = require('./user.service');
var LoginComponent = (function () {
    function LoginComponent(userService, _router) {
        this.userService = userService;
        this._router = _router;
        this.user = {};
        //public accessToken: string = null;
        this.errorMessage = null;
    }
    LoginComponent.prototype.onSubmit = function (f) {
        var _this = this;
        this.userService.login(this.user.username, this.user.password)
            .subscribe(function (data) {
            //this.accessToken = data.json().access_token;
            _this.errorMessage = null;
            //console.log(   this.user.username+"  "+ this.accessToken );
            localStorage.setItem('currentUser', JSON.stringify({ username: _this.user.username, token: data.json().access_token }));
            _this._router.navigate(['/']);
        }, function (error) {
            console.log(error);
            //this.accessToken = null;
            _this.errorMessage = 'Incorrect username or password';
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            template: "\n\n  <div  class=\"well\">\n        <div *ngIf=\"errorMessage\"  class=\"alert alert-danger\" >\n\t              Error: {{errorMessage}}. Try again.\n\t    </div>\n\n        <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\" novalidate>\n            <div class=\"form-group\">\n                <label>Login</label>\n                <input name=\"username\" [(ngModel)]=\"user.username\"   #username=\"ngModel\"   class=\"form-control\" required />\n            </div>\n            <div class=\"form-group\">\n                <label>Password</label>\n                <input name=\"password\" type=\"password\"  [(ngModel)]=\"user.password\" #password=\"ngModel\" class=\"form-control\"  required />\n\t\t\t</div>\n\t\t\t<div class=\"text-center\">\n\t\t\t     <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!f.form.valid\">Login</button>\n\t\t\t</div>\n\t\t</form>\n\n  </div>\n\n\n  ",
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map