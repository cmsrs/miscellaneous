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
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var desktop_component_1 = require('./desktop/desktop.component');
var shared_service_1 = require('./main/shared.service');
var login_component_1 = require('./users/login.component');
var user_service_1 = require('./users/user.service');
var auth_guard_1 = require('./users/auth.guard');
var menu_list_component_1 = require('./menus/menu-list.component');
var menu_add_component_1 = require('./menus/menu-add.component');
var menu_edit_component_1 = require('./menus/menu-edit.component');
var menu_service_1 = require('./menus/menu.service');
var translate_service_1 = require('./translates/translate.service');
var page_list_component_1 = require('./pages/page-list.component');
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'menu-list', component: menu_list_component_1.MenuListComponent },
    { path: 'menu-add', component: menu_add_component_1.MenuAddComponent },
    { path: 'menu-edit/:id', component: menu_edit_component_1.MenuEditComponent },
    { path: 'page-list', component: page_list_component_1.PageListComponent },
    { path: '', component: desktop_component_1.DesktopComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', redirectTo: '' }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(appRoutes)
            ],
            declarations: [
                desktop_component_1.DesktopComponent,
                login_component_1.LoginComponent,
                menu_list_component_1.MenuListComponent,
                menu_add_component_1.MenuAddComponent,
                menu_edit_component_1.MenuEditComponent,
                page_list_component_1.PageListComponent,
                app_component_1.AppComponent
            ],
            providers: [
                auth_guard_1.AuthGuard,
                user_service_1.UserService,
                shared_service_1.SharedService,
                translate_service_1.TranslateService,
                menu_service_1.MenuService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map