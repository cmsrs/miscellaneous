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
var menu_service_1 = require('./menu.service');
var shared_service_1 = require('../main/shared.service');
var translate_service_1 = require('../translates/translate.service');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var MenuAddComponent = (function () {
    function MenuAddComponent(menuService, translateService, router, sharedService, fb) {
        this.menuService = menuService;
        this.translateService = translateService;
        this.router = router;
        this.sharedService = sharedService;
        this.fb = fb;
        //public menu: MenuEdit = {};
        this.id = 0;
        this.langs = [];
        this.isEdit = false;
    }
    MenuAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sharedService.getConfig().subscribe(function (config) {
            var langs = config.langs;
            _this.langs = langs;
            var control = _this.menuForm.controls['translates'];
            for (var index = 0; index < langs.length; index++) {
                //console.log(langs[index]+"====");
                control.push(_this.translateService.initTranslate(langs[index], 'menu_short_title', ''));
            }
        }, function (error) {
            console.log(error);
        });
        this.menuForm = this.fb.group({
            published: false,
            position: ['', forms_1.Validators.required],
            translates: this.fb.array([])
        });
        this.menuService.getMenuById(this.id).subscribe(function (menu) {
            _this.positions = _this.menuService.getPositions(menu.menus_count);
        }, function (error) {
            console.log(error);
        });
    };
    MenuAddComponent.prototype.log = function (val) { console.log(val); };
    MenuAddComponent.prototype.onSubmit = function (f) {
        var _this = this;
        var data = this.translateService.transformObj(f.value, this.id);
        this.menuService.createMenu(data).
            subscribe(function (menu) {
            _this.router.navigateByUrl('/menu-list');
        }, function (error) {
            _this.errorMessage = error;
            console.log(error);
        });
    };
    MenuAddComponent = __decorate([
        core_1.Component({
            selector: 'menu-add',
            templateUrl: 'app/menus/menu-form.html'
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, translate_service_1.TranslateService, router_1.Router, shared_service_1.SharedService, forms_1.FormBuilder])
    ], MenuAddComponent);
    return MenuAddComponent;
}());
exports.MenuAddComponent = MenuAddComponent;
//# sourceMappingURL=menu-add.component.js.map