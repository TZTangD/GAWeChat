webpackJsonp(["main"],{

/***/ "./components/accordion/accordion-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionPanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__accordion_component__ = __webpack_require__("./components/accordion/accordion.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var AccordionPanelComponent = /** @class */ (function () {
    function AccordionPanelComponent(accordion) {
        this.accordion = accordion;
        /**
         * 是否禁止
         */
        this.disabled = false;
        this._active = false;
    }
    Object.defineProperty(AccordionPanelComponent.prototype, "active", {
        /**
         * 是否展开
         */
        get: function () {
            return this._active;
        },
        set: function (value) {
            this._active = value;
            if (value)
                this.accordion._closeOthers(this);
        },
        enumerable: true,
        configurable: true
    });
    AccordionPanelComponent.prototype.ngOnInit = function () {
        this.accordion._add(this);
    };
    AccordionPanelComponent.prototype.ngOnDestroy = function () {
        this.accordion._remove(this);
    };
    AccordionPanelComponent.prototype._toggle = function (event) {
        if (!this.disabled) {
            this.active = !this.active;
            this.accordion.select.emit(this.accordion._index(this));
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AccordionPanelComponent.prototype, "disabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AccordionPanelComponent.prototype, "active", null);
    AccordionPanelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-accordion-panel',
            template: "\n    <div role=\"tab\" (click)=\"_toggle($event)\"><ng-content select=\"[heading]\"></ng-content></div>\n    <div role=\"tabpanel\" class=\"weui-accordion-content\"><ng-content></ng-content></div>\n    ",
            host: {
                '[class.weui-accordion-panel-disabled]': 'disabled',
                '[class.weui-accordion-active]': 'active'
            }
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__accordion_component__["a" /* AccordionComponent */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__accordion_component__["a" /* AccordionComponent */]])
    ], AccordionPanelComponent);
    return AccordionPanelComponent;
}());



/***/ }),

/***/ "./components/accordion/accordion.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__accordion_config__ = __webpack_require__("./components/accordion/accordion.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AccordionComponent = /** @class */ (function () {
    function AccordionComponent(config) {
        /**
         * 是否可折叠，`true` 表示同时所有都允许展开，`false` 表示同时只允许一个展开，默认：`false`
         */
        this.collapsible = false;
        /**
         * 自动展开第一次，默认：`true`
         */
        this.activeFirst = true;
        /**
         * 动画类型，`none` 无动画，`slide` 滑动，默认：`slide`
         */
        this._animate = 'slide';
        /**
         * 展开时回调，参数为面板下标。
         */
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.panels = [];
        Object.assign(this, config);
    }
    AccordionComponent.prototype._add = function (item) {
        this.panels.push(item);
        if (this.panels.length === 1 && this.activeFirst)
            item.active = true;
    };
    AccordionComponent.prototype._remove = function (item) {
        this.panels.splice(this.panels.indexOf(item), 1);
    };
    AccordionComponent.prototype._index = function (item) {
        return this.panels.indexOf(item);
    };
    AccordionComponent.prototype._closeOthers = function (cur) {
        if (this.collapsible)
            return;
        this.panels.forEach(function (panel) {
            if (!panel.disabled && panel !== cur)
                panel.active = false;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AccordionComponent.prototype, "collapsible", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AccordionComponent.prototype, "activeFirst", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AccordionComponent.prototype, "_animate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AccordionComponent.prototype, "select", void 0);
    AccordionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-accordion',
            template: "<ng-content></ng-content>",
            host: {
                '[attr.aria-multiselectable]': 'closeOthers'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__accordion_config__["a" /* AccordionConfig */]])
    ], AccordionComponent);
    return AccordionComponent;
}());



/***/ }),

/***/ "./components/accordion/accordion.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AccordionConfig = /** @class */ (function () {
    function AccordionConfig() {
        /**
         * 是否可折叠，`false` 表示保持只有一个可折叠，`true` 表示所有都允许，默认：`false`
         */
        this.collapsible = false;
        /**
         * 自动展开第一次，默认：`true`
         */
        this.activeFirst = true;
        /**
         * 动画类型，`none` 无动画，`slide` 滑动，默认：`slide`
         */
        this.animate = 'slide';
    }
    AccordionConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], AccordionConfig);
    return AccordionConfig;
}());



/***/ }),

/***/ "./components/accordion/accordion.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__accordion_panel_component__ = __webpack_require__("./components/accordion/accordion-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__accordion_component__ = __webpack_require__("./components/accordion/accordion.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__accordion_config__ = __webpack_require__("./components/accordion/accordion.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AccordionModule = /** @class */ (function () {
    function AccordionModule() {
    }
    AccordionModule_1 = AccordionModule;
    AccordionModule.forRoot = function () {
        return { ngModule: AccordionModule_1, providers: [__WEBPACK_IMPORTED_MODULE_4__accordion_config__["a" /* AccordionConfig */]] };
    };
    AccordionModule = AccordionModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__accordion_panel_component__["a" /* AccordionPanelComponent */], __WEBPACK_IMPORTED_MODULE_3__accordion_component__["a" /* AccordionComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__accordion_panel_component__["a" /* AccordionPanelComponent */], __WEBPACK_IMPORTED_MODULE_3__accordion_component__["a" /* AccordionComponent */]],
            providers: []
        })
    ], AccordionModule);
    return AccordionModule;
    var AccordionModule_1;
}());



/***/ }),

/***/ "./components/accordion/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__accordion_panel_component__ = __webpack_require__("./components/accordion/accordion-panel.component.ts");
/* unused harmony reexport AccordionPanelComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__accordion_component__ = __webpack_require__("./components/accordion/accordion.component.ts");
/* unused harmony reexport AccordionComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__accordion_config__ = __webpack_require__("./components/accordion/accordion.config.ts");
/* unused harmony reexport AccordionConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__accordion_module__ = __webpack_require__("./components/accordion/accordion.module.ts");
/* unused harmony reexport AccordionModule */






/***/ }),

/***/ "./components/actionsheet/actionsheet.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionSheetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("./node_modules/@angular/animations/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_browser__ = __webpack_require__("./components/utils/browser.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actionsheet_config__ = __webpack_require__("./components/actionsheet/actionsheet.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subscription__ = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ActionSheetComponent = /** @class */ (function () {
    function ActionSheetComponent(DEF) {
        this.DEF = DEF;
        /**
         * 关闭回调
         */
        this.close = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._shown = false;
        /**
         * 动画状态码
         */
        this._shownAnt = false;
    }
    Object.defineProperty(ActionSheetComponent.prototype, "_visibility", {
        get: function () {
            return this._shownAnt ? 'show' : 'hide';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果。
     */
    ActionSheetComponent.prototype.show = function () {
        var _this = this;
        this.config = Object.assign({
            backdrop: true,
            skin: 'auto'
        }, this.DEF, this.config);
        if (this.config.skin === 'auto') {
            this.config.skin = Object(__WEBPACK_IMPORTED_MODULE_2__utils_browser__["b" /* isAndroid */])() ? 'android' : 'ios';
        }
        this._shown = true;
        setTimeout(function () { _this._shownAnt = true; }, 10);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["a" /* Observable */].create(function (observer) {
            _this.observer = observer;
        });
    };
    /**
     * 隐藏
     *
     * @param is_backdrop 是否从背景上点击
     */
    ActionSheetComponent.prototype.hide = function (is_backdrop) {
        var _this = this;
        if (is_backdrop === true && this.config.backdrop === false)
            return false;
        this._shownAnt = false;
        setTimeout(function () {
            _this._shown = false;
            _this.close.emit();
        }, this.config.skin === 'android' ? 200 : 300);
    };
    /**
     * 选择动作
     */
    ActionSheetComponent.prototype._onSelect = function (menu) {
        this.observer.next(menu);
        this.observer.complete();
        this.hide();
    };
    ActionSheetComponent.prototype.ngOnDestroy = function () {
        if (this.observer && this.observer instanceof __WEBPACK_IMPORTED_MODULE_5_rxjs_Subscription__["a" /* Subscription */]) {
            this.observer.unsubscribe();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__actionsheet_config__["a" /* ActionSheetConfig */])
    ], ActionSheetComponent.prototype, "config", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], ActionSheetComponent.prototype, "menus", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ActionSheetComponent.prototype, "close", void 0);
    ActionSheetComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-actionsheet',
            template: "\n        <div class=\"weui-mask\" [@visibility]=\"_visibility\" (click)=\"hide(true)\"></div>\n        <div class=\"weui-actionsheet\" [ngClass]=\"{'weui-actionsheet_toggle': _shownAnt && config.skin === 'ios'}\">\n            <div class=\"weui-actionsheet__title\" *ngIf=\"config.skin === 'ios' && config.title\">\n                <p class=\"weui-actionsheet__title-text\">{{config.title}}</p>\n            </div>\n            <div class=\"weui-actionsheet__menu\">\n                <div class=\"weui-actionsheet__cell\" *ngFor=\"let item of menus\" (click)=\"_onSelect(item)\">{{item.text}}</div>\n            </div>\n            <div class=\"weui-actionsheet__action\" *ngIf=\"config.skin === 'ios' && config.cancel\">\n                <div class=\"weui-actionsheet__cell\" (click)=\"hide()\">{{config.cancel}}</div>\n            </div>\n        </div>\n    ",
            animations: [Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* trigger */])('visibility', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('show', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1 })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('hide', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0 })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('hide <=> show', [Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(200)])
                ])],
            host: {
                '[hidden]': '!_shown',
                '[class.weui-skin_android]': 'config.skin === "android"'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__actionsheet_config__["a" /* ActionSheetConfig */]])
    ], ActionSheetComponent);
    return ActionSheetComponent;
}());



/***/ }),

/***/ "./components/actionsheet/actionsheet.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionSheetConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ActionSheetConfig = /** @class */ (function () {
    function ActionSheetConfig() {
        /**
         * 样式，默认：`ios`
         */
        this.skin = 'ios';
        /**
         * 取消文本，默认：`取消`
         */
        this.cancel = '取消';
        /**
         * 允许点击背景关闭，默认：`true`
         */
        this.backdrop = true;
    }
    ActionSheetConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], ActionSheetConfig);
    return ActionSheetConfig;
}());



/***/ }),

/***/ "./components/actionsheet/actionsheet.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionSheetModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actionsheet_component__ = __webpack_require__("./components/actionsheet/actionsheet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actionsheet_service__ = __webpack_require__("./components/actionsheet/actionsheet.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actionsheet_config__ = __webpack_require__("./components/actionsheet/actionsheet.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ActionSheetModule = /** @class */ (function () {
    function ActionSheetModule() {
    }
    ActionSheetModule_1 = ActionSheetModule;
    ActionSheetModule.forRoot = function () {
        return { ngModule: ActionSheetModule_1, providers: [__WEBPACK_IMPORTED_MODULE_4__actionsheet_config__["a" /* ActionSheetConfig */]] };
    };
    ActionSheetModule = ActionSheetModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__actionsheet_component__["a" /* ActionSheetComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__actionsheet_component__["a" /* ActionSheetComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__actionsheet_service__["a" /* ActionSheetService */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__actionsheet_component__["a" /* ActionSheetComponent */]]
        })
    ], ActionSheetModule);
    return ActionSheetModule;
    var ActionSheetModule_1;
}());



/***/ }),

/***/ "./components/actionsheet/actionsheet.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionSheetService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionsheet_component__ = __webpack_require__("./components/actionsheet/actionsheet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_base_service__ = __webpack_require__("./components/utils/base.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ActionSheetService = /** @class */ (function (_super) {
    __extends(ActionSheetService, _super);
    function ActionSheetService(resolver, applicationRef, injector) {
        return _super.call(this, resolver, applicationRef, injector) || this;
    }
    /**
     * 创建一个弹出式菜单并显示
     *
     * @param menus 菜单内容
     * @param config 配置性（可选）
     * @returns 可订阅来获取结果
     */
    ActionSheetService.prototype.show = function (menus, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var componentRef = this.build(__WEBPACK_IMPORTED_MODULE_1__actionsheet_component__["a" /* ActionSheetComponent */]);
        componentRef.instance.menus = menus;
        if (config)
            componentRef.instance.config = config;
        componentRef.instance.close.subscribe(function () {
            setTimeout(function () {
                _this.destroy(componentRef);
            }, 100);
        });
        return componentRef.instance.show();
    };
    ActionSheetService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
    ], ActionSheetService);
    return ActionSheetService;
}(__WEBPACK_IMPORTED_MODULE_2__utils_base_service__["a" /* BaseService */]));



/***/ }),

/***/ "./components/actionsheet/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionsheet_service__ = __webpack_require__("./components/actionsheet/actionsheet.service.ts");
/* unused harmony reexport ActionSheetService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionsheet_component__ = __webpack_require__("./components/actionsheet/actionsheet.component.ts");
/* unused harmony reexport ActionSheetComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actionsheet_config__ = __webpack_require__("./components/actionsheet/actionsheet.config.ts");
/* unused harmony reexport ActionSheetConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actionsheet_module__ = __webpack_require__("./components/actionsheet/actionsheet.module.ts");
/* unused harmony reexport ActionSheetModule */






/***/ }),

/***/ "./components/button/button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button_config__ = __webpack_require__("./components/button/button.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_boolean_property__ = __webpack_require__("./components/utils/boolean-property.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ButtonComponent = /** @class */ (function () {
    function ButtonComponent(_config) {
        /**
         * 操作场景：primary、default、warn，默认：`primary`
         */
        this.type = 'primary';
        this._loading = false;
        this._mini = false;
        this._plain = false;
        this._disabled = false;
        Object.assign(this, _config);
    }
    Object.defineProperty(ButtonComponent.prototype, "loading", {
        /**
         * 是否加载状态
         */
        get: function () { return this._loading; },
        set: function (value) { this._loading = Object(__WEBPACK_IMPORTED_MODULE_2__utils_boolean_property__["a" /* toBoolean */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "mini", {
        /**
         * 是否小号
         */
        get: function () { return this._mini; },
        set: function (value) { this._mini = Object(__WEBPACK_IMPORTED_MODULE_2__utils_boolean_property__["a" /* toBoolean */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "plain", {
        /**
         * 镂空按钮
         */
        get: function () { return this._plain; },
        set: function (value) { this._plain = Object(__WEBPACK_IMPORTED_MODULE_2__utils_boolean_property__["a" /* toBoolean */])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "disabled", {
        /**
         * 禁用状态
         */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = Object(__WEBPACK_IMPORTED_MODULE_2__utils_boolean_property__["a" /* toBoolean */])(value); },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-type'),
        __metadata("design:type", String)
    ], ButtonComponent.prototype, "type", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.weui-btn_loading'),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-loading'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], ButtonComponent.prototype, "loading", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.weui-btn_mini'),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-mini'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], ButtonComponent.prototype, "mini", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-plain'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], ButtonComponent.prototype, "plain", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], ButtonComponent.prototype, "disabled", null);
    ButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-button, button[weui-button], a[weui-button]',
            host: {
                'class': 'weui-btn',
                '[class.weui-btn_primary]': '!plain && type==="primary"',
                '[class.weui-btn_default]': '!plain && type==="default"',
                '[class.weui-btn_warn]': '!plain && type==="warn"',
                '[class.weui-btn_plain-primary]': 'plain && type==="primary"',
                '[class.weui-btn_plain-default]': 'plain && type==="default"',
                '[class.weui-btn_plain-warn]': 'plain && type==="warn"',
                '[class.weui-btn_disabled]': '!plain && disabled',
                '[class.weui-btn_plain-disabled]': 'plain && disabled',
                '[attr.disabled]': 'disabled ? "disabled" : null'
            },
            exportAs: 'weuiButton',
            template: '<i class="weui-loading" *ngIf="loading"></i><ng-content></ng-content>'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__button_config__["a" /* ButtonConfig */]])
    ], ButtonComponent);
    return ButtonComponent;
}());



/***/ }),

/***/ "./components/button/button.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ButtonConfig = /** @class */ (function () {
    function ButtonConfig() {
        /**
         * 操作场景：primary、default、warn
         */
        this.type = 'primary';
        /**
         * disabled状态，默认：`false`
         */
        this.disabled = false;
        /**
         * 是否加载状态，默认：`false`
         */
        this.loading = false;
        /**
         * 镂空按钮，默认：`false`
         */
        this.plain = false;
        /**
         * 是否小号，默认：`false`
         */
        this.mini = false;
    }
    ButtonConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], ButtonConfig);
    return ButtonConfig;
}());



/***/ }),

/***/ "./components/button/button.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_config__ = __webpack_require__("./components/button/button.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_component__ = __webpack_require__("./components/button/button.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
    }
    ButtonModule_1 = ButtonModule;
    ButtonModule.forRoot = function () {
        return { ngModule: ButtonModule_1, providers: [__WEBPACK_IMPORTED_MODULE_2__button_config__["a" /* ButtonConfig */]] };
    };
    ButtonModule = ButtonModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__button_component__["a" /* ButtonComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_3__button_component__["a" /* ButtonComponent */]]
        })
    ], ButtonModule);
    return ButtonModule;
    var ButtonModule_1;
}());



/***/ }),

/***/ "./components/button/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_component__ = __webpack_require__("./components/button/button.component.ts");
/* unused harmony reexport ButtonComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button_module__ = __webpack_require__("./components/button/button.module.ts");
/* unused harmony reexport ButtonModule */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_config__ = __webpack_require__("./components/button/button.config.ts");
/* unused harmony reexport ButtonConfig */





/***/ }),

/***/ "./components/cell/cell.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CellModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__swipe_directive__ = __webpack_require__("./components/cell/swipe.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CellModule = /** @class */ (function () {
    function CellModule() {
    }
    CellModule_1 = CellModule;
    CellModule.forRoot = function () {
        return { ngModule: CellModule_1, providers: [] };
    };
    CellModule = CellModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__swipe_directive__["a" /* SwipeDirective */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__swipe_directive__["a" /* SwipeDirective */]
            ]
        })
    ], CellModule);
    return CellModule;
    var CellModule_1;
}());



/***/ }),

/***/ "./components/cell/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__swipe_directive__ = __webpack_require__("./components/cell/swipe.directive.ts");
/* unused harmony reexport SwipeDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cell_module__ = __webpack_require__("./components/cell/cell.module.ts");
/* unused harmony reexport CellModule */




/***/ }),

/***/ "./components/cell/swipe.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwipeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * 单元格滑块
 */
var SwipeDirective = /** @class */ (function () {
    function SwipeDirective(el) {
        this.el = el;
        this.curX = 0;
        this.opend = false;
        /**
         * 右边滑动宽度（单位：px），默认：`68`
         */
        this.width = 68;
    }
    SwipeDirective.prototype.ngOnInit = function () {
        var el = this.el.nativeElement;
        this.swipeEl = el.querySelector('.weui-cell__bd');
        if (!this.swipeEl)
            this.width = 0;
        else {
            this.setPos(0);
            this.swipeEl.style.transition = 'transform .3s';
        }
    };
    SwipeDirective.prototype.setPos = function (x) {
        this.swipeEl.style.transform = "translateX(-" + x + "px)";
    };
    SwipeDirective.prototype.onTouchStart = function ($event) {
        this.curX = ($event.touches[0] || $event.changedTouches[0]).pageX;
    };
    SwipeDirective.prototype.onTouchMove = function ($event) {
        var touch = $event.touches[0] || $event.changedTouches[0];
        var newX = this.curX - touch.pageX;
        if (this.opend) {
            newX = newX > 0 ? this.width : this.width - Math.abs(newX);
        }
        else {
            newX = newX > this.width ? this.width : newX;
        }
        this.setPos(newX <= 0 ? 0 : newX);
    };
    SwipeDirective.prototype.onTouchEnd = function ($event) {
        var touch = $event.touches[0] || $event.changedTouches[0];
        var newX = Math.abs(this.curX - touch.pageX);
        if (newX === 0)
            return;
        if (this.opend)
            newX = this.width - newX;
        // 当移动超过一半都视为打开
        if (newX > 0 && newX > (+this.width / 2)) {
            this.opend = true;
            this.setPos(this.width);
        }
        else {
            this.opend = false;
            this.setPos(0);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-width'),
        __metadata("design:type", Number)
    ], SwipeDirective.prototype, "width", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchstart', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SwipeDirective.prototype, "onTouchStart", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchmove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SwipeDirective.prototype, "onTouchMove", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchend', ['$event']),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchcancel', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SwipeDirective.prototype, "onTouchEnd", null);
    SwipeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[weui-swipe]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], SwipeDirective);
    return SwipeDirective;
}());



/***/ }),

/***/ "./components/chart-g2/chart-g2.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartG2Directive; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChartG2Directive = /** @class */ (function () {
    function ChartG2Directive(el, zone) {
        this.el = el;
        this.zone = zone;
        this.initFlag = false;
    }
    Object.defineProperty(ChartG2Directive.prototype, "chart", {
        /**
         * chart实例对象
         */
        get: function () {
            return this._chart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartG2Directive.prototype, "GM", {
        /**
         * GM对象
         */
        get: function () {
            return GM;
        },
        enumerable: true,
        configurable: true
    });
    ChartG2Directive.prototype.ngOnInit = function () {
        this.initFlag = true;
        this.buildChart();
    };
    ChartG2Directive.prototype.buildChart = function () {
        var _this = this;
        var object = {
            el: this.el.nativeElement
        };
        if (this.margin)
            object.margin = this.margin;
        this.zone.runOutsideAngular(function () {
            _this._chart = new GM.Chart(object);
        });
    };
    ChartG2Directive.prototype.ngOnChanges = function (changes) {
        if (this.initFlag) {
            if ('margin' in changes && !changes['margin'].firstChange) {
                this.buildChart();
            }
        }
    };
    ChartG2Directive.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this._chart) {
            this.zone.runOutsideAngular(function () {
                // fixed: TypeError: Cannot read property 'stop' of null
                try {
                    _this._chart.destroy();
                }
                catch (e) {
                    console.warn(e);
                }
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ChartG2Directive.prototype, "margin", void 0);
    ChartG2Directive = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: 'canvas[weui-chart-g2]', exportAs: 'chart-g2' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], ChartG2Directive);
    return ChartG2Directive;
}());



/***/ }),

/***/ "./components/chart-g2/chart-g2.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartG2Module; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chart_g2_directive__ = __webpack_require__("./components/chart-g2/chart-g2.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChartG2Module = /** @class */ (function () {
    function ChartG2Module() {
    }
    ChartG2Module_1 = ChartG2Module;
    ChartG2Module.forRoot = function () {
        return { ngModule: ChartG2Module_1, providers: [] };
    };
    ChartG2Module = ChartG2Module_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__chart_g2_directive__["a" /* ChartG2Directive */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__chart_g2_directive__["a" /* ChartG2Directive */]]
        })
    ], ChartG2Module);
    return ChartG2Module;
    var ChartG2Module_1;
}());



/***/ }),

/***/ "./components/chart-g2/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chart_g2_directive__ = __webpack_require__("./components/chart-g2/chart-g2.directive.ts");
/* unused harmony reexport ChartG2Directive */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chart_g2_module__ = __webpack_require__("./components/chart-g2/chart-g2.module.ts");
/* unused harmony reexport ChartG2Module */




/***/ }),

/***/ "./components/dialog/dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__ = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_browser__ = __webpack_require__("./components/utils/browser.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialog_config__ = __webpack_require__("./components/dialog/dialog.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * 对话框，依赖于 `weui-textarea`、`weui-slider`
 *
 * 关于 `input==='prompt'` 若干细节：
 *  + 对话框内放表单在weui的表现并不是很如意，因此，在对话框增加 `.weui-dialog__prompt` 样式类名，请自行针对性进行一些样式的覆盖，`ngx-dialog` 不提供任何样式的修正。
 *  + 对于录入型表单其校验机制全都是依赖于正则，默认情况下内置 `email`、`url` 两种表单类型的正则。
 */
var DialogComponent = /** @class */ (function () {
    function DialogComponent(DEF) {
        this.DEF = DEF;
        /**
         * 打开动画结束后回调（唯一参数：对话框实例对象）
         */
        this.open = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * 关闭动画开始时回调（唯一参数：对话框实例对象）
         */
        this.close = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._shown = false;
        this._prompError = false;
    }
    Object.defineProperty(DialogComponent.prototype, "config", {
        get: function () {
            return this._config;
        },
        /**
         * 对话框配置项
         */
        set: function (value) {
            var _this = this;
            var config = Object.assign({
                backdrop: false
            }, this.DEF, value);
            if (config.skin === 'auto') {
                config.skin = Object(__WEBPACK_IMPORTED_MODULE_3__utils_browser__["b" /* isAndroid */])() ? 'android' : 'ios';
            }
            // 重组btns
            if (!config.btns) {
                config.btns = [];
                if (config.cancel) {
                    config.btns.push({ text: config.cancel, type: config.cancelType, value: false });
                }
                if (config.confirm) {
                    config.btns.push({ text: config.confirm, type: config.confirmType, value: true });
                }
            }
            // prompt
            if (config.type === 'prompt') {
                // 一些默认校验正则表达式
                if (!config.inputRegex) {
                    switch (config.input) {
                        case 'email':
                            config.inputRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!config.inputError)
                                config.inputError = '邮箱格式不正确';
                            break;
                        case 'url':
                            config.inputRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                            if (!config.inputError)
                                config.inputError = '网址格式不正确';
                            break;
                    }
                }
                config.inputOptions = Object.assign([], config.inputOptions);
                config.inputAttributes = Object.assign({
                    maxlength: null,
                    min: 0,
                    max: 100,
                    step: 1
                }, config.inputAttributes);
                // 默认值
                var defaultValue = config.inputValue;
                if (config.input === 'checkbox' && !Array.isArray(config.inputValue)) {
                    defaultValue = typeof defaultValue !== 'undefined' ? [defaultValue] : [];
                }
                config.inputValue = defaultValue || '';
                this._promptData = config.inputValue;
                if (this._promptData) {
                    this._config = config;
                    this.promptCheck();
                }
                setTimeout(function () {
                    _this.setFocus();
                }, 100);
            }
            this._config = config;
        },
        enumerable: true,
        configurable: true
    });
    DialogComponent.prototype.promptCheck = function () {
        if (this.config.inputRequired === true) {
            if (this.config.input === 'checkbox' && this._promptData.length === 0) {
                this._prompError = true;
                return false;
            }
            if (!this._promptData) {
                this._prompError = true;
                return false;
            }
        }
        if (this.config.inputRegex && !this.config.inputRegex.test(this._promptData.toString())) {
            this._prompError = true;
            return false;
        }
        this._prompError = false;
        return true;
    };
    DialogComponent.prototype.setFocus = function () {
        var containerEl = this.container.nativeElement;
        var firstFormEl = null;
        if (this.config.type === 'prompt') {
            firstFormEl = containerEl.querySelector('input, textarea, select');
        }
        else {
            firstFormEl = containerEl.querySelector('.weui-dialog__btn_primary');
        }
        if (firstFormEl)
            firstFormEl.focus();
    };
    DialogComponent.prototype._chanage = function () {
        this.promptCheck();
    };
    DialogComponent.prototype._keyup = function (event) {
        if (event.keyCode === 13) {
            this._onSelect();
        }
    };
    /**
     * 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果。
     *
     * @returns 当 `type==='prompt'` 时会多一 `result` 属性表示结果值
     */
    DialogComponent.prototype.show = function () {
        var _this = this;
        this._shown = true;
        this._prompError = false;
        // 模拟动画结束后回调
        setTimeout(function () {
            _this.open.emit(_this);
        }, 300);
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].create(function (observer) {
            _this.observer = observer;
        });
    };
    /**
     * 隐藏
     *
     * @param is_backdrop 是否从背景上点击
     */
    DialogComponent.prototype.hide = function (is_backdrop) {
        if (is_backdrop === void 0) { is_backdrop = false; }
        if (is_backdrop === true && this.config.backdrop === false)
            return false;
        this._shown = false;
        this.close.emit(this);
    };
    DialogComponent.prototype._onSelect = function (menu) {
        // 未指定时查找 `value===true` 的按钮
        if (!menu && this.config.btns.length > 0) {
            menu = this.config.btns.find(function (w) { return w.value === true; });
        }
        var ret = menu;
        if (menu.value === true && this._config.type === 'prompt') {
            if (!this.promptCheck())
                return false;
            ret.result = this._promptData;
        }
        this.observer.next(ret);
        this.observer.complete();
        this.hide();
        return false;
    };
    DialogComponent.prototype.ngOnDestroy = function () {
        if (this.observer && this.observer instanceof __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__["a" /* Subscription */]) {
            this.observer.unsubscribe();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__dialog_config__["a" /* DialogConfig */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__dialog_config__["a" /* DialogConfig */]])
    ], DialogComponent.prototype, "config", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], DialogComponent.prototype, "open", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], DialogComponent.prototype, "close", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('container'),
        __metadata("design:type", Object)
    ], DialogComponent.prototype, "container", void 0);
    DialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-dialog',
            template: "\n        <div class=\"weui-mask\" [ngClass]=\"{'weui-mask__in': _shown}\" (click)=\"hide(true)\"></div>\n        <div class=\"weui-dialog\" [ngClass]=\"{'weui-dialog__in': _shown, 'weui-skin_android': config.skin === 'android', 'weui-dialog__prompt': config.type === 'prompt'}\" #container>\n            <div class=\"weui-dialog__hd\" *ngIf=\"config.title\"><strong class=\"weui-dialog__title\">{{config.title}}</strong></div>\n            <div class=\"weui-dialog__bd\" *ngIf=\"config.content\" [innerHTML]=\"config.content\"></div>\n            <div class=\"weui-cells\" *ngIf=\"config.type === 'prompt' && _shown\">\n                <ng-container [ngSwitch]=\"config.input\">\n                    <div *ngSwitchCase=\"'textarea'\" class=\"weui-cell\" [ngClass]=\"{'weui-cell_warn': _prompError}\">\n                        <div class=\"weui-cell__bd\">\n                            <textarea class=\"weui-textarea\" placeholder=\"{{config.inputPlaceholder}}\"\n                                [(ngModel)]=\"_promptData\" name=\"_promptData\" (ngModelChange)=\"_chanage()\"\n                                weui-textarea weui-cn=\"{{config.inputAttributes.cn}}\" [maxlength]=\"config.inputAttributes.maxlength\"></textarea>\n                        </div>\n                    </div>\n                    <div *ngSwitchCase=\"'select'\" class=\"weui-cell weui-cell_select\">\n                        <div class=\"weui-cell__bd\">\n                            <select class=\"weui-select\" [(ngModel)]=\"_promptData\" name=\"_promptData\" (ngModelChange)=\"_chanage()\">\n                                <option *ngFor=\"let i of config.inputOptions\" [ngValue]=\"i\">{{i.text}}</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div *ngSwitchCase=\"'radio'\" class=\"weui-cells_radio\">\n                        <label class=\"weui-cell weui-check__label\" *ngFor=\"let i of config.inputOptions\">\n                            <div class=\"weui-cell__bd\">\n                                <p>{{i.text}}</p>\n                            </div>\n                            <div class=\"weui-cell__ft\">\n                                <input type=\"radio\" (click)=\"_promptData=i\" [checked]=\"i==_promptData\" (change)=\"_chanage()\" class=\"weui-check\">\n                                <span class=\"weui-icon-checked\"></span>\n                            </div>\n                        </label>\n                    </div>\n                    <div *ngSwitchCase=\"'checkbox'\" class=\"weui-cells_checkbox\">\n                        <label class=\"weui-cell weui-check__label\" *ngFor=\"let i of config.inputOptions\">\n                            <div class=\"weui-cell__hd\">\n                                <input type=\"checkbox\" class=\"weui-check\" (change)=\"_chanage()\"\n                                    [weui-checklist]=\"_promptData\" [weui-value]=\"i\" name=\"_promptData\">\n                                <i class=\"weui-icon-checked\"></i>\n                            </div>\n                            <div class=\"weui-cell__bd\">\n                                <p>{{i.text}}</p>\n                            </div>\n                        </label>\n                    </div>\n                    <div *ngSwitchCase=\"'range'\" class=\"weui-slider-box\" [(ngModel)]=\"_promptData\" name=\"_promptData\"\n                        weui-slider weui-min=\"{{config.inputAttributes.min}}\" weui-max=\"{{config.inputAttributes.max}}\" weui-step=\"{{config.inputAttributes.step}}\">\n                        <div class=\"weui-slider\">\n                            <div class=\"weui-slider__inner\">\n                                <div class=\"weui-slider__track\"></div>\n                                <div class=\"weui-slider__handler\"></div>\n                            </div>\n                        </div>\n                        <div class=\"weui-slider-box__value\">{{_promptData}}</div>\n                    </div>\n                    <div *ngSwitchDefault class=\"weui-cell\" [ngClass]=\"{'weui-cell_warn': _prompError}\">\n                        <div class=\"weui-cell__bd\">\n                            <input type=\"{{config.input}}\" class=\"weui-input\"\n                                placeholder=\"{{config.inputPlaceholder}}\" [(ngModel)]=\"_promptData\" name=\"_promptData\"\n                                [maxlength]=\"config.inputAttributes.maxlength\"\n                                (ngModelChange)=\"_chanage()\" (keyup)=\"_keyup($event)\">\n                        </div>\n                        <div class=\"weui-cell__ft\"><i class=\"weui-icon-warn\" *ngIf=\"_prompError\"></i></div>\n                    </div>\n                </ng-container>\n            </div>\n            <div class=\"weui-dialog__error\" *ngIf=\"_prompError\">{{config.inputError}}</div>\n            <div class=\"weui-dialog__ft\">\n                <a href=\"#\" *ngFor=\"let item of config.btns\"\n                    class=\"weui-dialog__btn weui-dialog__btn_{{item.type}}\"\n                    (click)=\"_onSelect(item)\">{{item.text}}</a>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__dialog_config__["a" /* DialogConfig */]])
    ], DialogComponent);
    return DialogComponent;
}());



/***/ }),

/***/ "./components/dialog/dialog.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DialogConfig = /** @class */ (function () {
    function DialogConfig() {
        /**
         * 对话框类型，默认：`default`
         * default：默认文本或HTML格式
         * prompt：可输入对话框
         */
        this.type = 'default';
        /**
         * 样式，默认：`auto`
         */
        this.skin = 'auto';
        /**
         * 取消，返回false，默认：`取消`
         */
        this.cancel = '取消';
        /**
         * 取消按钮类型，默认：`default`
         */
        this.cancelType = 'default';
        /**
         * 确认，返回true，默认：`确认`
         */
        this.confirm = '确认';
        /**
         * 确认按钮类型，默认：`primary`
         */
        this.confirmType = 'primary';
        /**
         * 允许点击背景关闭，默认：`false`
         */
        this.backdrop = false;
    }
    DialogConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], DialogConfig);
    return DialogConfig;
}());



/***/ }),

/***/ "./components/dialog/dialog.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_form_module__ = __webpack_require__("./components/form/form.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__slider_slider_module__ = __webpack_require__("./components/slider/slider.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mask_mask_module__ = __webpack_require__("./components/mask/mask.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dialog_component__ = __webpack_require__("./components/dialog/dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dialog_service__ = __webpack_require__("./components/dialog/dialog.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dialog_config__ = __webpack_require__("./components/dialog/dialog.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule_1 = DialogModule;
    DialogModule.forRoot = function () {
        return { ngModule: DialogModule_1, providers: [__WEBPACK_IMPORTED_MODULE_8__dialog_config__["a" /* DialogConfig */]] };
    };
    DialogModule = DialogModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_5__mask_mask_module__["a" /* MaskModule */], __WEBPACK_IMPORTED_MODULE_3__form_form_module__["a" /* FormModule */], __WEBPACK_IMPORTED_MODULE_4__slider_slider_module__["a" /* SliderModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_6__dialog_component__["a" /* DialogComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_6__dialog_component__["a" /* DialogComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_7__dialog_service__["a" /* DialogService */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_6__dialog_component__["a" /* DialogComponent */]]
        })
    ], DialogModule);
    return DialogModule;
    var DialogModule_1;
}());



/***/ }),

/***/ "./components/dialog/dialog.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_base_service__ = __webpack_require__("./components/utils/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_component__ = __webpack_require__("./components/dialog/dialog.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DialogService = /** @class */ (function (_super) {
    __extends(DialogService, _super);
    function DialogService(resolver, applicationRef, injector) {
        return _super.call(this, resolver, applicationRef, injector) || this;
    }
    /**
     * 创建一个对话框并显示
     *
     * @param data 对话框配置项
     * @returns 可订阅来获取结果
     */
    DialogService.prototype.show = function (data) {
        var _this = this;
        var componentRef = this.build(__WEBPACK_IMPORTED_MODULE_2__dialog_component__["a" /* DialogComponent */]);
        componentRef.instance.config = data;
        componentRef.instance.close.subscribe(function () {
            setTimeout(function () {
                _this.destroy(componentRef);
            }, 300);
        });
        return componentRef.instance.show();
    };
    DialogService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
    ], DialogService);
    return DialogService;
}(__WEBPACK_IMPORTED_MODULE_1__utils_base_service__["a" /* BaseService */]));



/***/ }),

/***/ "./components/dialog/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dialog_service__ = __webpack_require__("./components/dialog/dialog.service.ts");
/* unused harmony reexport DialogService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog_component__ = __webpack_require__("./components/dialog/dialog.component.ts");
/* unused harmony reexport DialogComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dialog_config__ = __webpack_require__("./components/dialog/dialog.config.ts");
/* unused harmony reexport DialogConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialog_module__ = __webpack_require__("./components/dialog/dialog.module.ts");
/* unused harmony reexport DialogModule */






/***/ }),

/***/ "./components/form/check.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChecklistDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChecklistDirective = /** @class */ (function () {
    function ChecklistDirective() {
        this.checked = false;
    }
    Object.defineProperty(ChecklistDirective.prototype, "value", {
        set: function (val) {
            this._value = val;
            this.checked = this.targetArray.indexOf(val) !== -1;
        },
        enumerable: true,
        configurable: true
    });
    ChecklistDirective.prototype._change = function ($event) {
        if ($event.target.checked) {
            this.targetArray.push(this._value);
        }
        else {
            this.targetArray.splice(this.targetArray.indexOf(this._value), 1);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-checklist'),
        __metadata("design:type", Array)
    ], ChecklistDirective.prototype, "targetArray", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-value'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ChecklistDirective.prototype, "value", null);
    ChecklistDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[weui-checklist]',
            host: {
                '(change)': '_change($event)',
                '[checked]': 'checked'
            }
        })
    ], ChecklistDirective);
    return ChecklistDirective;
}());



/***/ }),

/***/ "./components/form/form.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_directive__ = __webpack_require__("./components/form/input.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vcode_directive__ = __webpack_require__("./components/form/vcode.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__textarea_directive__ = __webpack_require__("./components/form/textarea.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__check_directive__ = __webpack_require__("./components/form/check.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var FormModule = /** @class */ (function () {
    function FormModule() {
    }
    FormModule_1 = FormModule;
    FormModule.forRoot = function () {
        return { ngModule: FormModule_1, providers: [] };
    };
    FormModule = FormModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */]],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__input_directive__["a" /* InputDirective */],
                __WEBPACK_IMPORTED_MODULE_4__vcode_directive__["a" /* VCodeDirective */],
                __WEBPACK_IMPORTED_MODULE_5__textarea_directive__["a" /* TextareaDirective */],
                __WEBPACK_IMPORTED_MODULE_6__check_directive__["a" /* ChecklistDirective */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__input_directive__["a" /* InputDirective */],
                __WEBPACK_IMPORTED_MODULE_4__vcode_directive__["a" /* VCodeDirective */],
                __WEBPACK_IMPORTED_MODULE_5__textarea_directive__["a" /* TextareaDirective */],
                __WEBPACK_IMPORTED_MODULE_6__check_directive__["a" /* ChecklistDirective */]
            ]
        })
    ], FormModule);
    return FormModule;
    var FormModule_1;
}());



/***/ }),

/***/ "./components/form/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input_directive__ = __webpack_require__("./components/form/input.directive.ts");
/* unused harmony reexport InputDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__check_directive__ = __webpack_require__("./components/form/check.directive.ts");
/* unused harmony reexport ChecklistDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vcode_directive__ = __webpack_require__("./components/form/vcode.directive.ts");
/* unused harmony reexport VCodeDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__textarea_directive__ = __webpack_require__("./components/form/textarea.directive.ts");
/* unused harmony reexport TextareaDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__form_module__ = __webpack_require__("./components/form/form.module.ts");
/* unused harmony reexport FormModule */







/***/ }),

/***/ "./components/form/input.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InputDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dom__ = __webpack_require__("./components/utils/dom.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * 文本框，指令是对文本框格式校验（邮箱、手机、身份证等）、视觉效果的增强而已
 */
var InputDirective = /** @class */ (function () {
    function InputDirective(el) {
        this.el = el;
        /**
         * 是否必填项，**等同于** <intpu required> 的值，当值必填时会有视觉效果
         */
        this.required = 'warn';
        /**
         * 是否自动清除内容中的空格
         */
        this.cleaner = false;
    }
    InputDirective_1 = InputDirective;
    InputDirective.prototype.ngOnInit = function () {
        this.parentEl = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom__["b" /* findParent */])(this.el.nativeElement, '.weui-cell');
        if (!this.parentEl)
            throw new Error('父DOM结构至少必须包含一个.weui-cell');
        // 检查是否有 weui-cell__ft
        this.ftEl = Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom__["a" /* add */])(this.parentEl);
    };
    InputDirective.prototype.ngOnChanges = function (changes) {
        this._createValidator();
        if (this._onChange)
            this._onChange();
    };
    InputDirective.prototype._createValidator = function () {
        var _this = this;
        var regex = null;
        if (this.inputRegex) {
            if (typeof this.inputRegex === 'string') {
                regex = new RegExp("^" + this.inputRegex + "$");
            }
            else {
                regex = this.inputRegex;
            }
        }
        else {
            // 默认行为
            if (this.inputType) {
                switch (this.inputType) {
                    case 'qq':
                    case 'number':
                        regex = /^[0-9]+$/;
                        break;
                    case 'digit':
                        regex = /^[.0-9]+$/;
                        break;
                    case 'tel':
                        regex = /^[-.0-9]+$/;
                        break;
                    case 'email':
                        regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        this.cleaner = true;
                        break;
                    case 'mobile':
                        regex = /^1[0-9]{10}$/;
                        this.cleaner = true;
                        break;
                    case 'idcard':// 身份证
                        regex = /^[X0-9]{15,18}$/;
                        this.cleaner = true;
                        break;
                }
            }
        }
        this._validator = function (control) {
            var value = control.value;
            if (value == null || value.length === 0) {
                if (_this.required !== undefined)
                    return { 'icon': _this.required, 'type': 'required', 'actualValue': value };
                return null;
            }
            if (_this.cleaner && value.includes(' ')) {
                value = value.replace(/ /g, '');
                control.setValue(value);
            }
            return regex === null || regex.test(value) ? null : { 'icon': 'warn', 'type': 'regex', 'actualValue': value };
        };
    };
    InputDirective.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
    InputDirective.prototype.validate = function (c) {
        var ret = this._validator(c);
        if (ret === null) {
            this.parentEl.classList.remove('weui-cell_warn');
            Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom__["c" /* remove */])(this.ftEl, 'i');
        }
        else {
            Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom__["c" /* remove */])(this.ftEl, 'i');
            this.parentEl.classList.add('weui-cell_warn');
            var icon = "weui-icon-" + ret.icon;
            Object(__WEBPACK_IMPORTED_MODULE_2__utils_dom__["a" /* add */])(this.ftEl, '.' + icon, 'i', icon);
        }
        return ret;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-input'),
        __metadata("design:type", String)
    ], InputDirective.prototype, "inputType", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-regex'),
        __metadata("design:type", Object)
    ], InputDirective.prototype, "inputRegex", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-required'),
        __metadata("design:type", String)
    ], InputDirective.prototype, "required", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-cleaner'),
        __metadata("design:type", Boolean)
    ], InputDirective.prototype, "cleaner", void 0);
    InputDirective = InputDirective_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[weui-input]',
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* NG_VALIDATORS */],
                    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return InputDirective_1; }),
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], InputDirective);
    return InputDirective;
    var InputDirective_1;
}());



/***/ }),

/***/ "./components/form/textarea.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextareaDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_dom__ = __webpack_require__("./components/utils/dom.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * 文本域字数统计
 */
var TextareaDirective = /** @class */ (function () {
    function TextareaDirective(el) {
        this.el = el;
        /**
         * 最大长度，0表示不受限
         */
        this.maxlength = 0;
        /**
         * 中文部分应该算多少个字符，使用 `/[^\x00-\xff]/g` 正则表达式统计中文部分（默认：1个字符）
         */
        this.cn = 1;
    }
    TextareaDirective.prototype.ngOnInit = function () {
        this.init();
    };
    TextareaDirective.prototype.ngOnChanges = function (changes) {
        if ('maxlength' in changes) {
            this.init()._onChange(this._value);
        }
    };
    TextareaDirective.prototype.init = function () {
        var clsName = "weui-textarea-counter";
        var pel = this.el.nativeElement.parentElement;
        this.maxlength = +this.maxlength;
        if (this.maxlength <= 0) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom__["c" /* remove */])(pel, '.' + clsName);
            this._count = null;
        }
        else {
            this._count = Object(__WEBPACK_IMPORTED_MODULE_1__utils_dom__["a" /* add */])(pel, '.' + clsName, 'div', clsName);
        }
        return this;
    };
    TextareaDirective.prototype._onChange = function (value) {
        if (!this._count)
            return;
        value = value || '';
        if (this.cn > 1) {
            value = value.replace(/[^\x00-\xff]/g, '**');
        }
        this._value = value;
        this._count.innerHTML = value.length + " / " + this.maxlength;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], TextareaDirective.prototype, "maxlength", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-cn'),
        __metadata("design:type", Number)
    ], TextareaDirective.prototype, "cn", void 0);
    TextareaDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[weui-textarea]',
            host: {
                '(ngModelChange)': '_onChange($event)'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], TextareaDirective);
    return TextareaDirective;
}());



/***/ }),

/***/ "./components/form/vcode.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VCodeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * 获取验证码
 */
var VCodeDirective = /** @class */ (function () {
    function VCodeDirective(el) {
        this.el = el;
        /**
         * 时长（单位：秒），默认：`60`
         */
        this.seconds = 60;
        /**
         * 倒计时模板，使用 `${num}` 表示当前秒数
         */
        this.tpl = '${num} 秒';
        /**
         * 重新发送提醒文本
         */
        this.error = '重新发送';
        this._disabled = false;
    }
    VCodeDirective.prototype.ngOnInit = function () {
        if (!this.onSend)
            throw new Error('weui-vcode必须传递一个返回值为 `Observable<boolean>` 函数');
        this._cur = this.el.nativeElement.innerHTML;
    };
    VCodeDirective.prototype._onClick = function () {
        var _this = this;
        this._disabled = true;
        this.onSend().subscribe(function (res) {
            res ? _this.tick() : _this.err();
        });
    };
    VCodeDirective.prototype.err = function () {
        this._disabled = false;
        this.el.nativeElement.innerHTML = this.error;
    };
    VCodeDirective.prototype.tick = function () {
        var _this = this;
        var count = this.seconds < 1 ? 1 : this.seconds;
        this.setText(count);
        this._t = setInterval(function () {
            if (--count <= 0) {
                _this._disabled = false;
                _this.el.nativeElement.innerHTML = _this._cur;
                _this.destroy();
            }
            else
                _this.setText(count);
        }, 1000);
    };
    VCodeDirective.prototype.setText = function (num) {
        this.el.nativeElement.innerHTML = this.tpl.replace(/\${num}/, num.toString());
    };
    VCodeDirective.prototype.destroy = function () {
        if (this._t) {
            clearInterval(this._t);
            this._t = null;
        }
    };
    VCodeDirective.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-vcode'),
        __metadata("design:type", Function)
    ], VCodeDirective.prototype, "onSend", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-seconds'),
        __metadata("design:type", Number)
    ], VCodeDirective.prototype, "seconds", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-tpl'),
        __metadata("design:type", String)
    ], VCodeDirective.prototype, "tpl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-error'),
        __metadata("design:type", String)
    ], VCodeDirective.prototype, "error", void 0);
    VCodeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[weui-vcode]',
            host: {
                '(click)': '_onClick()',
                '[disabled]': '_disabled'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], VCodeDirective);
    return VCodeDirective;
}());



/***/ }),

/***/ "./components/gallery/gallery.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("./node_modules/@angular/animations/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_browser__ = __webpack_require__("./components/utils/browser.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GalleryComponent = /** @class */ (function () {
    function GalleryComponent() {
        /**
         * 是否允许删除，默认：`true`
         */
        this.canDelete = true;
        /**
         * 删除回调
         */
        this.delete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * 隐藏回调
         */
        this.hide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * 标记是否显示，支持双向绑定
         */
        this.show = false;
        this.showChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._showd = false;
    }
    Object.defineProperty(GalleryComponent.prototype, "_visibility", {
        get: function () {
            return this.show ? 'show' : 'hide';
        },
        enumerable: true,
        configurable: true
    });
    GalleryComponent.prototype._antStart = function () { if (this.show)
        this._showd = this.show; };
    GalleryComponent.prototype._antDone = function () { this._showd = this.show; };
    GalleryComponent.prototype._onDel = function (item) {
        if (this.canDelete) {
            this.delete.emit(item);
            this._onHide();
        }
        return false;
    };
    GalleryComponent.prototype._onHide = function () {
        this.show = false;
        this.showChange.emit(this.show);
        this.hide.emit();
    };
    GalleryComponent.prototype.ngOnChanges = function (changes) {
        if ('imgs' in changes)
            this.parseImgs();
    };
    GalleryComponent.prototype.parseImgs = function () {
        var imgs = this.imgs;
        if (Array.isArray(imgs)) {
            if (imgs.length > 0) {
                if (typeof imgs[0] === 'string') {
                    imgs = imgs.map(function (url) {
                        return { url: url };
                    });
                }
                else {
                    imgs = imgs.map(function (item) {
                        if (item.file)
                            item.url = Object(__WEBPACK_IMPORTED_MODULE_2__utils_browser__["a" /* genImageUrl */])(item.file);
                        return item;
                    });
                }
            }
        }
        else {
            if (typeof imgs === 'string')
                imgs = [{ url: imgs }];
            else {
                var imgUrl = Object(__WEBPACK_IMPORTED_MODULE_2__utils_browser__["a" /* genImageUrl */])(imgs);
                if (imgUrl)
                    imgs = [{ url: imgUrl }];
            }
        }
        // todo: 永远只返回一个
        // 针对未来可能直接上下个
        this._imgs = Object.assign([], imgs && imgs.length > 0 ? imgs.slice(0, 1) : []);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "imgs", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], GalleryComponent.prototype, "canDelete", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "delete", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "hide", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], GalleryComponent.prototype, "show", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "showChange", void 0);
    GalleryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-gallery',
            template: "\n        <div *ngIf=\"_imgs\" class=\"weui-galleries\">\n            <ng-template ngFor let-item [ngForOf]=\"_imgs\">\n                <div class=\"weui-gallery\"\n                    [ngStyle]=\"{'display': _showd ? 'block' : 'none'}\"\n                    [@visibility]=\"_visibility\"\n                    (@visibility.start)=\"_antStart($event)\"\n                    (@visibility.done)=\"_antDone($event)\"\n                    (click)=\"_onHide()\">\n                    <span class=\"weui-gallery__img\"\n                        [ngStyle]=\"{ 'background-image': 'url(' + item?.url + ')'}\"></span>\n                    <div class=\"weui-gallery__opr\" *ngIf=\"canDelete\">\n                        <a href=\"#\" class=\"weui-gallery__del\" (click)=\"_onDel(item)\">\n                            <i class=\"weui-icon-delete weui-icon_gallery-delete\"></i>\n                        </a>\n                    </div>\n                </div>\n            </ng-template>\n        </div>\n    ",
            animations: [Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* trigger */])('visibility', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('show', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1 })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('hide', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0 })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('hide <=> show', [Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(200)])
                ])]
        })
    ], GalleryComponent);
    return GalleryComponent;
}());



/***/ }),

/***/ "./components/gallery/gallery.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gallery_component__ = __webpack_require__("./components/gallery/gallery.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GalleryModule = /** @class */ (function () {
    function GalleryModule() {
    }
    GalleryModule_1 = GalleryModule;
    GalleryModule.forRoot = function () {
        return { ngModule: GalleryModule_1, providers: [] };
    };
    GalleryModule = GalleryModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__gallery_component__["a" /* GalleryComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__gallery_component__["a" /* GalleryComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__gallery_component__["a" /* GalleryComponent */]]
        })
    ], GalleryModule);
    return GalleryModule;
    var GalleryModule_1;
}());



/***/ }),

/***/ "./components/gallery/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gallery_component__ = __webpack_require__("./components/gallery/gallery.component.ts");
/* unused harmony reexport GalleryComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gallery_module__ = __webpack_require__("./components/gallery/gallery.module.ts");
/* unused harmony reexport GalleryModule */




/***/ }),

/***/ "./components/infiniteloader/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__infiniteloader_config__ = __webpack_require__("./components/infiniteloader/infiniteloader.config.ts");
/* unused harmony reexport InfiniteLoaderConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infiniteloader_component__ = __webpack_require__("./components/infiniteloader/infiniteloader.component.ts");
/* unused harmony reexport InfiniteLoaderComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infiniteloader_module__ = __webpack_require__("./components/infiniteloader/infiniteloader.module.ts");
/* unused harmony reexport InfiniteLoaderModule */





/***/ }),

/***/ "./components/infiniteloader/infiniteloader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteLoaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_FromEventObservable__ = __webpack_require__("./node_modules/rxjs/_esm5/observable/FromEventObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infiniteloader_config__ = __webpack_require__("./components/infiniteloader/infiniteloader.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InfiniteLoaderComponent = /** @class */ (function () {
    function InfiniteLoaderComponent(el, zone, DEF) {
        this.el = el;
        this.zone = zone;
        this.DEF = DEF;
        this.didScroll = false;
        this.scrollEvent = null;
        this.scrollTime = null;
        this._loading = false;
        this._finished = false;
        /**
         * 加载更多回调
         */
        this.loadmore = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /** 设置本次加载完成 */
    InfiniteLoaderComponent.prototype.resolveLoading = function () {
        this._loading = false;
        this._finished = false;
    };
    /** 设置结束 */
    InfiniteLoaderComponent.prototype.setFinished = function () {
        this._loading = false;
        this._finished = true;
    };
    /** 设置重新开始 */
    InfiniteLoaderComponent.prototype.restart = function () {
        this._finished = false;
    };
    InfiniteLoaderComponent.prototype._onScroll = function () {
        if (this._loading || this._finished)
            return;
        var target = this.scrollEvent.target;
        var scrollPercent = Math.floor(((target.scrollTop + target.clientHeight) / target.scrollHeight) * 100);
        if (scrollPercent > this.config.percent) {
            this._loading = true;
            this.loadmore.emit(this);
        }
    };
    InfiniteLoaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parseConfig();
        this.scrollTime = setInterval(function () {
            if (_this.didScroll) {
                _this.didScroll = false;
                _this._onScroll();
            }
        }, this.config.throttle);
        this.disposeScroller = __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_FromEventObservable__["a" /* FromEventObservable */].create(this.el.nativeElement.querySelector('.weui-infiniteloader__content'), 'scroll')
            .subscribe(function ($event) {
            _this.scrollEvent = $event;
            _this.didScroll = true;
        });
    };
    InfiniteLoaderComponent.prototype.ngOnChanges = function (changes) {
        if ('config' in changes)
            this.parseConfig();
    };
    InfiniteLoaderComponent.prototype.ngOnDestroy = function () {
        if (this.scrollTime)
            clearTimeout(this.scrollTime);
        if (this.disposeScroller)
            this.disposeScroller.unsubscribe();
    };
    InfiniteLoaderComponent.prototype.parseConfig = function () {
        this.config = Object.assign({}, this.DEF, this.config);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__infiniteloader_config__["a" /* InfiniteLoaderConfig */])
    ], InfiniteLoaderComponent.prototype, "config", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], InfiniteLoaderComponent.prototype, "loadmore", void 0);
    InfiniteLoaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-infiniteloader',
            template: "\n        <div class=\"weui-infiniteloader__content\">\n            <ng-content></ng-content>\n            <div *ngIf=\"_loading || _finished\">\n                <div *ngIf=\"_loading\" [innerHTML]=\"config.loading\"></div>\n                <div *ngIf=\"_finished\" [innerHTML]=\"config.finished\"></div>\n            </div>\n        </div>\n    ",
            host: {
                '[class.weui-infiniteloader]': 'true',
                '[style.height]': 'config.height'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_2__infiniteloader_config__["a" /* InfiniteLoaderConfig */]])
    ], InfiniteLoaderComponent);
    return InfiniteLoaderComponent;
}());



/***/ }),

/***/ "./components/infiniteloader/infiniteloader.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteLoaderConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var InfiniteLoaderConfig = /** @class */ (function () {
    function InfiniteLoaderConfig() {
        /**
         * 容器高度，默认：`100vh`
         */
        this.height = '100vh';
        /**
         * 滚动至x%时触发加载，默认：75%
         */
        this.percent = 75;
        /**
         * 加载中文本（支持HTML），默认：weui-loadmore 组件
         */
        this.loading = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">加载中…</span></div>';
        /**
         * 完成所有数据加载文本（支持HTML），默认：weui-loadmore 组件
         */
        this.finished = '<div class="weui-loadmore weui-loadmore_line"><span class="weui-loadmore__tips">已加载完毕</span></div>';
        /**滚动节流时长（单位：ms），默认：`100` */
        this.throttle = 100;
    }
    InfiniteLoaderConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], InfiniteLoaderConfig);
    return InfiniteLoaderConfig;
}());



/***/ }),

/***/ "./components/infiniteloader/infiniteloader.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteLoaderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infiniteloader_component__ = __webpack_require__("./components/infiniteloader/infiniteloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__infiniteloader_config__ = __webpack_require__("./components/infiniteloader/infiniteloader.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var InfiniteLoaderModule = /** @class */ (function () {
    function InfiniteLoaderModule() {
    }
    InfiniteLoaderModule_1 = InfiniteLoaderModule;
    InfiniteLoaderModule.forRoot = function () {
        return { ngModule: InfiniteLoaderModule_1, providers: [__WEBPACK_IMPORTED_MODULE_3__infiniteloader_config__["a" /* InfiniteLoaderConfig */]] };
    };
    InfiniteLoaderModule = InfiniteLoaderModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__infiniteloader_component__["a" /* InfiniteLoaderComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__infiniteloader_component__["a" /* InfiniteLoaderComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__infiniteloader_component__["a" /* InfiniteLoaderComponent */]]
        })
    ], InfiniteLoaderModule);
    return InfiniteLoaderModule;
    var InfiniteLoaderModule_1;
}());



/***/ }),

/***/ "./components/jweixin/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jweixin_service__ = __webpack_require__("./components/jweixin/jweixin.service.ts");
/* unused harmony reexport JWeiXinService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jweixin_module__ = __webpack_require__("./components/jweixin/jweixin.module.ts");
/* unused harmony reexport JWeiXinModule */




/***/ }),

/***/ "./components/jweixin/jweixin.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JWeiXinModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jweixin_service__ = __webpack_require__("./components/jweixin/jweixin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_loader_service__ = __webpack_require__("./components/utils/loader.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var JWeiXinModule = /** @class */ (function () {
    function JWeiXinModule() {
    }
    JWeiXinModule_1 = JWeiXinModule;
    JWeiXinModule.forRoot = function () {
        return { ngModule: JWeiXinModule_1, providers: [] };
    };
    JWeiXinModule = JWeiXinModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [__WEBPACK_IMPORTED_MODULE_1__jweixin_service__["a" /* JWeiXinService */], __WEBPACK_IMPORTED_MODULE_2__utils_loader_service__["a" /* LoaderService */]]
        })
    ], JWeiXinModule);
    return JWeiXinModule;
    var JWeiXinModule_1;
}());



/***/ }),

/***/ "./components/jweixin/jweixin.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JWeiXinService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_loader_service__ = __webpack_require__("./components/utils/loader.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var JWeiXinService = /** @class */ (function () {
    function JWeiXinService(load) {
        this.load = load;
    }
    /**
     * 懒加载jweixin.js
     *
     * @param jweixinUrl 默认：//res.wx.qq.com/open/js/jweixin-1.2.0.js
     */
    JWeiXinService.prototype.get = function (jweixinUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.load.loadScript(jweixinUrl || '//res.wx.qq.com/open/js/jweixin-1.2.0.js').then(function (res) {
                resolve(res.loaded === true);
            }).catch(function () {
                resolve(false);
            });
        });
    };
    JWeiXinService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__utils_loader_service__["a" /* LoaderService */]])
    ], JWeiXinService);
    return JWeiXinService;
}());



/***/ }),

/***/ "./components/loadmore/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loadmore_component__ = __webpack_require__("./components/loadmore/loadmore.component.ts");
/* unused harmony reexport LoadmoreComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loadmore_config__ = __webpack_require__("./components/loadmore/loadmore.config.ts");
/* unused harmony reexport LoadmoreConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loadmore_module__ = __webpack_require__("./components/loadmore/loadmore.module.ts");
/* unused harmony reexport LoadmoreModule */





/***/ }),

/***/ "./components/loadmore/loadmore.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadmoreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loadmore_config__ = __webpack_require__("./components/loadmore/loadmore.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadmoreComponent = /** @class */ (function () {
    function LoadmoreComponent(DEF) {
        /**
         * 类型，默认：`loading`
         */
        this.type = 'loading';
        /**
         * 当 `type==='loading'` 时显示的文本，默认：`正在加载`
         */
        this.loadingText = '正在加载';
        /**
         * 当 `type==='line'` 时显示的文本，默认：`暂无数据`
         */
        this.lineText = '暂无数据';
        Object.assign(this, DEF);
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], LoadmoreComponent.prototype, "type", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], LoadmoreComponent.prototype, "loadingText", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], LoadmoreComponent.prototype, "lineText", void 0);
    LoadmoreComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-loadmore',
            template: "\n        <div class=\"weui-loadmore\" [ngClass]=\"{\n            'weui-loadmore_line': type!=='loading',\n            'weui-loadmore_dot': type==='dot'\n        }\">\n            <i class=\"weui-loading\" *ngIf=\"type==='loading'\"></i>\n            <span class=\"weui-loadmore__tips\">{{type==='dot'?'':type==='line'?lineText:loadingText}}</span>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__loadmore_config__["a" /* LoadmoreConfig */]])
    ], LoadmoreComponent);
    return LoadmoreComponent;
}());



/***/ }),

/***/ "./components/loadmore/loadmore.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadmoreConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoadmoreConfig = /** @class */ (function () {
    function LoadmoreConfig() {
        /**
         * 类型，默认：`loading`
         */
        this.type = 'loading';
        /**
         * 当type=='loading'时显示的文本，默认：`正在加载`
         */
        this.loadingText = '正在加载';
        /**
         * 当type=='line'时显示的文本，默认：`暂无数据`
         */
        this.lineText = '暂无数据';
    }
    LoadmoreConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], LoadmoreConfig);
    return LoadmoreConfig;
}());



/***/ }),

/***/ "./components/loadmore/loadmore.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadmoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loadmore_component__ = __webpack_require__("./components/loadmore/loadmore.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loadmore_config__ = __webpack_require__("./components/loadmore/loadmore.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoadmoreModule = /** @class */ (function () {
    function LoadmoreModule() {
    }
    LoadmoreModule_1 = LoadmoreModule;
    LoadmoreModule.forRoot = function () {
        return { ngModule: LoadmoreModule_1, providers: [__WEBPACK_IMPORTED_MODULE_3__loadmore_config__["a" /* LoadmoreConfig */]] };
    };
    LoadmoreModule = LoadmoreModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__loadmore_component__["a" /* LoadmoreComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__loadmore_component__["a" /* LoadmoreComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__loadmore_component__["a" /* LoadmoreComponent */]]
        })
    ], LoadmoreModule);
    return LoadmoreModule;
    var LoadmoreModule_1;
}());



/***/ }),

/***/ "./components/mask/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mask_component__ = __webpack_require__("./components/mask/mask.component.ts");
/* unused harmony reexport MaskComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mask_module__ = __webpack_require__("./components/mask/mask.module.ts");
/* unused harmony reexport MaskModule */




/***/ }),

/***/ "./components/mask/mask.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaskComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__ = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MaskComponent = /** @class */ (function () {
    function MaskComponent() {
        /**
         * 点击是否允许关闭（默认：`false`）
         */
        this.backdrop = false;
        /**
         * 内容方向（默认：`vertical`）
         * + `top`: 顶部居中
         * + `bottom`: 底部居中
         * + `vertical-left`: 垂直居左
         * + `vertical`: 垂直居中
         * + `vertical-right`: 垂直居右
         * + `none`: 无
         */
        this.placement = 'vertical';
        /**
         * 内容背景色
         */
        this.bg = '';
        /**
         * 内容为Loading效果（默认：`false`）
         */
        this.loading = false;
        /**
         * 关闭回调
         */
        this.close = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._shown = false;
    }
    /**
     * 显示，并返回一个Observable
     */
    MaskComponent.prototype.show = function () {
        var _this = this;
        setTimeout(function () {
            _this._shown = true;
        });
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].create(function (observer) {
            _this.observer = observer;
        });
    };
    /**
     * 隐藏
     *
     * @param is_backdrop 是否手动点击关闭（默认：false）
     */
    MaskComponent.prototype.hide = function (is_backdrop) {
        if (is_backdrop === void 0) { is_backdrop = false; }
        if (is_backdrop === true && this.backdrop === false)
            return false;
        this._shown = false;
        this.close.emit();
    };
    MaskComponent.prototype.ngOnDestroy = function () {
        if (this.observer && this.observer instanceof __WEBPACK_IMPORTED_MODULE_2_rxjs_Subscription__["a" /* Subscription */]) {
            this.observer.unsubscribe();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], MaskComponent.prototype, "backdrop", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], MaskComponent.prototype, "placement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], MaskComponent.prototype, "bg", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], MaskComponent.prototype, "loading", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], MaskComponent.prototype, "close", void 0);
    MaskComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-mask',
            template: "\n    <div class=\"weui-mask\" [ngClass]=\"{'weui-mask__visible': _shown }\" (click)=\"hide(true)\">\n        <div class=\"weui-mask__content\" [ngClass]=\"placement !== 'none' ? 'weui-mask__' + placement : ''\">\n            <div [ngStyle]=\"{'background-color':bg}\">\n                <div *ngIf=\"loading\"><i class=\"weui-loading weui-icon_toast\"></i></div>\n                <ng-content></ng-content>\n            </div>\n        </div>\n    </div>"
        })
    ], MaskComponent);
    return MaskComponent;
}());



/***/ }),

/***/ "./components/mask/mask.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaskModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mask_component__ = __webpack_require__("./components/mask/mask.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MaskModule = /** @class */ (function () {
    function MaskModule() {
    }
    MaskModule_1 = MaskModule;
    MaskModule.forRoot = function () {
        return { ngModule: MaskModule_1, providers: [] };
    };
    MaskModule = MaskModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__mask_component__["a" /* MaskComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__mask_component__["a" /* MaskComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__mask_component__["a" /* MaskComponent */]]
        })
    ], MaskModule);
    return MaskModule;
    var MaskModule_1;
}());



/***/ }),

/***/ "./components/ngx-weui.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export WeUiRootModule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WeUiModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cell_cell_module__ = __webpack_require__("./components/cell/cell.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_button_module__ = __webpack_require__("./components/button/button.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_form_module__ = __webpack_require__("./components/form/form.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__slider_slider_module__ = __webpack_require__("./components/slider/slider.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__uploader_uploader_module__ = __webpack_require__("./components/uploader/uploader.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actionsheet_actionsheet_module__ = __webpack_require__("./components/actionsheet/actionsheet.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dialog_dialog_module__ = __webpack_require__("./components/dialog/dialog.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__loadmore_loadmore_module__ = __webpack_require__("./components/loadmore/loadmore.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__progress_progress_module__ = __webpack_require__("./components/progress/progress.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__gallery_gallery_module__ = __webpack_require__("./components/gallery/gallery.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__picker_picker_module__ = __webpack_require__("./components/picker/picker.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__searchbar_searchbar_module__ = __webpack_require__("./components/searchbar/searchbar.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__tab_tab_module__ = __webpack_require__("./components/tab/tab.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__toast_toast_module__ = __webpack_require__("./components/toast/toast.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__toptips_toptips_module__ = __webpack_require__("./components/toptips/toptips.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__popup_popup_module__ = __webpack_require__("./components/popup/popup.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ptr_ptr_module__ = __webpack_require__("./components/ptr/ptr.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__infiniteloader_infiniteloader_module__ = __webpack_require__("./components/infiniteloader/infiniteloader.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__sidebar_sidebar_module__ = __webpack_require__("./components/sidebar/sidebar.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__swiper_swiper_module__ = __webpack_require__("./components/swiper/swiper.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__chart_g2_chart_g2_module__ = __webpack_require__("./components/chart-g2/chart-g2.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__jweixin_jweixin_module__ = __webpack_require__("./components/jweixin/jweixin.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__accordion_accordion_module__ = __webpack_require__("./components/accordion/accordion.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__mask_mask_module__ = __webpack_require__("./components/mask/mask.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__rating_rating_module__ = __webpack_require__("./components/rating/rating.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__stepper_stepper_module__ = __webpack_require__("./components/stepper/stepper.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pagination_pagination_module__ = __webpack_require__("./components/pagination/pagination.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__cell__ = __webpack_require__("./components/cell/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__button__ = __webpack_require__("./components/button/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__form__ = __webpack_require__("./components/form/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__slider__ = __webpack_require__("./components/slider/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__uploader__ = __webpack_require__("./components/uploader/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_32__uploader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__actionsheet__ = __webpack_require__("./components/actionsheet/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__dialog__ = __webpack_require__("./components/dialog/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__loadmore__ = __webpack_require__("./components/loadmore/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__progress__ = __webpack_require__("./components/progress/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__gallery__ = __webpack_require__("./components/gallery/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__picker__ = __webpack_require__("./components/picker/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__searchbar__ = __webpack_require__("./components/searchbar/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__tab__ = __webpack_require__("./components/tab/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__toast__ = __webpack_require__("./components/toast/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__toptips__ = __webpack_require__("./components/toptips/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__popup__ = __webpack_require__("./components/popup/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ptr__ = __webpack_require__("./components/ptr/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__infiniteloader__ = __webpack_require__("./components/infiniteloader/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__sidebar__ = __webpack_require__("./components/sidebar/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__swiper__ = __webpack_require__("./components/swiper/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__chart_g2__ = __webpack_require__("./components/chart-g2/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__jweixin__ = __webpack_require__("./components/jweixin/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__accordion__ = __webpack_require__("./components/accordion/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__mask__ = __webpack_require__("./components/mask/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__rating__ = __webpack_require__("./components/rating/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__stepper__ = __webpack_require__("./components/stepper/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pagination__ = __webpack_require__("./components/pagination/index.ts");
/* unused harmony namespace reexport */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























































var MODULES = [
    __WEBPACK_IMPORTED_MODULE_1__cell_cell_module__["a" /* CellModule */], __WEBPACK_IMPORTED_MODULE_2__button_button_module__["a" /* ButtonModule */], __WEBPACK_IMPORTED_MODULE_3__form_form_module__["a" /* FormModule */], __WEBPACK_IMPORTED_MODULE_4__slider_slider_module__["a" /* SliderModule */], __WEBPACK_IMPORTED_MODULE_5__uploader_uploader_module__["a" /* UploaderModule */], __WEBPACK_IMPORTED_MODULE_6__actionsheet_actionsheet_module__["a" /* ActionSheetModule */],
    __WEBPACK_IMPORTED_MODULE_7__dialog_dialog_module__["a" /* DialogModule */], __WEBPACK_IMPORTED_MODULE_8__loadmore_loadmore_module__["a" /* LoadmoreModule */], __WEBPACK_IMPORTED_MODULE_9__progress_progress_module__["a" /* ProgressModule */], __WEBPACK_IMPORTED_MODULE_10__gallery_gallery_module__["a" /* GalleryModule */], __WEBPACK_IMPORTED_MODULE_11__picker_picker_module__["a" /* PickerModule */], __WEBPACK_IMPORTED_MODULE_12__searchbar_searchbar_module__["a" /* SearchBarModule */],
    __WEBPACK_IMPORTED_MODULE_13__tab_tab_module__["a" /* TabModule */], __WEBPACK_IMPORTED_MODULE_14__toast_toast_module__["a" /* ToastModule */], __WEBPACK_IMPORTED_MODULE_15__toptips_toptips_module__["a" /* ToptipsModule */], __WEBPACK_IMPORTED_MODULE_16__popup_popup_module__["a" /* PopupModule */], __WEBPACK_IMPORTED_MODULE_17__ptr_ptr_module__["a" /* PTRModule */], __WEBPACK_IMPORTED_MODULE_18__infiniteloader_infiniteloader_module__["a" /* InfiniteLoaderModule */],
    __WEBPACK_IMPORTED_MODULE_19__sidebar_sidebar_module__["a" /* SidebarModule */], __WEBPACK_IMPORTED_MODULE_20__swiper_swiper_module__["a" /* SwiperModule */], __WEBPACK_IMPORTED_MODULE_21__chart_g2_chart_g2_module__["a" /* ChartG2Module */], __WEBPACK_IMPORTED_MODULE_22__jweixin_jweixin_module__["a" /* JWeiXinModule */], __WEBPACK_IMPORTED_MODULE_23__accordion_accordion_module__["a" /* AccordionModule */], __WEBPACK_IMPORTED_MODULE_24__mask_mask_module__["a" /* MaskModule */],
    __WEBPACK_IMPORTED_MODULE_25__rating_rating_module__["a" /* RatingModule */], __WEBPACK_IMPORTED_MODULE_26__stepper_stepper_module__["a" /* StepperModule */], __WEBPACK_IMPORTED_MODULE_27__pagination_pagination_module__["a" /* PaginationModule */]
];
var WeUiRootModule = /** @class */ (function () {
    function WeUiRootModule() {
    }
    WeUiRootModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__cell_cell_module__["a" /* CellModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_2__button_button_module__["a" /* ButtonModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_3__form_form_module__["a" /* FormModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_4__slider_slider_module__["a" /* SliderModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_5__uploader_uploader_module__["a" /* UploaderModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_6__actionsheet_actionsheet_module__["a" /* ActionSheetModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7__dialog_dialog_module__["a" /* DialogModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_8__loadmore_loadmore_module__["a" /* LoadmoreModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_9__progress_progress_module__["a" /* ProgressModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_10__gallery_gallery_module__["a" /* GalleryModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_11__picker_picker_module__["a" /* PickerModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_12__searchbar_searchbar_module__["a" /* SearchBarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_13__tab_tab_module__["a" /* TabModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_14__toast_toast_module__["a" /* ToastModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_15__toptips_toptips_module__["a" /* ToptipsModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_16__popup_popup_module__["a" /* PopupModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_17__ptr_ptr_module__["a" /* PTRModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_18__infiniteloader_infiniteloader_module__["a" /* InfiniteLoaderModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_19__sidebar_sidebar_module__["a" /* SidebarModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_20__swiper_swiper_module__["a" /* SwiperModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_21__chart_g2_chart_g2_module__["a" /* ChartG2Module */].forRoot(), __WEBPACK_IMPORTED_MODULE_22__jweixin_jweixin_module__["a" /* JWeiXinModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_23__accordion_accordion_module__["a" /* AccordionModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_24__mask_mask_module__["a" /* MaskModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_25__rating_rating_module__["a" /* RatingModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_26__stepper_stepper_module__["a" /* StepperModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_27__pagination_pagination_module__["a" /* PaginationModule */].forRoot()
            ],
            exports: MODULES
        })
    ], WeUiRootModule);
    return WeUiRootModule;
}());

var WeUiModule = /** @class */ (function () {
    function WeUiModule() {
    }
    WeUiModule.forRoot = function () {
        return { ngModule: WeUiRootModule };
    };
    WeUiModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({ exports: MODULES })
    ], WeUiModule);
    return WeUiModule;
}());



/***/ }),

/***/ "./components/pagination/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination_config__ = __webpack_require__("./components/pagination/pagination.config.ts");
/* unused harmony reexport PaginationConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pagination_component__ = __webpack_require__("./components/pagination/pagination.component.ts");
/* unused harmony reexport PaginationComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pagination_module__ = __webpack_require__("./components/pagination/pagination.module.ts");
/* unused harmony reexport PaginationModule */





/***/ }),

/***/ "./components/pagination/pagination.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pagination_config__ = __webpack_require__("./components/pagination/pagination.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PaginationComponent = /** @class */ (function () {
    function PaginationComponent(cog) {
        this._ptArr = [];
        /** 当前索引 */
        this.current = 0;
        /** 数据总数 */
        this.total = 0;
        /**
         * 小号按钮，默认：`true`
         */
        this.mini = true;
        /** 分页触发的回调函数 */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._prevDisabled = false;
        this._nextDisabled = false;
        Object.assign(this, cog);
    }
    PaginationComponent.prototype.ngOnChanges = function (changes) {
        if (this.mode === 'pointer')
            this._ptArr = Array(this.total).fill(1).map(function (v, i) { return v + i; });
        this._checkDisabled();
    };
    PaginationComponent.prototype._checkDisabled = function () {
        if (this.mode === 'pointer')
            return;
        this._prevDisabled = this.current <= 1;
        this._nextDisabled = this.current >= this.total;
    };
    PaginationComponent.prototype._goto = function (value) {
        if (value === -1 && this._prevDisabled)
            return false;
        if (value === 1 && this._nextDisabled)
            return false;
        this.current += value;
        this._checkDisabled();
        this.change.emit(this.current);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PaginationComponent.prototype, "mode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "current", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "total", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PaginationComponent.prototype, "simple", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PaginationComponent.prototype, "mini", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PaginationComponent.prototype, "prevText", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PaginationComponent.prototype, "nextText", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "change", void 0);
    PaginationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-pagination',
            template: "\n    <ng-template [ngIf]=\"mode==='button'\">\n        <div class=\"weui-pagination__item weui-pagination__prev\">\n            <a weui-button (click)=\"_goto(-1)\" weui-plain [weui-mini]=\"mini\" weui-type=\"default\" [disabled]=\"_prevDisabled\" [innerHTML]=\"prevText\"></a>\n        </div>\n        <div class=\"weui-pagination__item weui-pagination__num\" *ngIf=\"!simple\">{{current}}/{{total}}</div>\n        <div class=\"weui-pagination__item weui-pagination__next\">\n            <a weui-button (click)=\"_goto(1)\" weui-plain [weui-mini]=\"mini\" weui-type=\"default\" [disabled]=\"_nextDisabled\" [innerHTML]=\"nextText\"></a>\n        </div>\n    </ng-template>\n    <div class=\"weui-pagination__item weui-pagination__num\" *ngIf=\"mode==='pointer'\">\n        <div *ngFor=\"let i of _ptArr\" class=\"weui-pagination__dot\" [class.weui-pagination__dot-active]=\"current === i\"><span></span></div>\n    </div>\n    ",
            host: {
                'class': 'weui-pagination'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__pagination_config__["a" /* PaginationConfig */]])
    ], PaginationComponent);
    return PaginationComponent;
}());



/***/ }),

/***/ "./components/pagination/pagination.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PaginationConfig = /** @class */ (function () {
    function PaginationConfig() {
        /**
         * 形态，可选 `button`,`pointer`，默认：`button`
         */
        this.mode = 'button';
        /**
         * 是否隐藏数值，默认：`false`
         */
        this.simple = false;
        /**
         * 小号按钮，默认：`true`
         */
        this.mini = true;
        /**
         * 上一页文本（支持HTML），默认：`上一页`
         */
        this.prevText = '上一页';
        /**
         * 下一页文本（支持HTML），默认：`下一步`
         */
        this.nextText = '下一步';
    }
    PaginationConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], PaginationConfig);
    return PaginationConfig;
}());



/***/ }),

/***/ "./components/pagination/pagination.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_button_module__ = __webpack_require__("./components/button/button.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pagination_component__ = __webpack_require__("./components/pagination/pagination.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pagination_config__ = __webpack_require__("./components/pagination/pagination.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    PaginationModule_1 = PaginationModule;
    PaginationModule.forRoot = function () {
        return { ngModule: PaginationModule_1, providers: [__WEBPACK_IMPORTED_MODULE_4__pagination_config__["a" /* PaginationConfig */]] };
    };
    PaginationModule = PaginationModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_2__button_button_module__["a" /* ButtonModule */].forRoot()],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__pagination_component__["a" /* PaginationComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__pagination_component__["a" /* PaginationComponent */]
            ]
        })
    ], PaginationModule);
    return PaginationModule;
    var PaginationModule_1;
}());



/***/ }),

/***/ "./components/picker/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__picker_config__ = __webpack_require__("./components/picker/picker.config.ts");
/* unused harmony reexport PickerConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__picker_group_component__ = __webpack_require__("./components/picker/picker-group.component.ts");
/* unused harmony reexport PickerGroupComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__picker_component__ = __webpack_require__("./components/picker/picker.component.ts");
/* unused harmony reexport PickerComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__picker_city_component__ = __webpack_require__("./components/picker/picker-city.component.ts");
/* unused harmony reexport CityPickerComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__picker_date_component__ = __webpack_require__("./components/picker/picker-date.component.ts");
/* unused harmony reexport DatePickerComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__picker_service__ = __webpack_require__("./components/picker/picker.service.ts");
/* unused harmony reexport PickerService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__picker_module__ = __webpack_require__("./components/picker/picker.module.ts");
/* unused harmony reexport PickerModule */









/***/ }),

/***/ "./components/picker/picker-city.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CityPickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__picker_component__ = __webpack_require__("./components/picker/picker.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * 城市选择器（并不包含城市数据，可以参考示例中的数据格式）
 */
var CityPickerComponent = /** @class */ (function () {
    function CityPickerComponent() {
        this._groups = [];
        this._selected = [];
        this.dataMap = { label: 'name', value: 'code', items: 'sub' };
        /**
         * 确认后回调当前选择数据（包括已选面板所有数据）
         *
         * `{ value: '10000', items: [ {}, {}, {} ] }`
         */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 列变更时回调 */
        this.groupChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 取消后回调 */
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 显示时回调 */
        this.show = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 隐藏后回调 */
        this.hide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    CityPickerComponent_1 = CityPickerComponent;
    Object.defineProperty(CityPickerComponent.prototype, "data", {
        /** 城市数据，可以参考示例中的数据格式 */
        set: function (d) {
            this._tmpData = d;
            this.parseData(this._tmpData, this.dataMap.items, this._selected);
        },
        enumerable: true,
        configurable: true
    });
    CityPickerComponent.prototype.ngOnDestroy = function () {
        this._tmpData = null;
        this._groups = null;
    };
    CityPickerComponent.prototype.parseData = function (data, subKey, selected, group, newselected) {
        var _this = this;
        if (selected === void 0) { selected = []; }
        if (group === void 0) { group = []; }
        if (newselected === void 0) { newselected = []; }
        var _selected = 0;
        if (Array.isArray(selected) && selected.length > 0) {
            var _selectedClone = selected.slice(0);
            _selected = _selectedClone.shift();
            selected = _selectedClone;
        }
        if (typeof data[_selected] === 'undefined') {
            _selected = 0;
        }
        newselected.push(_selected);
        var item = data[_selected];
        var _group = JSON.parse(JSON.stringify(data));
        _group.forEach(function (g) {
            delete g[subKey];
            g.label = g[_this.dataMap.label];
            g.value = g[_this.dataMap.value];
        });
        group.push(_group);
        if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey])) {
            return this.parseData(item[subKey], subKey, selected, group, newselected);
        }
        else {
            this._groups = group;
            this._selected = newselected;
            return { groups: group, newselected: newselected };
        }
    };
    /**
     * 将值转换成位置
     */
    CityPickerComponent.prototype.valueToSelect = function (data, subKey, dept, newSelected) {
        var _this = this;
        if (dept === void 0) { dept = 1; }
        if (newSelected === void 0) { newSelected = []; }
        var code = (this._value.substr(0, dept * 2) + '0000').substr(0, 6);
        var _selected = data.findIndex(function (w) { return w[_this.dataMap.value] === code; });
        if (_selected <= -1) {
            _selected = 0;
        }
        newSelected.push(_selected);
        var item = data[_selected];
        if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey])) {
            return this.valueToSelect(item[subKey], subKey, ++dept, newSelected);
        }
        else {
            this._selected = newSelected;
            setTimeout(function () {
                _this._pickerInstance._setText();
            }, 100);
            return newSelected;
        }
    };
    CityPickerComponent.prototype._onCityChange = function (data) {
        this.onChange(data.value);
        this.onTouched();
        this.change.emit(data);
    };
    CityPickerComponent.prototype._onCityGroupChange = function (res) {
        this._selected[res.groupIndex] = res.index;
        if (res.groupIndex !== 2)
            this.parseData(this._tmpData, this.dataMap.items, this._selected);
        this.groupChange.emit(res);
    };
    CityPickerComponent.prototype._onCityCancelChange = function () {
        this.cancel.emit();
    };
    /** 服务于Service，并无实际意义 */
    CityPickerComponent.prototype._triggerShow = function () {
        this._pickerInstance._onShow();
    };
    CityPickerComponent.prototype._onShow = function () {
        this.show.emit();
    };
    CityPickerComponent.prototype._onHide = function () {
        this.hide.emit();
    };
    CityPickerComponent.prototype.writeValue = function (value) {
        if (!value) {
            this._pickerInstance._text = '';
            return;
        }
        this._value = value;
        if (this._value && this._value.length === 6) {
            this.valueToSelect(this._tmpData, this.dataMap.items, 1);
            this.parseData(this._tmpData, this.dataMap.items, this._selected);
        }
    };
    CityPickerComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    CityPickerComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    CityPickerComponent.prototype.setDisabledState = function (isDisabled) {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2__picker_component__["a" /* PickerComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__picker_component__["a" /* PickerComponent */])
    ], CityPickerComponent.prototype, "_pickerInstance", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CityPickerComponent.prototype, "dataMap", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CityPickerComponent.prototype, "data", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CityPickerComponent.prototype, "options", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], CityPickerComponent.prototype, "placeholder", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], CityPickerComponent.prototype, "disabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], CityPickerComponent.prototype, "change", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], CityPickerComponent.prototype, "groupChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], CityPickerComponent.prototype, "cancel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], CityPickerComponent.prototype, "show", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], CityPickerComponent.prototype, "hide", void 0);
    CityPickerComponent = CityPickerComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-city-picker',
            template: "\n    <weui-picker [placeholder]=\"placeholder\"\n        [groups]=\"_groups\" [defaultSelect]=\"_selected\" [disabled]=\"disabled\" [options]=\"options\"\n        (show)=\"_onShow()\"\n        (hide)=\"_onHide()\"\n        (change)=\"_onCityChange($event)\"\n        (groupChange)=\"_onCityGroupChange($event)\"\n        (cancel)=\"_onCityCancelChange()\"></weui-picker>\n    ",
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_VALUE_ACCESSOR */],
                    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return CityPickerComponent_1; }),
                    multi: true
                }]
        })
    ], CityPickerComponent);
    return CityPickerComponent;
    var CityPickerComponent_1;
}());



/***/ }),

/***/ "./components/picker/picker-date.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export FORMAT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatePickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__picker_component__ = __webpack_require__("./components/picker/picker.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FORMAT = {
    format: null,
    yu: '年',
    Mu: '月',
    du: '日',
    hu: '时',
    mu: '分'
};
/**
 * 日期时间选择器
 */
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent(el, datePipe) {
        this.el = el;
        this.datePipe = datePipe;
        this._groups = [];
        this._selected = [];
        /**
         * 类型
         * + `date-ym` 年月
         * + `date` 日期
         * + `datetime` 日期&时间（不包括秒）
         * + `time` 时间（不包括秒）
         */
        this.type = 'date';
        this._format = Object.assign({}, FORMAT);
        /** 确认后回调 */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 列变更时回调 */
        this.groupChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 取消后回调 */
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 显示时回调 */
        this.show = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 隐藏后回调 */
        this.hide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.initFlag = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    DatePickerComponent_1 = DatePickerComponent;
    Object.defineProperty(DatePickerComponent.prototype, "format", {
        /**
         * 日期格式化代码，实际是采用 DatePipe，所有代码内容和它一样
         */
        set: function (v) {
            if (typeof v === 'string') {
                this._format = Object.assign(FORMAT, {
                    format: v
                });
            }
            else {
                this._format = Object.assign(FORMAT, v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // todo: 太粗暴，需要优化代码
    DatePickerComponent.prototype.genGroups = function () {
        if (!this._value)
            this._value = new Date();
        this._groups = [];
        this._selected = [];
        if (~this.type.indexOf('date'))
            this.genDateGroups();
        if (~this.type.indexOf('time'))
            this.genDateTimeGroups();
    };
    DatePickerComponent.prototype.genDateGroups = function () {
        var _this = this;
        var year = this._value.getFullYear(), month = this._value.getMonth() + 1, day = this._value.getDate();
        // year
        var _selected = 0, startYear = year - 10, endYear = year + 10;
        if (this.min)
            startYear = this.min.getFullYear();
        if (this.max)
            endYear = this.max.getFullYear();
        this._groups.push(Array(endYear - startYear + 1).fill(0).map(function (v, idx) {
            var _v = startYear + idx;
            if (_v === year)
                _selected = idx;
            return { label: _v + _this._format.yu, value: _v };
        }));
        this._selected.push(_selected);
        // month
        var cy = this._groups[0][_selected].value;
        var startMonth = 1, endMonth = 12;
        if (cy === startYear)
            startMonth = this.min.getMonth() + 1;
        if (cy === endYear)
            endMonth = this.max.getMonth() + 1;
        _selected = 0;
        this._groups.push(Array(endMonth - startMonth + 1).fill(0).map(function (v, idx) {
            var _v = startMonth + idx;
            if (_v === month)
                _selected = idx;
            return { label: _v + _this._format.Mu, value: _v };
        }));
        this._selected.push(_selected);
        // day
        if (this.type !== 'date-ym') {
            var cm = this._groups[1][_selected].value;
            var startDay_1 = 1, endDay = new Date(year, month, 0).getDate();
            if (cy === startYear && cm === startMonth)
                startDay_1 = this.min.getDate();
            if (cy === endYear && cm === endMonth)
                endDay = this.max.getDate();
            _selected = 0;
            this._groups.push(Array(endDay - startDay_1 + 1).fill(0).map(function (v, idx) {
                var _v = startDay_1 + idx;
                if (_v === day)
                    _selected = idx;
                return { label: _v + _this._format.du, value: _v };
            }));
            this._selected.push(_selected);
        }
    };
    DatePickerComponent.prototype.genDateTimeGroups = function () {
        var _this = this;
        var hours = this._value.getHours(), minutes = this._value.getMinutes();
        // hours
        var _selected = 0;
        this._groups.push(Array(24).fill(0).map(function (v, idx) {
            var _v = idx;
            if (_v === hours)
                _selected = idx;
            return { label: _v + _this._format.hu, value: _v };
        }));
        this._selected.push(_selected);
        // minutes
        _selected = 0;
        this._groups.push(Array(60).fill(0).map(function (v, idx) {
            var _v = idx;
            if (_v === minutes)
                _selected = idx;
            return { label: _v + _this._format.mu, value: _v };
        }));
        this._selected.push(_selected);
    };
    // 根据selected
    DatePickerComponent.prototype.genValueBySelected = function () {
        if (this.type === 'time') {
            var now = new Date();
            this._value = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), this._groups[0][this._selected[0]].value, this._groups[1][this._selected[1]].value, 0);
            return this;
        }
        var obj = {
            y: this._groups[0][this._selected[0]].value,
            M: this._groups[1][this._selected[1]].value - 1,
            d: this.type !== 'date-ym' ? this._groups[2][this._selected[2]].value : 1,
            h: 0,
            m: 0,
            s: 0
        };
        if (~this.type.indexOf('time')) {
            obj.h = this._groups[3][this._selected[3]].value;
            obj.m = this._groups[4][this._selected[4]].value;
        }
        this._value = new Date(obj.y, obj.M, obj.d, obj.h, obj.m, obj.s);
        return this;
    };
    DatePickerComponent.prototype.ngOnDestroy = function () {
        this._groups = null;
    };
    DatePickerComponent.prototype.getFormatDate = function (date) {
        var f = '';
        if (this._format && this._format.format)
            f = this._format.format;
        else {
            switch (this.type) {
                case 'date-ym':
                    f = 'yyyy-MM';
                    break;
                case 'date':
                    f = 'yyyy-MM-dd';
                    break;
                case 'datetime':
                    f = 'yyyy-MM-dd HH:mm:ss';
                    break;
                case 'time':
                    f = 'HH:mm';
                    break;
            }
        }
        return this.datePipe.transform(date, f);
    };
    DatePickerComponent.prototype._onCityChange = function (data) {
        this.genValueBySelected();
        var retVal = new Date(this._value.getTime());
        this.onChange(retVal);
        this.onTouched();
        data.value = retVal;
        data.formatValue = this.getFormatDate(retVal);
        this._pickerInstance._text = data.formatValue;
        this.change.emit(data);
    };
    DatePickerComponent.prototype._onCityGroupChange = function (res) {
        this._selected[res.groupIndex] = res.index;
        if (res.groupIndex !== (this._groups.length - 1)) {
            this.genValueBySelected().genGroups();
        }
        this.groupChange.emit(res);
    };
    DatePickerComponent.prototype._onCityCancelChange = function () {
        this.cancel.emit();
    };
    DatePickerComponent.prototype.ngOnInit = function () {
        this.initFlag = true;
        this.genGroups();
    };
    DatePickerComponent.prototype.ngOnChanges = function (changes) {
        if (this.initFlag)
            this.genGroups();
    };
    /** 服务于Service，并无实际意义 */
    DatePickerComponent.prototype._triggerShow = function () {
        this._pickerInstance._onShow();
    };
    DatePickerComponent.prototype._onShow = function () {
        this.show.emit();
    };
    DatePickerComponent.prototype._onHide = function () {
        this.hide.emit();
    };
    DatePickerComponent.prototype.writeValue = function (value) {
        if (value)
            this.genGroups();
        this._value = value;
        this._pickerInstance._text = value instanceof Date ? this.getFormatDate(value) : '';
    };
    DatePickerComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    DatePickerComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    DatePickerComponent.prototype.setDisabledState = function (isDisabled) {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__picker_component__["a" /* PickerComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__picker_component__["a" /* PickerComponent */])
    ], DatePickerComponent.prototype, "_pickerInstance", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Date)
    ], DatePickerComponent.prototype, "min", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Date)
    ], DatePickerComponent.prototype, "max", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], DatePickerComponent.prototype, "type", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatePickerComponent.prototype, "format", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "options", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], DatePickerComponent.prototype, "placeholder", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], DatePickerComponent.prototype, "disabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "change", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "groupChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "cancel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "show", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "hide", void 0);
    DatePickerComponent = DatePickerComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-date-picker',
            template: "\n    <weui-picker [placeholder]=\"placeholder\"\n        [groups]=\"_groups\" [defaultSelect]=\"_selected\" [disabled]=\"disabled\" [options]=\"options\"\n        (show)=\"_onShow()\"\n        (hide)=\"_onHide()\"\n        (change)=\"_onCityChange($event)\"\n        (groupChange)=\"_onCityGroupChange($event)\"\n        (cancel)=\"_onCityCancelChange()\"></weui-picker>\n    ",
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["DatePipe"], {
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_VALUE_ACCESSOR */],
                    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return DatePickerComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_2__angular_common__["DatePipe"]])
    ], DatePickerComponent);
    return DatePickerComponent;
    var DatePickerComponent_1;
}());



/***/ }),

/***/ "./components/picker/picker-group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickerGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var getWindowHeight = function () {
    return window.innerHeight;
};
/**
 * 多列选择器组
 */
var PickerGroupComponent = /** @class */ (function () {
    function PickerGroupComponent() {
        /** 当前默认位置 */
        this.defaultIndex = -1;
        /** 变更回调 */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.defaults = {
            offset: 3,
            rowHeight: 34,
            bodyHeight: 7 * 34,
            inertiaTime: 150,
            slideDuration: 300 // 惯性滑动的动画时间，表现为最终可视化的效果
        };
        this._animating = false;
        this._distance = 0;
    }
    PickerGroupComponent.prototype.ngOnChanges = function (changes) {
        if ('defaultIndex' in changes) {
            if (this.defaultIndex < 0 || (this.items && this.defaultIndex >= this.items.length))
                this.defaultIndex = 0;
            this._distance = (this.defaults.offset - this.defaultIndex) * this.defaults.rowHeight;
        }
    };
    PickerGroupComponent.prototype.onTouchStart = function (e) {
        if (this.items.length <= 1)
            return;
        this.startY = e.changedTouches[0].pageY;
        this.startTime = +new Date();
    };
    PickerGroupComponent.prototype.onTouchMove = function (e) {
        if (this.items.length <= 1)
            return;
        var endTime = +new Date();
        this.endY = e.changedTouches[0].pageY;
        // 计算滑动的速度: 距离 / 时间
        var _distance = this.endY - this.startY;
        this.speed = _distance / (endTime - this.startTime);
        // 重新设置开始时间、开始位置
        this.startTime = endTime;
        this.startY = this.endY;
        this._animating = false; // ms
        this._distance += _distance; // 内容移动的距离
        e.preventDefault();
    };
    PickerGroupComponent.prototype.onTouchEnd = function (event) {
        if (!this.startY)
            return;
        this.endY = event.changedTouches[0].pageY;
        /**
         * 思路:
         * 根据最后一次touchmove事件的速度(speed)，判断是否执行惯性滑动；
         * 如果speed大于1、小于5，则根据速度乘以惯性滑动的时间(如150ms)，计算出应该滑动的距离；
         * 如果speed大于5，则按照屏幕的高度(减去列表高度的一半)，作为该滑动的距离。
         */
        var _speed = Math.abs(this.speed);
        if (_speed >= 5) {
            var windowY = getWindowHeight() - (this.defaults.bodyHeight / 2);
            this.stop(windowY - this.endY);
        }
        else if (_speed >= 1) {
            var diff = this.speed * this.defaults.inertiaTime; // 滑行 150ms,这里直接影响“灵敏度”
            this.stop(diff);
        }
        else {
            this.stop(0);
        }
        this.startY = null;
    };
    PickerGroupComponent.prototype.stop = function (diff) {
        var dist = this._distance + diff;
        // 移动到最接近的那一行
        dist = Math.round(dist / this.defaults.rowHeight) * this.defaults.rowHeight;
        var max = this._getMax(this.defaults.offset, this.defaults.rowHeight);
        var min = this._getMin(this.defaults.offset, this.defaults.rowHeight, this.items.length);
        // 不要超过最大值或者最小值
        dist = Math.max(Math.min(dist, max), min);
        // 如果是 disabled 的就跳过
        var index = this.defaults.offset - dist / this.defaults.rowHeight;
        while (!!this.items[index] && this.items[index].disabled) {
            diff > 0 ? ++index : --index;
        }
        dist = (this.defaults.offset - index) * this.defaults.rowHeight;
        this._animating = true;
        this._distance = dist; // px
        // 触发选择事件
        this.onChange(this.items[index], index);
    };
    PickerGroupComponent.prototype.onChange = function (item, index) {
        if (index === void 0) { index = 0; }
        this.change.emit({ item: item, index: index });
    };
    PickerGroupComponent.prototype._getMax = function (offset, rowHeight) {
        return offset * rowHeight;
    };
    PickerGroupComponent.prototype._getMin = function (offset, rowHeight, length) {
        return -(rowHeight * (length - offset - 1));
    };
    PickerGroupComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], PickerGroupComponent.prototype, "items", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], PickerGroupComponent.prototype, "defaultIndex", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], PickerGroupComponent.prototype, "groupIndex", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PickerGroupComponent.prototype, "change", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchstart', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [TouchEvent]),
        __metadata("design:returntype", void 0)
    ], PickerGroupComponent.prototype, "onTouchStart", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchmove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [TouchEvent]),
        __metadata("design:returntype", void 0)
    ], PickerGroupComponent.prototype, "onTouchMove", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [TouchEvent]),
        __metadata("design:returntype", void 0)
    ], PickerGroupComponent.prototype, "onTouchEnd", null);
    PickerGroupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-picker-group',
            template: "\n        <ng-content></ng-content>\n        <div class=\"weui-picker__mask\"></div>\n        <div class=\"weui-picker__indicator\"></div>\n        <div class=\"weui-picker__content\" [ngStyle]=\"{\n            'transform': 'translate(0,' + _distance + 'px)',\n            'transition': _animating ? 'transform .3s' : 'none'\n        }\">\n            <div class=\"weui-picker__item\" *ngFor=\"let item of items\"\n                [ngClass]=\"{'weui-picker__item_disabled': item.disabled}\">{{item.label || item.value}}</div>\n        </div>\n    ",
            host: {
                '[class.weui-picker__group]': 'true'
            }
        })
    ], PickerGroupComponent);
    return PickerGroupComponent;
}());



/***/ }),

/***/ "./components/picker/picker.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__picker_config__ = __webpack_require__("./components/picker/picker.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PickerComponent = /** @class */ (function () {
    function PickerComponent(el, DEF) {
        this.el = el;
        this.DEF = DEF;
        this._text = '';
        this.disabled = false;
        /**
         * 确认后回调当前选择数据（包括已选面板所有数据）
         *
         * `{ value: '10000', items: [ {}, {}, {} ] }`
         */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 列变更时回调 */
        this.groupChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 取消后回调 */
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 显示时回调 */
        this.show = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 隐藏后回调 */
        this.hide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._showP = false;
        this._shown = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    PickerComponent_1 = PickerComponent;
    Object.defineProperty(PickerComponent.prototype, "defaultSelect", {
        /**
         * 当前默认位置，数组的长度必须等同于 groups 长度
         */
        set: function (d) {
            if (d)
                this._selected = d;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickerComponent.prototype, "groups", {
        /**
         * 多列数据，以数组的长度来决定几列数据
         * 支持string[]单列数组，单纯只是为了方便
         */
        set: function (d) {
            if (!d)
                throw new Error('无效数据源');
            if (d.length > 0) {
                if (typeof d[0] === 'string') {
                    d = [
                        d.map(function (v) {
                            return { label: v, value: v };
                        })
                    ];
                }
            }
            this._groups = d;
            this._selected = this._selected ? this._selected : Array(d.length).fill(0);
        },
        enumerable: true,
        configurable: true
    });
    PickerComponent.prototype.ngOnInit = function () {
        if (!this.options)
            this.parseOptions();
    };
    PickerComponent.prototype._onHide = function (fh) {
        var _this = this;
        if (!fh && !this.options.backdrop)
            return false;
        this._shown = false;
        setTimeout(function () {
            _this._showP = false;
            _this.hide.emit();
        }, 300);
        return this;
    };
    PickerComponent.prototype._onShow = function () {
        if (this.disabled)
            return false;
        this._showP = true;
        this._shown = true;
        this.show.emit();
        return this;
    };
    PickerComponent.prototype.parseOptions = function () {
        this.options = Object.assign({
            type: 'form',
            cancel: '取消',
            confirm: '确定',
            backdrop: true,
            gruopCount: null,
            separator: ' '
        }, this.DEF, this.options);
    };
    PickerComponent.prototype.getSelecteItem = function () {
        var _this = this;
        var res = [];
        this._groups.forEach(function (items, idx) {
            var item = items[_this._selected[idx]];
            if (item)
                res.push(item);
        });
        return res;
    };
    PickerComponent.prototype._setText = function (res) {
        if (res === void 0) { res = null; }
        if (res === null)
            res = this.getSelecteItem();
        if (res.length > 0)
            this._text = res.map(function (i) { return i.label || i.value; }).join(this.options.separator);
        return this;
    };
    // 根据_value解析成相应值位置
    PickerComponent.prototype._setDefault = function () {
        var _this = this;
        this._selected = [];
        this._groups.forEach(function (items) {
            var idx = items.findIndex(function (i) { return i.value === _this._value; });
            if (idx <= -1)
                idx = 0;
            _this._selected.push(idx);
        });
        return this;
    };
    PickerComponent.prototype._onGroupChange = function (data, groupIndex) {
        this._selected[groupIndex] = data.index;
        this.groupChange.emit({ item: data.item, index: data.index, groupIndex: groupIndex });
    };
    PickerComponent.prototype._onCancel = function () {
        this.cancel.emit();
        this._onHide(true);
        return false;
    };
    PickerComponent.prototype._onConfirm = function () {
        var res = this.getSelecteItem();
        this._setText(res);
        var lastItem = res[res.length - 1] || {};
        var val = lastItem.value || lastItem.label;
        this.onChange(val);
        this.onTouched();
        this.change.emit({ value: val, items: res });
        this._onHide(true);
        return false;
    };
    PickerComponent.prototype.ngOnChanges = function (changes) {
        if ('options' in changes) {
            this.parseOptions();
        }
    };
    PickerComponent.prototype.ngOnDestroy = function () {
    };
    PickerComponent.prototype.writeValue = function (value) {
        if (!value)
            this._text = '';
        if (value && value !== this._value) {
            this._value = value;
            // todo：当ngModel传递一个未列表中的值的情况 & 多列时数据对应问题
            this._setDefault()._setText();
        }
    };
    PickerComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    PickerComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    PickerComponent.prototype.setDisabledState = function (isDisabled) {
    };
    PickerComponent.prototype._onFocus = function ($event) {
        arguments[0].target.blur();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "options", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], PickerComponent.prototype, "defaultSelect", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], PickerComponent.prototype, "groups", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PickerComponent.prototype, "placeholder", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PickerComponent.prototype, "disabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "change", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "groupChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "cancel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "show", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PickerComponent.prototype, "hide", void 0);
    PickerComponent = PickerComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-picker',
            template: "\n        <input type=\"text\" class=\"weui-input\" value=\"{{_text}}\" placeholder=\"{{placeholder}}\"\n            readonly=\"readonly\" (focus)=\"_onFocus($event)\"\n            (click)=\"_onShow()\" [disabled]=\"disabled\" *ngIf=\"options.type==='form'\">\n        <div [hidden]=\"!_showP\">\n            <div class=\"weui-mask\" (click)=\"_onHide(false)\"\n                [ngClass]=\"{'weui-animate-fade-in': _shown, 'weui-animate-fade-out': !_shown}\"></div>\n            <div class=\"weui-picker\"\n                [ngClass]=\"{'weui-animate-slide-up': _shown, 'weui-animate-slide-down': !_shown}\">\n                <div class=\"weui-picker__hd\">\n                    <a href=\"#\" class=\"weui-picker__action\" (click)=\"_onCancel()\">{{options.cancel}}</a>\n                    <a href=\"#\" class=\"weui-picker__action\" (click)=\"_onConfirm()\">{{options.confirm}}</a>\n                </div>\n                <div class=\"weui-picker__bd\">\n                    <weui-picker-group tappable\n                        *ngFor=\"let items of _groups; let i = index;\"\n                        [items]=\"items\"\n                        [defaultIndex]=\"_selected[i]\"\n                        groupIndex=\"{{i}}\" (change)=\"_onGroupChange($event, i)\"></weui-picker-group>\n                </div>\n            </div>\n        </div>\n    ",
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_VALUE_ACCESSOR */],
                    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return PickerComponent_1; }),
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_2__picker_config__["a" /* PickerConfig */]])
    ], PickerComponent);
    return PickerComponent;
    var PickerComponent_1;
}());



/***/ }),

/***/ "./components/picker/picker.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickerConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PickerConfig = /** @class */ (function () {
    function PickerConfig() {
        /**
         * 取消按钮文本，默认：`取消`
         */
        this.cancel = '取消';
        /**
         * 确定按钮文本，默认：`确定`
         */
        this.confirm = '确定';
        /**
         * 允许点击背景关闭，默认：`true`
         */
        this.backdrop = true;
    }
    PickerConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], PickerConfig);
    return PickerConfig;
}());



/***/ }),

/***/ "./components/picker/picker.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__picker_component__ = __webpack_require__("./components/picker/picker.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__picker_group_component__ = __webpack_require__("./components/picker/picker-group.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__picker_date_component__ = __webpack_require__("./components/picker/picker-date.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__picker_city_component__ = __webpack_require__("./components/picker/picker-city.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__picker_service__ = __webpack_require__("./components/picker/picker.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__picker_config__ = __webpack_require__("./components/picker/picker.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var PickerModule = /** @class */ (function () {
    function PickerModule() {
    }
    PickerModule_1 = PickerModule;
    PickerModule.forRoot = function () {
        return { ngModule: PickerModule_1, providers: [__WEBPACK_IMPORTED_MODULE_7__picker_config__["a" /* PickerConfig */]] };
    };
    PickerModule = PickerModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__picker_component__["a" /* PickerComponent */], __WEBPACK_IMPORTED_MODULE_3__picker_group_component__["a" /* PickerGroupComponent */], __WEBPACK_IMPORTED_MODULE_4__picker_date_component__["a" /* DatePickerComponent */], __WEBPACK_IMPORTED_MODULE_5__picker_city_component__["a" /* CityPickerComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__picker_component__["a" /* PickerComponent */], __WEBPACK_IMPORTED_MODULE_3__picker_group_component__["a" /* PickerGroupComponent */], __WEBPACK_IMPORTED_MODULE_4__picker_date_component__["a" /* DatePickerComponent */], __WEBPACK_IMPORTED_MODULE_5__picker_city_component__["a" /* CityPickerComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__picker_service__["a" /* PickerService */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__picker_component__["a" /* PickerComponent */], __WEBPACK_IMPORTED_MODULE_3__picker_group_component__["a" /* PickerGroupComponent */], __WEBPACK_IMPORTED_MODULE_4__picker_date_component__["a" /* DatePickerComponent */], __WEBPACK_IMPORTED_MODULE_5__picker_city_component__["a" /* CityPickerComponent */]]
        })
    ], PickerModule);
    return PickerModule;
    var PickerModule_1;
}());



/***/ }),

/***/ "./components/picker/picker.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__picker_date_component__ = __webpack_require__("./components/picker/picker-date.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_base_service__ = __webpack_require__("./components/utils/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__picker_component__ = __webpack_require__("./components/picker/picker.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__picker_city_component__ = __webpack_require__("./components/picker/picker-city.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * 多列选择器Service，可直接通过Class构造选择器
 */
var PickerService = /** @class */ (function (_super) {
    __extends(PickerService, _super);
    function PickerService(resolver, applicationRef, injector) {
        return _super.call(this, resolver, applicationRef, injector) || this;
    }
    /**
     * 构建一个多列选择器并显示
     *
     * @param data 数据源
     * @param value 默认值（限单列时会根据值自动解析，而对多列使用defaultSelect自行解析）
     * @param defaultSelect 当前默认位置，数组的长度必须等同于 groups 长度
     * @param options 配置项
     * @returns 务必订阅结果才会显示。
     */
    PickerService.prototype.show = function (data, value, defaultSelect, options) {
        var _this = this;
        var componentRef = this.build(__WEBPACK_IMPORTED_MODULE_3__picker_component__["a" /* PickerComponent */]);
        // 通过Service打开的强制设置为 `default` 以免出现 `input`
        options = Object.assign({}, options, { type: 'default' });
        componentRef.instance.options = options;
        if (defaultSelect)
            componentRef.instance.defaultSelect = defaultSelect;
        componentRef.instance.groups = data;
        if (value) {
            setTimeout(function () {
                componentRef.instance.writeValue(value);
            }, 100);
        }
        componentRef.instance.hide.subscribe(function () {
            setTimeout(function () {
                _this.destroy(componentRef);
            }, 100);
        });
        componentRef.instance._onShow();
        return componentRef.instance.change;
    };
    /**
     * 构建一个城市选择器并显示
     *
     * @param data 城市数据，可以参考示例中的数据格式
     * @param [value] 默认值，即城市编号
     * @param [dataMap]
     * @param options 配置项
     * @returns 务必订阅结果才会显示。
     */
    PickerService.prototype.showCity = function (data, value, dataMap, options) {
        var _this = this;
        var componentRef = this.build(__WEBPACK_IMPORTED_MODULE_4__picker_city_component__["a" /* CityPickerComponent */]);
        if (dataMap)
            componentRef.instance.dataMap = dataMap;
        // 通过Service打开的强制设置为 `default` 以免出现 `input`
        options = Object.assign({}, options, { type: 'default' });
        componentRef.instance.options = options;
        componentRef.instance.data = data;
        if (value) {
            setTimeout(function () {
                componentRef.instance.writeValue(value);
            }, 100);
        }
        componentRef.instance.hide.subscribe(function () {
            setTimeout(function () {
                _this.destroy(componentRef);
            }, 100);
        });
        setTimeout(function () {
            componentRef.instance._triggerShow();
        }, 200);
        return componentRef.instance.change;
    };
    /**
     * 构建一个日期时间选择器并显示
     *
     * @param [type] 类型，date-ym年月，date日期，datetime日期&时间（不包括秒），time时间（不包括秒）
     * @param [format] 日期格式化代码，实际是采用 DatePipe，所有代码内容和它一样
     * @param [value] 默认显示日期
     * @param [min] 最小时间范围
     * @param [max] 最大时间范围
     * @param [options] 配置项
     * @returns 务必订阅结果才会显示。
     */
    PickerService.prototype.showDateTime = function (type, format, value, min, max, options) {
        var _this = this;
        var componentRef = this.build(__WEBPACK_IMPORTED_MODULE_1__picker_date_component__["a" /* DatePickerComponent */]);
        // 通过Service打开的强制设置为 `default` 以免出现 `input`
        options = Object.assign({}, options, { type: 'default' });
        componentRef.instance.options = options;
        if (type)
            componentRef.instance.type = type;
        if (format)
            componentRef.instance.format = format;
        if (min)
            componentRef.instance.min = min;
        if (max)
            componentRef.instance.max = max;
        if (value) {
            setTimeout(function () {
                componentRef.instance.writeValue(value);
            }, 100);
        }
        componentRef.instance.hide.subscribe(function () {
            setTimeout(function () {
                _this.destroy(componentRef);
            }, 100);
        });
        setTimeout(function () {
            componentRef.instance.ngOnChanges(null);
            componentRef.instance._triggerShow();
        }, 200);
        return componentRef.instance.change;
    };
    PickerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
    ], PickerService);
    return PickerService;
}(__WEBPACK_IMPORTED_MODULE_2__utils_base_service__["a" /* BaseService */]));



/***/ }),

/***/ "./components/popup/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup_component__ = __webpack_require__("./components/popup/popup.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__popup_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup_config__ = __webpack_require__("./components/popup/popup.config.ts");
/* unused harmony reexport PopupConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popup_module__ = __webpack_require__("./components/popup/popup.module.ts");
/* unused harmony reexport PopupModule */





/***/ }),

/***/ "./components/popup/popup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("./node_modules/@angular/animations/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subscription__ = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__popup_config__ = __webpack_require__("./components/popup/popup.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PopupComponent = /** @class */ (function () {
    function PopupComponent(DEF) {
        this.DEF = DEF;
        /** 取消回调 */
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 确认回调 */
        this.confirm = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.shown = false;
        this._shownAnt = false;
    }
    Object.defineProperty(PopupComponent.prototype, "_visibility", {
        get: function () {
            return this._shownAnt ? 'show' : 'hide';
        },
        enumerable: true,
        configurable: true
    });
    PopupComponent.prototype.parseConfig = function () {
        this.config = Object.assign({}, this.DEF, this.config);
    };
    PopupComponent.prototype.ngOnInit = function () {
        this.parseConfig();
    };
    PopupComponent.prototype.ngOnChanges = function (changes) {
        if ('config' in changes)
            this.parseConfig();
    };
    /**
     * 显示，并支持订阅结果，如果点击取消值为false，反之 true
     */
    PopupComponent.prototype.show = function () {
        var _this = this;
        this.shown = true;
        setTimeout(function () { _this._shownAnt = true; }, 10);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].create(function (observer) {
            _this.observer = observer;
        });
    };
    /**
     * 隐藏
     *
     * @param [is_backdrop] 是否从背景上点击(可选)
     */
    PopupComponent.prototype.hide = function (is_backdrop) {
        var _this = this;
        if (is_backdrop === true && this.config.backdrop === false)
            return false;
        this._shownAnt = false;
        setTimeout(function () {
            _this.shown = false;
        }, 300);
    };
    /** 关闭，等同 `hide()` 效果 */
    PopupComponent.prototype.close = function () {
        this.hide(false);
    };
    PopupComponent.prototype._onCancel = function () {
        this.cancel.emit();
        this.hide(false);
        if (this.observer) {
            this.observer.next(false);
            this.observer.complete();
        }
        return false;
    };
    PopupComponent.prototype._onConfirm = function () {
        this.confirm.emit();
        this.hide(false);
        if (this.observer) {
            this.observer.next(true);
            this.observer.complete();
        }
        return false;
    };
    PopupComponent.prototype.ngOnDestroy = function () {
        if (this.observer && this.observer instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs_Subscription__["a" /* Subscription */]) {
            this.observer.unsubscribe();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__popup_config__["a" /* PopupConfig */])
    ], PopupComponent.prototype, "config", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PopupComponent.prototype, "cancel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PopupComponent.prototype, "confirm", void 0);
    PopupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-popup',
            template: "\n        <div class=\"weui-mask\" [@visibility]=\"_visibility\" (click)=\"hide(true)\"></div>\n        <div class=\"weui-popup\" [ngClass]=\"{'weui-popup_toggle': _shownAnt}\">\n            <div class=\"weui-popup__hd\" *ngIf=\"!config.is_full\">\n                <a href=\"#\" class=\"weui-popup__action\" (click)=\"_onCancel()\">{{config.cancel}}</a>\n                <a href=\"#\" class=\"weui-popup__action\" (click)=\"_onConfirm()\">{{config.confirm}}</a>\n            </div>\n            <div [ngClass]=\"{'weui-popup_full': config.is_full }\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
            animations: [Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* trigger */])('visibility', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('show', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1 })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('hide', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0 })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('hide <=> show', [Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(200)])
                ])],
            host: {
                '[hidden]': '!shown'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__popup_config__["a" /* PopupConfig */]])
    ], PopupComponent);
    return PopupComponent;
}());



/***/ }),

/***/ "./components/popup/popup.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PopupConfig = /** @class */ (function () {
    function PopupConfig() {
        /**
         * 是否全屏，默认：`false`
         */
        this.is_full = false;
        /**
         * 取消按钮文本，默认：`取消`
         */
        this.cancel = '取消';
        /**
         * 确定按钮文本，默认：`确定`
         */
        this.confirm = '确定';
        /**
         * 允许点击背景关闭，默认：`true`
         */
        this.backdrop = true;
    }
    PopupConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], PopupConfig);
    return PopupConfig;
}());



/***/ }),

/***/ "./components/popup/popup.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popup_component__ = __webpack_require__("./components/popup/popup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popup_config__ = __webpack_require__("./components/popup/popup.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PopupModule = /** @class */ (function () {
    function PopupModule() {
    }
    PopupModule_1 = PopupModule;
    PopupModule.forRoot = function () {
        return { ngModule: PopupModule_1, providers: [__WEBPACK_IMPORTED_MODULE_3__popup_config__["a" /* PopupConfig */]] };
    };
    PopupModule = PopupModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__popup_component__["a" /* PopupComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__popup_component__["a" /* PopupComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__popup_component__["a" /* PopupComponent */]]
        })
    ], PopupModule);
    return PopupModule;
    var PopupModule_1;
}());



/***/ }),

/***/ "./components/progress/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__progress_component__ = __webpack_require__("./components/progress/progress.component.ts");
/* unused harmony reexport ProgressComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__progress_module__ = __webpack_require__("./components/progress/progress.module.ts");
/* unused harmony reexport ProgressModule */




/***/ }),

/***/ "./components/progress/progress.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProgressComponent = /** @class */ (function () {
    function ProgressComponent() {
        this._value = 0;
        /**
         * 是否允许取消，默认：`true`
         */
        this.canCancel = true;
        /**
         * 取消回调
         */
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(ProgressComponent.prototype, "value", {
        /**
         * 默认进度值，取值范围：0-100（单位：%）
         */
        set: function (d) {
            this._value = Math.max(0, Math.min(100, d));
        },
        enumerable: true,
        configurable: true
    });
    ProgressComponent.prototype._onCancel = function () {
        if (this.canCancel)
            this.cancel.emit();
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], ProgressComponent.prototype, "value", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProgressComponent.prototype, "canCancel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ProgressComponent.prototype, "cancel", void 0);
    ProgressComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-progress',
            template: "\n        <div class=\"weui-progress\">\n            <div class=\"weui-progress__bar\">\n                <div class=\"weui-progress__inner-bar\" [style.width]=\"_value + '%'\"></div>\n            </div>\n            <a href=\"#\" class=\"weui-progress__opr\" *ngIf=\"canCancel\" (click)=\"_onCancel()\">\n                <i class=\"weui-icon-cancel\"></i>\n            </a>\n        </div>\n    "
        })
    ], ProgressComponent);
    return ProgressComponent;
}());



/***/ }),

/***/ "./components/progress/progress.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__progress_component__ = __webpack_require__("./components/progress/progress.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProgressModule = /** @class */ (function () {
    function ProgressModule() {
    }
    ProgressModule_1 = ProgressModule;
    ProgressModule.forRoot = function () {
        return { ngModule: ProgressModule_1, providers: [] };
    };
    ProgressModule = ProgressModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__progress_component__["a" /* ProgressComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__progress_component__["a" /* ProgressComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__progress_component__["a" /* ProgressComponent */]]
        })
    ], ProgressModule);
    return ProgressModule;
    var ProgressModule_1;
}());



/***/ }),

/***/ "./components/ptr/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ptr_component__ = __webpack_require__("./components/ptr/ptr.component.ts");
/* unused harmony reexport PTRComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ptr_config__ = __webpack_require__("./components/ptr/ptr.config.ts");
/* unused harmony reexport PTRConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ptr_module__ = __webpack_require__("./components/ptr/ptr.module.ts");
/* unused harmony reexport PTRModule */





/***/ }),

/***/ "./components/ptr/ptr.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PTRComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ptr_config__ = __webpack_require__("./components/ptr/ptr.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PTRComponent = /** @class */ (function () {
    function PTRComponent(el, DEF) {
        this.el = el;
        this.DEF = DEF;
        this.ogY = 0;
        this.loading = false;
        this.touching = false;
        this._animating = false;
        this.initScrollTop = 0;
        this._pullPercent = 0;
        /** 是否禁止 */
        this.disabled = false;
        /** 下拉滚动时回调，返回一个0-100%的参数 */
        this.scroll = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 刷新回调 */
        this.refresh = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /**
     * 设置最后更新标签
     *
     * @param label 标签内容（支持HTML）
     */
    PTRComponent.prototype.setLastUpdatedLabel = function (label) {
        this._lastLabel = label;
    };
    /**
     * 设置刷新成功
     *
     * @param [lastUpdatedLabel] label 标签内容（支持HTML）
     */
    PTRComponent.prototype.setFinished = function (lastUpdatedLabel) {
        var _this = this;
        this._pullPercent = 0;
        this.loading = false;
        this._animating = true;
        if (!this.touching) {
            setTimeout(function () {
                _this._animating = false;
                if (lastUpdatedLabel)
                    _this.setLastUpdatedLabel(lastUpdatedLabel);
            }, 350);
        }
    };
    PTRComponent.prototype.onTouchStart = function ($event) {
        if (this.disabled || this.touching || this.loading)
            return;
        this.touching = true;
        this.touchId = $event.targetTouches[0].identifier;
        this.ogY = this._pullPercent === 0 ? $event.targetTouches[0].pageY : $event.targetTouches[0].pageY - this._pullPercent;
        this.initScrollTop = this.contentEl.scrollTop;
        this._animating = false;
    };
    PTRComponent.prototype.onTouchMove = function ($event) {
        if (this.disabled || !this.touching || this.loading)
            return;
        if ($event.targetTouches[0].identifier !== this.touchId)
            return;
        var pageY = $event.targetTouches[0].pageY;
        var diffY = pageY - this.ogY;
        // if it's scroll
        if (diffY < 0)
            return;
        // if it's not at top
        if (this.contentEl.scrollTop > 0)
            return;
        $event.preventDefault();
        // let diffY = Math.abs(this.ogY - pageY);
        this._pullPercent = (diffY - this.initScrollTop) > 100 ? 100 : (diffY - this.initScrollTop);
        this.scroll.emit(this._pullPercent);
    };
    PTRComponent.prototype.onTouchEnd = function ($event) {
        if (this.disabled || !this.touching || this.loading)
            return;
        var _pullPercent = this._pullPercent;
        var loading = false;
        if (_pullPercent >= this.config.treshold) {
            loading = true;
        }
        else {
            _pullPercent = 0;
        }
        this.touching = false;
        this.ogY = 0;
        this.touchId = undefined;
        this.initScrollTop = 0;
        this._animating = loading;
        this._pullPercent = _pullPercent;
        this.loading = loading;
        if (loading)
            this.refresh.emit(this);
    };
    PTRComponent.prototype.ngOnInit = function () {
        this.parseConfig();
        this.contentEl = this.el.nativeElement.querySelector('.weui-ptr__content');
    };
    PTRComponent.prototype.ngOnChanges = function (changes) {
        if ('config' in changes)
            this.parseConfig();
    };
    PTRComponent.prototype.parseConfig = function () {
        this.config = Object.assign({}, this.DEF, this.config);
        var el = this.el.nativeElement;
        this.loaderEl = el.querySelector('.weui-ptr__loader');
        this.iconEl = el.querySelector('.weui-ptr__icon');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__ptr_config__["a" /* PTRConfig */])
    ], PTRComponent.prototype, "config", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PTRComponent.prototype, "disabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PTRComponent.prototype, "scroll", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PTRComponent.prototype, "refresh", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchstart', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PTRComponent.prototype, "onTouchStart", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchmove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PTRComponent.prototype, "onTouchMove", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchend', ['$event']),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('touchcancel', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PTRComponent.prototype, "onTouchEnd", null);
    PTRComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-ptr',
            template: "\n        <div class=\"weui-ptr__loader\"\n            [ngStyle]=\"{\n                'height.px': config.height,\n                'margin-top.px': -config.height + (_pullPercent / (100 / config.height)),\n                'transition': _animating ? 'all .5s' : 'none'\n            }\">\n            <div style=\"flex: 1 1 0%; padding: 5px;\" *ngIf=\"!config.customIcon\">\n                <span [innerHTML]=\"_pullPercent !== 100 ? config.pullIcon : loading ? config.loadingIcon : config.successIcon\" class=\"weui-ptr__icon\" style=\"display:inline-block\"\n                    [ngStyle]=\"{\n                        'transform': 'rotate(' + -(_pullPercent !== 100 ? _pullPercent * 1.8 : 0) + 'deg)',\n                        'color': _pullPercent !== 100 ? '#5f5f5f' : '#1AAD19'\n                    }\"></span>\n                <p *ngIf=\"_lastLabel\" class=\"weui-ptr__label\">{{_lastLabel}}</p>\n            </div>\n            <ng-content select=\"[loader]\"></ng-content>\n        </div>\n        <div class=\"weui-ptr__content\"><ng-content></ng-content></div>\n    ",
            host: {
                '[class.weui-ptr]': 'true'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__ptr_config__["a" /* PTRConfig */]])
    ], PTRComponent);
    return PTRComponent;
}());



/***/ }),

/***/ "./components/ptr/ptr.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PTRConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PTRConfig = /** @class */ (function () {
    function PTRConfig() {
        /**
         * 是否使用默认icon样式，默认：`false`
         */
        this.customIcon = false;
        /**
         * 下拉icon，支持HTML
         */
        this.pullIcon = '<i class="weui-icon-download"></i>';
        /**
         * 加载中icon，支持HTML
         */
        this.loadingIcon = '<i class="weui-loading"></i>';
        /**
         * 加载成功icon，支持HTML
         */
        this.successIcon = '<i class="weui-icon-success"></i>';
        /**
         * 下拉刷新容器高度（单位：px），默认：`100`
         */
        this.height = 100;
        /**
         * 下拉范围有效（单位：%），默认：`80`
         */
        this.treshold = 80;
    }
    PTRConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], PTRConfig);
    return PTRConfig;
}());



/***/ }),

/***/ "./components/ptr/ptr.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PTRModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ptr_component__ = __webpack_require__("./components/ptr/ptr.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ptr_config__ = __webpack_require__("./components/ptr/ptr.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PTRModule = /** @class */ (function () {
    function PTRModule() {
    }
    PTRModule_1 = PTRModule;
    PTRModule.forRoot = function () {
        return { ngModule: PTRModule_1, providers: [__WEBPACK_IMPORTED_MODULE_3__ptr_config__["a" /* PTRConfig */]] };
    };
    PTRModule = PTRModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__ptr_component__["a" /* PTRComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__ptr_component__["a" /* PTRComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__ptr_component__["a" /* PTRComponent */]]
        })
    ], PTRModule);
    return PTRModule;
    var PTRModule_1;
}());



/***/ }),

/***/ "./components/rating/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rating_config__ = __webpack_require__("./components/rating/rating.config.ts");
/* unused harmony reexport RatingConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rating_component__ = __webpack_require__("./components/rating/rating.component.ts");
/* unused harmony reexport RatingComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rating_module__ = __webpack_require__("./components/rating/rating.module.ts");
/* unused harmony reexport RatingModule */





/***/ }),

/***/ "./components/rating/rating.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rating_config__ = __webpack_require__("./components/rating/rating.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RatingComponent = /** @class */ (function () {
    function RatingComponent(DEF) {
        this.DEF = DEF;
        /** 是否只读模式，默认：`false` */
        this.readonly = false;
        /** 选中后回调，参数：选中值 */
        this.selected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._class = '';
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    RatingComponent_1 = RatingComponent;
    RatingComponent.prototype._setConfig = function (cog) {
        var _c = Object.assign({
            states: []
        }, this.DEF, cog);
        this._class = _c.cls || '';
        var count = _c.states.length || _c.max;
        this._range = Array(count).fill(0).map(function (v, i) {
            return Object.assign({
                index: i,
                on: _c.stateOn,
                off: _c.stateOff,
                title: _c.titles[i] || i + 1
            }, _c.states[i] || {});
        });
    };
    RatingComponent.prototype.ngOnChanges = function (changes) {
        if (changes.config) {
            this._setConfig(changes.config.currentValue);
        }
    };
    RatingComponent.prototype._rate = function (value) {
        if (!this.readonly && value >= 0 && value <= this._range.length) {
            this.writeValue(value);
            this.onChange(value);
        }
    };
    RatingComponent.prototype.writeValue = function (_value) {
        if (_value % 1 !== _value) {
            this._value = Math.round(_value);
            this._preValue = _value;
            return;
        }
        this._preValue = _value;
        this._value = _value;
    };
    RatingComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    RatingComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    RatingComponent.prototype.setDisabledState = function (isDisabled) {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__rating_config__["a" /* RatingConfig */])
    ], RatingComponent.prototype, "config", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], RatingComponent.prototype, "readonly", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], RatingComponent.prototype, "selected", void 0);
    RatingComponent = RatingComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-rating',
            template: "\n        <span class=\"weui-rating__container{{_class ? ' ' + _class : ''}}\" tabindex=\"0\"\n            role=\"slider\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"_range.length\" [attr.aria-valuenow]=\"_value\">\n            <ng-template ngFor let-r [ngForOf]=\"_range\" let-index=\"index\">\n                <span class=\"sr-only\">({{ index < _value ? '*' : ' ' }})</span>\n                <i (click)=\"_rate(index + 1)\" [ngClass]=\"index < _value ? r.on : r.off\" [title]=\"r.title\" ></i>\n            </ng-template>\n        </span>\n    ",
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_VALUE_ACCESSOR */],
                    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return RatingComponent_1; }),
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__rating_config__["a" /* RatingConfig */]])
    ], RatingComponent);
    return RatingComponent;
    var RatingComponent_1;
}());



/***/ }),

/***/ "./components/rating/rating.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatingConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RatingConfig = /** @class */ (function () {
    function RatingConfig() {
        /**
         * 图标数量（默认：5个）
         */
        this.max = 5;
        /**
         * 样式名
         */
        this.cls = '';
        /**
         * 未选中图标，默认：`weui-icon-circle`
         */
        this.stateOff = 'weui-icon-circle';
        /**
         * 选中图标，默认：`weui-icon-success`
         */
        this.stateOn = 'weui-icon-success';
        /**
         * 自定义图标，当存在时 `max`、`stateOff`、`stateOn` 失效
         */
        this.states = [];
        /**
         * 图标 `title` 属性值，默认以 `1` 开始的索引值
         */
        this.titles = [];
    }
    RatingConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], RatingConfig);
    return RatingConfig;
}());



/***/ }),

/***/ "./components/rating/rating.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rating_component__ = __webpack_require__("./components/rating/rating.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rating_config__ = __webpack_require__("./components/rating/rating.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var RatingModule = /** @class */ (function () {
    function RatingModule() {
    }
    RatingModule_1 = RatingModule;
    RatingModule.forRoot = function () {
        return { ngModule: RatingModule_1, providers: [__WEBPACK_IMPORTED_MODULE_3__rating_config__["a" /* RatingConfig */]] };
    };
    RatingModule = RatingModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__rating_component__["a" /* RatingComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__rating_component__["a" /* RatingComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__rating_component__["a" /* RatingComponent */]]
        })
    ], RatingModule);
    return RatingModule;
    var RatingModule_1;
}());



/***/ }),

/***/ "./components/searchbar/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__searchbar_component__ = __webpack_require__("./components/searchbar/searchbar.component.ts");
/* unused harmony reexport SearchBarComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__searchbar_config__ = __webpack_require__("./components/searchbar/searchbar.config.ts");
/* unused harmony reexport SearchBarConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__searchbar_module__ = __webpack_require__("./components/searchbar/searchbar.module.ts");
/* unused harmony reexport SearchBarModule */





/***/ }),

/***/ "./components/searchbar/searchbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__searchbar_config__ = __webpack_require__("./components/searchbar/searchbar.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__("./node_modules/rxjs/_esm5/operators.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchBarComponent = /** @class */ (function () {
    function SearchBarComponent(DEF) {
        this._q = '';
        /** 搜索回调 */
        this.search = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 取消回调 */
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 清空回调 */
        this.clear = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 提交回调（指的是键盘回车后） */
        this.submit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._focus = false;
        this._subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        Object.assign(this, DEF);
    }
    Object.defineProperty(SearchBarComponent.prototype, "value", {
        set: function (_value) {
            this._q = _value;
        },
        enumerable: true,
        configurable: true
    });
    SearchBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sub = this._subject
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["a" /* debounceTime */])(this.debounceTime), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["b" /* distinctUntilChanged */])())
            .subscribe(function (q) {
            _this.search.emit(q);
        });
    };
    SearchBarComponent.prototype._doFocus = function () {
        this._term.nativeElement.focus();
    };
    SearchBarComponent.prototype._onBlur = function () {
        if (this._q === '')
            this._focus = false;
    };
    SearchBarComponent.prototype._onSearch = function () {
        this._subject.next(this._q);
    };
    SearchBarComponent.prototype._onCancel = function () {
        this._q = '';
        this._onBlur();
        this._subject.next('');
        this.cancel.emit();
    };
    SearchBarComponent.prototype._onClear = function () {
        this._q = '';
        this._doFocus();
        this._subject.next('');
        this.clear.emit();
    };
    SearchBarComponent.prototype._onSubmit = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this._subject.next(this._q);
        this.submit.emit(this._q);
        return false;
    };
    SearchBarComponent.prototype.ngOnDestroy = function () {
        if (this._sub)
            this._sub.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SearchBarComponent.prototype, "value", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], SearchBarComponent.prototype, "placeholder", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], SearchBarComponent.prototype, "cancelText", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], SearchBarComponent.prototype, "debounceTime", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SearchBarComponent.prototype, "search", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SearchBarComponent.prototype, "cancel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SearchBarComponent.prototype, "clear", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SearchBarComponent.prototype, "submit", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('term'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], SearchBarComponent.prototype, "_term", void 0);
    SearchBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-searchbar',
            template: "\n        <div class=\"weui-search-bar\" [ngClass]=\"{'weui-search-bar_focusing': _focus}\">\n            <form class=\"weui-search-bar__form\" (ngSubmit)=\"_onSubmit($event)\">\n                <div class=\"weui-search-bar__box\">\n                    <i class=\"weui-icon-search\"></i>\n                    <input #term type=\"search\" autocomplete=\"off\" name=\"q\" class=\"weui-search-bar__input\"\n                        [placeholder]=\"placeholder\" [(ngModel)]=\"_q\" (ngModelChange)=\"_onSearch()\"\n                        (focus)=\"_focus=true\" (blur)=\"_onBlur()\" />\n                    <a href=\"javascript:\" class=\"weui-icon-clear\" (click)=\"_onClear()\"></a>\n                </div>\n                <label class=\"weui-search-bar__label\" (click)=\"_doFocus()\">\n                    <i class=\"weui-icon-search\"></i>\n                    <span>{{placeholder}}</span>\n                </label>\n            </form>\n            <a href=\"javascript:\" class=\"weui-search-bar__cancel-btn\" (click)=\"_onCancel()\">{{cancelText}}</a>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__searchbar_config__["a" /* SearchBarConfig */]])
    ], SearchBarComponent);
    return SearchBarComponent;
}());



/***/ }),

/***/ "./components/searchbar/searchbar.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SearchBarConfig = /** @class */ (function () {
    function SearchBarConfig() {
        /**
         * 占位符，默认：`搜索`
         */
        this.placeholder = '搜索';
        /**
         * 取消按键文字，默认：`取消`
         */
        this.cancelText = '取消';
        /**
         * 去抖时长（单位：ms），默认：`300`
         */
        this.debounceTime = 300;
    }
    SearchBarConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], SearchBarConfig);
    return SearchBarConfig;
}());



/***/ }),

/***/ "./components/searchbar/searchbar.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__searchbar_component__ = __webpack_require__("./components/searchbar/searchbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__searchbar_config__ = __webpack_require__("./components/searchbar/searchbar.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SearchBarModule = /** @class */ (function () {
    function SearchBarModule() {
    }
    SearchBarModule_1 = SearchBarModule;
    SearchBarModule.forRoot = function () {
        return { ngModule: SearchBarModule_1, providers: [__WEBPACK_IMPORTED_MODULE_4__searchbar_config__["a" /* SearchBarConfig */]] };
    };
    SearchBarModule = SearchBarModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormsModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__searchbar_component__["a" /* SearchBarComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_3__searchbar_component__["a" /* SearchBarComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_3__searchbar_component__["a" /* SearchBarComponent */]]
        })
    ], SearchBarModule);
    return SearchBarModule;
    var SearchBarModule_1;
}());



/***/ }),

/***/ "./components/sidebar/close.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CloseSidebarDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidebar_service__ = __webpack_require__("./components/sidebar/sidebar.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * 关闭侧边栏指令
 */
var CloseSidebarDirective = /** @class */ (function () {
    function CloseSidebarDirective(_sidebarService) {
        this._sidebarService = _sidebarService;
    }
    CloseSidebarDirective.prototype._onClick = function () {
        this._sidebarService.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CloseSidebarDirective.prototype, "_onClick", null);
    CloseSidebarDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: '[closeSidebar]' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sidebar_service__["a" /* SidebarService */]])
    ], CloseSidebarDirective);
    return CloseSidebarDirective;
}());



/***/ }),

/***/ "./components/sidebar/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sidebar_component__ = __webpack_require__("./components/sidebar/sidebar.component.ts");
/* unused harmony reexport SidebarComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_directive__ = __webpack_require__("./components/sidebar/close.directive.ts");
/* unused harmony reexport CloseSidebarDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidebar_container_component__ = __webpack_require__("./components/sidebar/sidebar-container.component.ts");
/* unused harmony reexport SidebarContainerComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sidebar_config__ = __webpack_require__("./components/sidebar/sidebar.config.ts");
/* unused harmony reexport SidebarConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sidebar_service__ = __webpack_require__("./components/sidebar/sidebar.service.ts");
/* unused harmony reexport SidebarService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sidebar_module__ = __webpack_require__("./components/sidebar/sidebar.module.ts");
/* unused harmony reexport SidebarModule */








/***/ }),

/***/ "./components/sidebar/sidebar-container.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarContainerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidebar_component__ = __webpack_require__("./components/sidebar/sidebar.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * 侧边栏容器
 */
var SidebarContainerComponent = /** @class */ (function () {
    function SidebarContainerComponent(_ref, _el) {
        this._ref = _ref;
        this._el = _el;
        this._showBackdrop = false;
        this._showBackdropChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.orgOverflowX = '';
    }
    SidebarContainerComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._onToggle();
        this._subscribe();
        this._sidebars.changes.subscribe(function () {
            _this._unsubscribe();
            _this._subscribe();
        });
    };
    SidebarContainerComponent.prototype.ngOnChanges = function (changes) {
        if ('_showBackdrop' in changes) {
            this._showBackdropChange.emit(changes['_showBackdrop'].currentValue);
        }
    };
    SidebarContainerComponent.prototype.ngOnInit = function () {
        var $body = document.querySelector('body');
        this.orgOverflowX = $body.style.overflowX;
        $body.style.overflowX = 'hidden';
    };
    SidebarContainerComponent.prototype.ngOnDestroy = function () {
        this._unsubscribe();
        document.querySelector('body').style.overflowX = this.orgOverflowX;
    };
    SidebarContainerComponent.prototype._getStyles = function () {
        var _this = this;
        if (this._sidebars) {
            this._sidebars.forEach(function (sidebar) {
                if (!sidebar) {
                    return;
                }
                if (sidebar.mode === 'slide') {
                    var transformStyle = null;
                    if (sidebar.status) {
                        var isLeftOrTop = sidebar.position === 'left' || sidebar.position === 'top';
                        var isLeftOrRight = sidebar.position === 'left' || sidebar.position === 'right';
                        var transformDir = isLeftOrRight ? 'X' : 'Y';
                        var transformAmt = "" + (isLeftOrTop ? '' : '-') + (isLeftOrRight ? sidebar._width : sidebar._height);
                        transformStyle = "translate" + transformDir + "(" + transformAmt + "px)";
                    }
                    _this._el.nativeElement.style.transform = transformStyle;
                }
            });
        }
        return {
            margin: "0px 0px 0px 0px"
        };
    };
    SidebarContainerComponent.prototype._onBackdropClicked = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this._sidebars.forEach(function (sidebar) {
            if (sidebar.status && sidebar.backdrop) {
                sidebar.close();
            }
        });
        return false;
    };
    SidebarContainerComponent.prototype._subscribe = function () {
        var _this = this;
        if (this._sidebars) {
            this._sidebars.forEach(function (sidebar) {
                if (!sidebar) {
                    return;
                }
                sidebar.openStart.subscribe(function () { return _this._onToggle(); });
                sidebar.opened.subscribe(function () { return _this._markForCheck(); });
                sidebar.closeStart.subscribe(function () { return _this._onToggle(); });
                sidebar.closed.subscribe(function () { return _this._markForCheck(); });
                sidebar.modeChange.subscribe(function () { return _this._markForCheck(); });
                sidebar.positionChange.subscribe(function () { return _this._markForCheck(); });
                sidebar._rerender.subscribe(function () { return _this._markForCheck(); });
            });
        }
    };
    SidebarContainerComponent.prototype._unsubscribe = function () {
        if (this._sidebars) {
            this._sidebars.forEach(function (sidebar) {
                if (!sidebar) {
                    return;
                }
                sidebar.openStart.unsubscribe();
                sidebar.opened.unsubscribe();
                sidebar.closeStart.unsubscribe();
                sidebar.closed.unsubscribe();
                sidebar.modeChange.unsubscribe();
                sidebar.positionChange.unsubscribe();
                sidebar._rerender.unsubscribe();
            });
        }
    };
    /** 状态变更时重新计算样式 */
    SidebarContainerComponent.prototype._markForCheck = function () {
        this._ref.markForCheck();
    };
    SidebarContainerComponent.prototype._onToggle = function () {
        if (this._sidebars) {
            var hasOpen = false;
            var _sidebars = this._sidebars.toArray();
            for (var i = 0; i < _sidebars.length; i++) {
                var sidebar = _sidebars[i];
                if (sidebar.status) {
                    hasOpen = true;
                    break;
                }
            }
            this._showBackdrop = hasOpen;
            this._showBackdropChange.emit(hasOpen);
        }
        this._markForCheck();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__sidebar_component__["a" /* SidebarComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], SidebarContainerComponent.prototype, "_sidebars", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], SidebarContainerComponent.prototype, "_showBackdrop", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SidebarContainerComponent.prototype, "_showBackdropChange", void 0);
    SidebarContainerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-sidebar-container',
            template: "\n        <ng-content select=\"weui-sidebar\"></ng-content>\n        <div *ngIf=\"_showBackdrop\" aria-hidden=\"true\" class=\"weui-mask\" (click)=\"_onBackdropClicked($event)\"></div>\n        <div class=\"weui-sidebar__content\" [ngStyle]=\"_getStyles()\">\n            <ng-content></ng-content>\n        </div>\n    ",
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], SidebarContainerComponent);
    return SidebarContainerComponent;
}());



/***/ }),

/***/ "./components/sidebar/sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidebar_config__ = __webpack_require__("./components/sidebar/sidebar.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidebar_service__ = __webpack_require__("./components/sidebar/sidebar.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_browser__ = __webpack_require__("./components/utils/browser.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * 侧边栏
 */
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(_sidebarService, config) {
        this._sidebarService = _sidebarService;
        /**
         * 状态，true表示打开，false表示关闭
         */
        this.status = false;
        this.statusChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * 位置方向，默认：`left`
         */
        this.position = 'left';
        /**
         * 类型，默认：`slide`
         * - over: 不覆盖
         * - slide：侧边移动
         */
        this.mode = 'slide';
        /**
         * 允许点击背景关闭，默认：`true`
         */
        this.backdrop = true;
        /** 打开前回调 */
        this.openStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 打开后回调 */
        this.opened = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 关闭前回调 */
        this.closeStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 关闭后回调 */
        this.closed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 模式变更通知 */
        this.modeChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 位置变更通知 */
        this.positionChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._rerender = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._clickEvent = 'click';
        this._onClickOutsideAttached = false;
        this._anting = false;
        Object.assign(this, config);
        if (Object(__WEBPACK_IMPORTED_MODULE_3__utils_browser__["c" /* isIOS */])() && 'ontouchstart' in window) {
            this._clickEvent = 'touchstart';
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._onClickOutside = this._onClickOutside.bind(this);
        this._openSub = this._sidebarService.onOpen(this.open);
        this._closeSub = this._sidebarService.onClose(this.close);
    }
    SidebarComponent.prototype.ngOnChanges = function (changes) {
        if ('status' in changes && !this._anting) {
            if (changes['status'].currentValue) {
                this.open();
            }
            else {
                this.close();
            }
            if (changes['status'].firstChange)
                this._anting = false;
        }
        if ('mode' in changes) {
            this.modeChange.emit(changes['mode'].currentValue);
        }
        if ('position' in changes) {
            this.positionChange.emit(changes['position'].currentValue);
        }
        if ('backdrop' in changes) {
            this._initCloseListeners();
        }
    };
    SidebarComponent.prototype.ngOnDestroy = function () {
        this._destroyCloseListeners();
        if (this._openSub) {
            this._openSub.unsubscribe();
        }
        if (this._closeSub) {
            this._closeSub.unsubscribe();
        }
    };
    /** 打开侧边栏 */
    SidebarComponent.prototype.open = function () {
        this._anting = true;
        this.status = true;
        this.statusChange.emit(true);
        this.openStart.emit();
        this.closeAnt();
    };
    /** 关闭侧边栏 */
    SidebarComponent.prototype.close = function () {
        this._anting = true;
        this.status = false;
        this.statusChange.emit(false);
        this.closeStart.emit();
        this.closeAnt();
    };
    /** 手动触发容器的重新渲染 */
    SidebarComponent.prototype._triggerRerender = function () {
        this._rerender.emit();
    };
    SidebarComponent.prototype._getStyle = function () {
        var transformStyle = 'none';
        var marginStyle = {};
        var isSlideMode = this.mode === 'slide';
        if (!this.status || isSlideMode) {
            transformStyle = "translate" + ((this.position === 'left' || this.position === 'right') ? 'X' : 'Y');
            var isLeftOrTop = this.position === 'left' || this.position === 'top';
            var translateAmt = (isLeftOrTop ? '-' : '') + "100%";
            transformStyle += "(" + translateAmt + ")";
        }
        return Object.assign(marginStyle, {
            webkitTransform: transformStyle,
            transform: transformStyle
        });
    };
    SidebarComponent.prototype.closeAnt = function () {
        var _this = this;
        setTimeout(function () {
            _this._anting = false;
            if (_this.status) {
                _this._initCloseListeners();
                _this.opened.emit();
            }
            else {
                _this._destroyCloseListeners();
                _this.closed.emit();
            }
        }, 300);
    };
    SidebarComponent.prototype._initCloseListeners = function () {
        var _this = this;
        if (this.status && this.backdrop) {
            setTimeout(function () {
                if (_this.backdrop && !_this._onClickOutsideAttached) {
                    document.addEventListener(_this._clickEvent, _this._onClickOutside);
                    _this._onClickOutsideAttached = true;
                }
            });
        }
    };
    SidebarComponent.prototype._destroyCloseListeners = function () {
        if (this._onClickOutsideAttached) {
            document.removeEventListener(this._clickEvent, this._onClickOutside);
            this._onClickOutsideAttached = false;
        }
    };
    SidebarComponent.prototype._onClickOutside = function (e) {
        if (this._onClickOutsideAttached && this._elSidebar && !this._elSidebar.nativeElement.contains(e.target)) {
            this.close();
        }
    };
    Object.defineProperty(SidebarComponent.prototype, "_height", {
        /** 获取侧边栏容器高度 */
        get: function () {
            return this._elSidebar.nativeElement ? this._elSidebar.nativeElement.offsetHeight : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "_width", {
        /** 获取侧边栏容器宽度 */
        get: function () {
            return this._elSidebar.nativeElement ? this._elSidebar.nativeElement.offsetWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], SidebarComponent.prototype, "status", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], SidebarComponent.prototype, "statusChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "position", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "mode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], SidebarComponent.prototype, "backdrop", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "sidebarClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "ariaLabel", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], SidebarComponent.prototype, "openStart", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], SidebarComponent.prototype, "opened", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], SidebarComponent.prototype, "closeStart", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], SidebarComponent.prototype, "closed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], SidebarComponent.prototype, "modeChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], SidebarComponent.prototype, "positionChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], SidebarComponent.prototype, "_rerender", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('sidebar'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], SidebarComponent.prototype, "_elSidebar", void 0);
    SidebarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-sidebar',
            template: "\n    <aside #sidebar\n      role=\"complementary\"\n      [attr.aria-hidden]=\"!status\"\n      [attr.aria-label]=\"ariaLabel\"\n      class=\"weui-sidebar weui-sidebar__{{status ? 'opened' : 'closed'}} weui-sidebar__{{position}} weui-sidebar__{{mode}}\"\n      [class.weui-sidebar__inert]=\"!status\"\n      [ngClass]=\"sidebarClass\"\n      [ngStyle]=\"_getStyle()\">\n      <ng-content></ng-content>\n    </aside>\n    ",
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__sidebar_service__["a" /* SidebarService */], __WEBPACK_IMPORTED_MODULE_1__sidebar_config__["a" /* SidebarConfig */]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./components/sidebar/sidebar.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SidebarConfig = /** @class */ (function () {
    function SidebarConfig() {
        /**
         * 位置方向，默认：`left`
         */
        this.position = 'left';
        /**
         * 类型，默认：`slide`
         * - over: 不覆盖
         * - slide：侧边移动
         */
        this.mode = 'slide';
        /**
         * 允许点击背景关闭，默认：`true`
         */
        this.backdrop = true;
    }
    SidebarConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], SidebarConfig);
    return SidebarConfig;
}());



/***/ }),

/***/ "./components/sidebar/sidebar.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidebar_container_component__ = __webpack_require__("./components/sidebar/sidebar-container.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sidebar_component__ = __webpack_require__("./components/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__close_directive__ = __webpack_require__("./components/sidebar/close.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sidebar_service__ = __webpack_require__("./components/sidebar/sidebar.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sidebar_config__ = __webpack_require__("./components/sidebar/sidebar.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SidebarModule = /** @class */ (function () {
    function SidebarModule() {
    }
    SidebarModule_1 = SidebarModule;
    SidebarModule.forRoot = function () {
        return { ngModule: SidebarModule_1, providers: [__WEBPACK_IMPORTED_MODULE_6__sidebar_config__["a" /* SidebarConfig */]] };
    };
    SidebarModule = SidebarModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__sidebar_container_component__["a" /* SidebarContainerComponent */], __WEBPACK_IMPORTED_MODULE_3__sidebar_component__["a" /* SidebarComponent */], __WEBPACK_IMPORTED_MODULE_4__close_directive__["a" /* CloseSidebarDirective */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__sidebar_container_component__["a" /* SidebarContainerComponent */], __WEBPACK_IMPORTED_MODULE_3__sidebar_component__["a" /* SidebarComponent */], __WEBPACK_IMPORTED_MODULE_4__close_directive__["a" /* CloseSidebarDirective */]],
            providers: [__WEBPACK_IMPORTED_MODULE_5__sidebar_service__["a" /* SidebarService */]]
        })
    ], SidebarModule);
    return SidebarModule;
    var SidebarModule_1;
}());



/***/ }),

/***/ "./components/sidebar/sidebar.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * @docs-private
 */
var SidebarService = /** @class */ (function () {
    function SidebarService() {
        this._openObserver = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this._closeObserver = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
    }
    SidebarService.prototype.open = function () {
        this._openObserver.next();
    };
    SidebarService.prototype.close = function () {
        this._closeObserver.next();
    };
    SidebarService.prototype.onOpen = function (fn) {
        return this._openObserver.subscribe(fn);
    };
    SidebarService.prototype.onClose = function (fn) {
        return this._closeObserver.subscribe(fn);
    };
    SidebarService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], SidebarService);
    return SidebarService;
}());



/***/ }),

/***/ "./components/slider/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider__ = __webpack_require__("./components/slider/slider.ts");
/* unused harmony reexport SliderDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slider_module__ = __webpack_require__("./components/slider/slider.module.ts");
/* unused harmony reexport SliderModule */




/***/ }),

/***/ "./components/slider/slider.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__slider__ = __webpack_require__("./components/slider/slider.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SliderModule = /** @class */ (function () {
    function SliderModule() {
    }
    SliderModule_1 = SliderModule;
    SliderModule.forRoot = function () {
        return { ngModule: SliderModule_1, providers: [] };
    };
    SliderModule = SliderModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__slider__["a" /* SliderDirective */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__slider__["a" /* SliderDirective */]
            ]
        })
    ], SliderModule);
    return SliderModule;
    var SliderModule_1;
}());



/***/ }),

/***/ "./components/slider/slider.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * 滑块指令，支持[(ngModel)]
 */
var SliderDirective = /** @class */ (function () {
    function SliderDirective(el) {
        this.el = el;
        this._state = null;
        this._value = 0;
        this.isInit = false;
        /**
         * 允许的最小值，默认：`0`
         */
        this.min = 0;
        /**
         * 允许的最大值，默认：`100`
         */
        this.max = 100;
        /**
         * 步长，默认：`1`
         */
        this.step = 1;
        /**
         * 是否可用
         */
        this.enabled = true;
        /**
         * 值改变时触发
         */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    SliderDirective_1 = SliderDirective;
    SliderDirective.prototype.ngOnInit = function () {
        this.isInit = true;
        this.trackEl = this.el.nativeElement.querySelector('.weui-slider__track');
        this.handlerEl = this.el.nativeElement.querySelector('.weui-slider__handler');
        if (this.trackEl === null || this.handlerEl === null)
            throw new Error('失效DOM结构');
        this.onTouchStart = this.startHandle.bind(this);
        this.onTouchMove = this.moveHandle.bind(this);
        this.handlerEl.addEventListener('touchstart', this.onTouchStart, false);
        this.handlerEl.addEventListener('touchmove', this.onTouchMove, false);
    };
    SliderDirective.prototype.ngOnDestroy = function () {
        this.handlerEl.removeEventListener('touchstart', this.onTouchStart, false);
        this.handlerEl.removeEventListener('touchmove', this.onTouchMove, false);
    };
    SliderDirective.prototype.refresh = function () {
        var el = this.el.nativeElement;
        this._state = {
            enabled: this.enabled,
            left: el.getBoundingClientRect().left,
            size: el.querySelector('.weui-slider__inner').offsetWidth,
            percentage: [0, 0, 0],
            x: 0
        };
        this.max = +this.max;
        this.min = +this.min;
        this.step = +this.step;
        this.setValue(this._value);
        this.layout();
    };
    SliderDirective.prototype.setValue = function (value) {
        if (this.max > this.min) {
            this._state.percentage = [100 * (value - this.min) / (this.max - this.min), 0, this.step * 100 / (this.max - this.min)];
        }
        else {
            this._state.percentage = [0, 0, 100];
        }
    };
    SliderDirective.prototype.layout = function () {
        this.trackEl.style.width = this._state.percentage[0] + '%';
        this.handlerEl.style.left = this._state.percentage[0] + '%';
    };
    SliderDirective.prototype.startHandle = function ($event) {
        if (this._state === null)
            this.refresh();
        this._state.x = ($event.touches[0] || $event.changedTouches[0]).pageX;
    };
    SliderDirective.prototype.moveHandle = function ($event) {
        if (!this._state.enabled)
            return false;
        var pageX = ($event.touches[0] || $event.changedTouches[0]).pageX;
        var xDiff = pageX - this._state.x;
        if (xDiff >= 15 || xDiff <= 15) {
            this._state.percentage[0] = this.getPercentage(pageX, $event);
            this.layout();
            this.calculateValue(this._state.percentage[0]);
        }
    };
    SliderDirective.prototype.getPercentage = function (pageX, $event) {
        var distanceToSlide = pageX - this._state.left;
        var percentage = distanceToSlide / this._state.size * 100;
        percentage = Math.round(percentage / this._state.percentage[2]) * this._state.percentage[2];
        return Math.max(0, Math.min(100, percentage));
    };
    SliderDirective.prototype.calculateValue = function (percentage) {
        var rawValue = percentage / 100 * (this.max - this.min);
        // adjustment = this.min
        var value = this.min + Math.round(rawValue / this.step) * this.step;
        if (value < this.min)
            value = this.min;
        else if (value > this.max)
            value = this.max;
        this._value = value;
        this.onChange(this._value);
        this.onTouched();
        this.change.emit(this._value);
    };
    SliderDirective.prototype.ngOnChanges = function (changes) {
        if (this.isInit)
            this.refresh();
    };
    SliderDirective.prototype.writeValue = function (value) {
        if (value) {
            this._value = +value;
            this.refresh();
            this.calculateValue(this._state.percentage[0]);
        }
    };
    SliderDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    SliderDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    SliderDirective.prototype.setDisabledState = function (isDisabled) {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-min'),
        __metadata("design:type", Number)
    ], SliderDirective.prototype, "min", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-max'),
        __metadata("design:type", Number)
    ], SliderDirective.prototype, "max", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-step'),
        __metadata("design:type", Number)
    ], SliderDirective.prototype, "step", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-enabled'),
        __metadata("design:type", Boolean)
    ], SliderDirective.prototype, "enabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('weui-change'),
        __metadata("design:type", Object)
    ], SliderDirective.prototype, "change", void 0);
    SliderDirective = SliderDirective_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[weui-slider]',
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_VALUE_ACCESSOR */],
                    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return SliderDirective_1; }),
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], SliderDirective);
    return SliderDirective;
    var SliderDirective_1;
}());



/***/ }),

/***/ "./components/stepper/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stepper_component__ = __webpack_require__("./components/stepper/stepper.component.ts");
/* unused harmony reexport StepperComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stepper_module__ = __webpack_require__("./components/stepper/stepper.module.ts");
/* unused harmony reexport StepperModule */




/***/ }),

/***/ "./components/stepper/stepper.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StepperComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Stepper 步进器，支持 `[(ngModel)]`
 */
var StepperComponent = /** @class */ (function () {
    function StepperComponent() {
        /** 最小值 */
        this.min = -Infinity;
        /** 最大值 */
        this.max = Infinity;
        /** 禁用 */
        this.disabled = false;
        /** 变更时回调 */
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._step = 1;
        this._precisionStep = 0;
        this._precisionFactor = 1;
        this._disabledMinus = false;
        this._disabledPlus = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    StepperComponent_1 = StepperComponent;
    Object.defineProperty(StepperComponent.prototype, "step", {
        /** 步长，可以为小数 */
        get: function () { return this._step; },
        set: function (value) {
            this._step = value;
            var stepString = value.toString();
            if (stepString.indexOf('e-') >= 0) {
                this._precisionStep = parseInt(stepString.slice(stepString.indexOf('e-')), 10);
            }
            if (stepString.indexOf('.') >= 0) {
                this._precisionStep = stepString.length - stepString.indexOf('.') - 1;
            }
            this._precisionFactor = Math.pow(10, this._precisionStep);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            if (isNaN(value) || value === this.value)
                return;
            value = +value;
            if (value > this.max) {
                this._value = this.max;
                this.onChange(this.max);
            }
            else if (value < this.min) {
                this._value = this.min;
                this.onChange(this.min);
            }
            else {
                this._value = value;
                this._checkDisabled();
            }
        },
        enumerable: true,
        configurable: true
    });
    StepperComponent.prototype._checkDisabled = function () {
        this._disabledPlus = this.disabled || !((this.value + this.step) <= this.max);
        this._disabledMinus = this.disabled || !((this.value - this.step) >= this.min);
        return this;
    };
    StepperComponent.prototype._notify = function () {
        this.change.emit(this.value);
        this.onChange(this.value);
    };
    StepperComponent.prototype._plus = function () {
        if (this.value === undefined)
            this.value = this.max || 0;
        this._checkDisabled();
        if (this._disabledPlus)
            return;
        this.value = this._toPrecisionAsStep((this._precisionFactor * this.value + this._precisionFactor * this.step) / this._precisionFactor);
        this._checkDisabled()._notify();
    };
    StepperComponent.prototype._minus = function () {
        if (this.value === undefined)
            this.value = this.min || 0;
        this._checkDisabled();
        if (this._disabledMinus)
            return;
        this.value = this._toPrecisionAsStep((this._precisionFactor * this.value - this._precisionFactor * this.step) / this._precisionFactor);
        this._checkDisabled()._notify();
    };
    StepperComponent.prototype._blur = function () {
        var el = this._inputNumber.nativeElement;
        this.value = +el.value;
        el.value = this.value;
        this._checkDisabled()._notify();
    };
    StepperComponent.prototype._toPrecisionAsStep = function (num) {
        if (isNaN(num) || num === '') {
            return num;
        }
        return Number(Number(num).toFixed(this._precisionStep));
    };
    StepperComponent.prototype.writeValue = function (value) {
        this.value = value;
        this._checkDisabled();
    };
    StepperComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    StepperComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    StepperComponent.prototype.setDisabledState = function (isDisabled) {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], StepperComponent.prototype, "min", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], StepperComponent.prototype, "max", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.disabled'),
        __metadata("design:type", Boolean)
    ], StepperComponent.prototype, "disabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], StepperComponent.prototype, "change", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('inputNumber'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], StepperComponent.prototype, "_inputNumber", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Number])
    ], StepperComponent.prototype, "step", null);
    StepperComponent = StepperComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-stepper',
            template: "\n    <span class=\"minus\" [ngClass]=\"{'disabled':_disabledMinus}\" (click)=\"_minus()\"><em>-</em></span>\n    <div class=\"input\">\n        <input type=\"tel\" #inputNumber [(ngModel)]=\"value\" (blur)=\"_blur()\"\n            [disabled]=\"disabled\"\n            [attr.min]=\"min\"\n            [attr.max]=\"max\"\n            [attr.step]=\"_step\"\n            autocomplete=\"off\">\n    </div>\n    <span class=\"plus\" [ngClass]=\"{'disabled':_disabledPlus}\" (click)=\"_plus()\"><em>+</em></span>\n    ",
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_VALUE_ACCESSOR */],
                    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return StepperComponent_1; }),
                    multi: true
                }]
        })
    ], StepperComponent);
    return StepperComponent;
    var StepperComponent_1;
}());



/***/ }),

/***/ "./components/stepper/stepper.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StepperModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stepper_component__ = __webpack_require__("./components/stepper/stepper.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var StepperModule = /** @class */ (function () {
    function StepperModule() {
    }
    StepperModule_1 = StepperModule;
    StepperModule.forRoot = function () {
        return { ngModule: StepperModule_1, providers: [] };
    };
    StepperModule = StepperModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormsModule */]],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__stepper_component__["a" /* StepperComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__stepper_component__["a" /* StepperComponent */]
            ]
        })
    ], StepperModule);
    return StepperModule;
    var StepperModule_1;
}());



/***/ }),

/***/ "./components/swiper/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__swiper_config__ = __webpack_require__("./components/swiper/swiper.config.ts");
/* unused harmony reexport SwiperConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__swiper_component__ = __webpack_require__("./components/swiper/swiper.component.ts");
/* unused harmony reexport SwiperComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__swiper_module__ = __webpack_require__("./components/swiper/swiper.module.ts");
/* unused harmony reexport SwiperModule */





/***/ }),

/***/ "./components/swiper/swiper.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwiperComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__swiper_config__ = __webpack_require__("./components/swiper/swiper.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SwiperComponent = /** @class */ (function () {
    function SwiperComponent(el, zone, DEF) {
        this.el = el;
        this.zone = zone;
        this.DEF = DEF;
    }
    SwiperComponent.prototype.initOptions = function () {
        this.options = Object.assign({}, this.DEF.options, this.options);
    };
    SwiperComponent.prototype.init = function () {
        var _this = this;
        this.destroy();
        this.zone.runOutsideAngular(function () {
            _this.swiper = new Swiper(_this.containerEl, _this.options);
        });
    };
    SwiperComponent.prototype.destroy = function () {
        var _this = this;
        if (this.containerEl) {
            ['horizontal', 'vertical'].forEach(function (v) {
                _this.containerEl.classList.remove('swiper-container-' + v);
            });
        }
        if (this.swiper) {
            this.zone.runOutsideAngular(function () {
                _this.swiper.destroy(true, false);
                _this.swiper = null;
            });
        }
    };
    SwiperComponent.prototype.ngOnInit = function () {
        if (!this.options)
            this.initOptions();
        this.containerEl = this.el.nativeElement.querySelector('.swiper-container');
        if (!this.containerEl)
            throw new Error('组件内容的HTML跟swiper所需要的DOM结构必须完全一样。');
    };
    SwiperComponent.prototype.ngAfterViewInit = function () {
        this.init();
    };
    SwiperComponent.prototype.ngOnChanges = function (changes) {
        if ('options' in changes) {
            this.initOptions();
            if (!changes['options'].firstChange) {
                this.init();
            }
        }
    };
    SwiperComponent.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SwiperComponent.prototype, "options", void 0);
    SwiperComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'weui-swiper',
            template: "<ng-content></ng-content>"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__swiper_config__["a" /* SwiperConfig */]])
    ], SwiperComponent);
    return SwiperComponent;
}());



/***/ }),

/***/ "./components/swiper/swiper.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwiperConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SwiperConfig = /** @class */ (function () {
    function SwiperConfig() {
        /**
         * 等同于swiper[参数项](http://idangero.us/swiper/api/)
         */
        this.options = {
            loop: true,
            pagination: '.swiper-pagination'
        };
    }
    SwiperConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], SwiperConfig);
    return SwiperConfig;
}());



/***/ }),

/***/ "./components/swiper/swiper.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwiperModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__swiper_component__ = __webpack_require__("./components/swiper/swiper.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__swiper_config__ = __webpack_require__("./components/swiper/swiper.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SwiperModule = /** @class */ (function () {
    function SwiperModule() {
    }
    SwiperModule_1 = SwiperModule;
    SwiperModule.forRoot = function () {
        return { ngModule: SwiperModule_1, providers: [__WEBPACK_IMPORTED_MODULE_4__swiper_config__["a" /* SwiperConfig */]] };
    };
    SwiperModule = SwiperModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormsModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__swiper_component__["a" /* SwiperComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_3__swiper_component__["a" /* SwiperComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_4__swiper_config__["a" /* SwiperConfig */]]
        })
    ], SwiperModule);
    return SwiperModule;
    var SwiperModule_1;
}());



/***/ }),

/***/ "./components/tab/bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * @docs-private
 */
var BarComponent = /** @class */ (function () {
    function BarComponent() {
        this.tabs = [];
    }
    BarComponent.prototype.add = function (tab) {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && tab.active !== false;
    };
    BarComponent.prototype.remove = function (tab) {
        var index = this.tabs.indexOf(tab);
        if (index === -1 || this.isDestroyed) {
            return;
        }
        // Select a new tab if the tab to be removed is selected and not destroyed
        if (tab.active && this.hasAvailableTabs(index)) {
            var newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }
        tab.removed.emit(tab);
        this.tabs.splice(index, 1);
    };
    BarComponent.prototype.getClosestTabIndex = function (index) {
        var tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (var step = 1; step <= tabsLength; step += 1) {
            var prevIndex = index - step;
            var nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    };
    BarComponent.prototype.hasAvailableTabs = function (index) {
        var tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }
        for (var i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    };
    BarComponent.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
    };
    BarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-bar-component',
            template: ""
        })
    ], BarComponent);
    return BarComponent;
}());



/***/ }),

/***/ "./components/tab/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tab_directive__ = __webpack_require__("./components/tab/tab.directive.ts");
/* unused harmony reexport TabDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bar_component__ = __webpack_require__("./components/tab/bar.component.ts");
/* unused harmony reexport BarComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__navbar_component__ = __webpack_require__("./components/tab/navbar.component.ts");
/* unused harmony reexport NavbarComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabbar_component__ = __webpack_require__("./components/tab/tabbar.component.ts");
/* unused harmony reexport TabbarComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tab_module__ = __webpack_require__("./components/tab/tab.module.ts");
/* unused harmony reexport TabModule */







/***/ }),

/***/ "./components/tab/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bar_component__ = __webpack_require__("./components/tab/bar.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * 顶部选项卡
 */
var NavbarComponent = /** @class */ (function (_super) {
    __extends(NavbarComponent, _super);
    function NavbarComponent() {
        return _super.call(this) || this;
    }
    NavbarComponent_1 = NavbarComponent;
    NavbarComponent = NavbarComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-navbar',
            template: "\n    <div class=\"weui-navbar\">\n        <div class=\"weui-navbar__item\"\n            [ngClass]=\"{'weui-bar__item_on': item.active}\"\n            [class.disabled]=\"item.disabled\"\n            *ngFor=\"let item of tabs\" (click)=\"item.active=true\">{{item.heading}}</div>\n    </div>\n    <div class=\"weui-tab__panel\"><ng-content></ng-content></div>\n    ",
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__bar_component__["a" /* BarComponent */], useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return NavbarComponent_1; }) }],
            host: {
                '[class.weui-tab]': 'true'
            }
        }),
        __metadata("design:paramtypes", [])
    ], NavbarComponent);
    return NavbarComponent;
    var NavbarComponent_1;
}(__WEBPACK_IMPORTED_MODULE_1__bar_component__["a" /* BarComponent */]));



/***/ }),

/***/ "./components/tab/tab.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bar_component__ = __webpack_require__("./components/tab/bar.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabDirective = /** @class */ (function () {
    function TabDirective(tab) {
        /** 当tab激活时触发 */
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 当tab无效时触发 */
        this.deselect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** 当tab移除时触发 */
        this.removed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._tabComp = tab;
        this._tabComp.add(this);
    }
    Object.defineProperty(TabDirective.prototype, "active", {
        /**
         * 激活
         */
        get: function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
            if (this.disabled && active || !active) {
                if (!active) {
                    this._active = active;
                }
                this.deselect.emit(this);
                return;
            }
            this._active = active;
            this.select.emit(this);
            this._tabComp.tabs.forEach(function (tab) {
                if (tab !== _this) {
                    tab.active = false;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    TabDirective.prototype.ngOnDestroy = function () {
        this._tabComp.remove(this);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], TabDirective.prototype, "heading", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], TabDirective.prototype, "disabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], TabDirective.prototype, "icon", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], TabDirective.prototype, "badge", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], TabDirective.prototype, "select", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], TabDirective.prototype, "deselect", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], TabDirective.prototype, "removed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.active'),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TabDirective.prototype, "active", null);
    TabDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: 'weui-tab, [weui-tab]' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__bar_component__["a" /* BarComponent */]])
    ], TabDirective);
    return TabDirective;
}());



/***/ }),

/***/ "./components/tab/tab.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tab_directive__ = __webpack_require__("./components/tab/tab.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__navbar_component__ = __webpack_require__("./components/tab/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabbar_component__ = __webpack_require__("./components/tab/tabbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bar_component__ = __webpack_require__("./components/tab/bar.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var TabModule = /** @class */ (function () {
    function TabModule() {
    }
    TabModule_1 = TabModule;
    TabModule.forRoot = function () {
        return { ngModule: TabModule_1, providers: [] };
    };
    TabModule = TabModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormsModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__tab_directive__["a" /* TabDirective */], __WEBPACK_IMPORTED_MODULE_4__navbar_component__["a" /* NavbarComponent */], __WEBPACK_IMPORTED_MODULE_5__tabbar_component__["a" /* TabbarComponent */], __WEBPACK_IMPORTED_MODULE_6__bar_component__["a" /* BarComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_3__tab_directive__["a" /* TabDirective */], __WEBPACK_IMPORTED_MODULE_4__navbar_component__["a" /* NavbarComponent */], __WEBPACK_IMPORTED_MODULE_5__tabbar_component__["a" /* TabbarComponent */]]
        })
    ], TabModule);
    return TabModule;
    var TabModule_1;
}());



/***/ }),

/***/ "./components/tab/tabbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bar_component__ = __webpack_require__("./components/tab/bar.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * 底部选项卡
 */
var TabbarComponent = /** @class */ (function (_super) {
    __extends(TabbarComponent, _super);
    function TabbarComponent() {
        return _super.call(this) || this;
    }
    TabbarComponent_1 = TabbarComponent;
    TabbarComponent = TabbarComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-tabbar',
            template: "\n    <div class=\"weui-tab__panel\"><ng-content></ng-content></div>\n    <div class=\"weui-tabbar\">\n        <div class=\"weui-tabbar__item\" [ngClass]=\"{'weui-bar__item_on': item.active}\"\n            *ngFor=\"let item of tabs\" (click)=\"item.active=true\">\n            <div style=\"display: inline-block;position: relative;\">\n                <div class=\"weui-tabbar__icon\" [innerHTML]=\"item.icon\"></div>\n                <span class=\"weui-badge\" style=\"position: absolute;top: -2px;right: -13px;\" *ngIf=\"item.badge && item.badge !== 'dot'\">{{item.badge}}</span>\n                <span class=\"weui-badge weui-badge_dot\" style=\"position: absolute;top: 0;right: -6px;\" *ngIf=\"item.badge && item.badge === 'dot'\"></span>\n            </div>\n            <p class=\"weui-tabbar__label\">{{item.heading}}</p>\n        </div>\n    </div>\n    ",
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__bar_component__["a" /* BarComponent */], useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return TabbarComponent_1; }) }],
            host: {
                '[class.weui-tab]': 'true'
            }
        }),
        __metadata("design:paramtypes", [])
    ], TabbarComponent);
    return TabbarComponent;
    var TabbarComponent_1;
}(__WEBPACK_IMPORTED_MODULE_1__bar_component__["a" /* BarComponent */]));



/***/ }),

/***/ "./components/toast/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toast_service__ = __webpack_require__("./components/toast/toast.service.ts");
/* unused harmony reexport ToastService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toast_component__ = __webpack_require__("./components/toast/toast.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__toast_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toast_config__ = __webpack_require__("./components/toast/toast.config.ts");
/* unused harmony reexport ToastConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toast_module__ = __webpack_require__("./components/toast/toast.module.ts");
/* unused harmony reexport ToastModule */






/***/ }),

/***/ "./components/toast/toast.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toast_config__ = __webpack_require__("./components/toast/toast.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToastComponent = /** @class */ (function () {
    function ToastComponent(DEF) {
        this.DEF = DEF;
        /**
         * 显示时长后自动关闭（单位：ms），0 表示永久，默认：`2000`
         */
        this.time = 2000;
        /**
         * 隐藏后回调
         */
        this.hide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._showd = false;
        this.type = 'success';
    }
    Object.defineProperty(ToastComponent.prototype, "type", {
        /**
         * 类型
         */
        set: function (_t) {
            Object.assign(this, this.DEF[_t]);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @docs-private
     */
    ToastComponent.prototype.onShow = function () {
        var _this = this;
        this._showd = true;
        if (this.time > 0) {
            this.timer = setTimeout(function () {
                _this.onHide();
            }, this.time);
        }
        return this;
    };
    /**
     * @docs-private
     */
    ToastComponent.prototype.onHide = function () {
        this._showd = false;
        this.hide.emit();
    };
    ToastComponent.prototype.ngOnDestroy = function () {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ToastComponent.prototype, "type", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ToastComponent.prototype, "text", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ToastComponent.prototype, "icon", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], ToastComponent.prototype, "time", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ToastComponent.prototype, "hide", void 0);
    ToastComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-toast',
            template: "\n        <div class=\"weui-mask_transparent\"></div>\n        <div class=\"weui-toast\">\n            <i class=\"{{icon}} weui-icon_toast\"></i>\n            <p class=\"weui-toast__content\">{{text}}</p>\n        </div>\n    ",
            host: {
                '[hidden]': '!_showd'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__toast_config__["a" /* ToastConfig */]])
    ], ToastComponent);
    return ToastComponent;
}());



/***/ }),

/***/ "./components/toast/toast.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ToastConfig = /** @class */ (function () {
    function ToastConfig() {
        /**
         * 成功配置项
         */
        this.success = { text: '已完成', icon: 'weui-icon-success-no-circle', time: 2000 };
        /**
         * 加载中配置项
         */
        this.loading = { text: '加载中…', icon: 'weui-loading', time: 2000 };
    }
    ToastConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], ToastConfig);
    return ToastConfig;
}());



/***/ }),

/***/ "./components/toast/toast.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toast_component__ = __webpack_require__("./components/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toast_service__ = __webpack_require__("./components/toast/toast.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toast_config__ = __webpack_require__("./components/toast/toast.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ToastModule = /** @class */ (function () {
    function ToastModule() {
    }
    ToastModule_1 = ToastModule;
    ToastModule.forRoot = function () {
        return { ngModule: ToastModule_1, providers: [__WEBPACK_IMPORTED_MODULE_4__toast_config__["a" /* ToastConfig */]] };
    };
    ToastModule = ToastModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__toast_component__["a" /* ToastComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__toast_component__["a" /* ToastComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__toast_service__["a" /* ToastService */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__toast_component__["a" /* ToastComponent */]]
        })
    ], ToastModule);
    return ToastModule;
    var ToastModule_1;
}());



/***/ }),

/***/ "./components/toast/toast.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_base_service__ = __webpack_require__("./components/utils/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toast_component__ = __webpack_require__("./components/toast/toast.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ToastService = /** @class */ (function (_super) {
    __extends(ToastService, _super);
    function ToastService(resolver, applicationRef, injector) {
        return _super.call(this, resolver, applicationRef, injector) || this;
    }
    /**
     * 构建toast并显示
     *
     * @param [text] 文本（可选）
     * @param [time] 显示时长后自动关闭（单位：ms），0 表示永久（可选）
     * @param [icon] icon图标Class名（可选）
     * @param [type] 类型（可选）
     */
    ToastService.prototype.show = function (text, time, icon, type) {
        var componentRef = this.build(__WEBPACK_IMPORTED_MODULE_2__toast_component__["a" /* ToastComponent */]);
        if (type)
            componentRef.instance.type = type;
        if (text)
            componentRef.instance.text = text;
        if (icon)
            componentRef.instance.icon = icon;
        if (time)
            componentRef.instance.time = time;
        componentRef.instance.hide.subscribe(function () {
            setTimeout(function () {
                componentRef.destroy();
            }, 300);
        });
        return componentRef.instance.onShow();
    };
    /**
     * 关闭最新toast
     */
    ToastService.prototype.hide = function () {
        this.destroy();
    };
    /**
     * 构建成功toast并显示
     *
     * @param [text] 文本（可选）
     * @param [time] 显示时长后自动关闭（单位：ms）（可选）
     * @param [icon] icon图标Class名（可选）
     */
    ToastService.prototype.success = function (text, time, icon) {
        return this.show(text, time, icon, 'success');
    };
    /**
     * 构建加载中toast并显示
     *
     * @param [text] 文本（可选）
     * @param [time] 显示时长后自动关闭（单位：ms）（可选）
     * @param [icon] icon图标Class名（可选）
     */
    ToastService.prototype.loading = function (text, time, icon) {
        return this.show(text, time, icon, 'loading');
    };
    ToastService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
    ], ToastService);
    return ToastService;
}(__WEBPACK_IMPORTED_MODULE_1__utils_base_service__["a" /* BaseService */]));



/***/ }),

/***/ "./components/toptips/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toptips_component__ = __webpack_require__("./components/toptips/toptips.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__toptips_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toptips_service__ = __webpack_require__("./components/toptips/toptips.service.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__toptips_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toptips_module__ = __webpack_require__("./components/toptips/toptips.module.ts");
/* unused harmony reexport ToptipsModule */





/***/ }),

/***/ "./components/toptips/toptips.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToptipsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToptipsComponent = /** @class */ (function () {
    function ToptipsComponent() {
        /**
         * 显示时长后自动关闭（单位：ms），默认：`2000`
         */
        this.time = 2000;
        /**
         * 隐藏后回调
         */
        this.hide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._classMap = {};
        this._showd = false;
    }
    Object.defineProperty(ToptipsComponent.prototype, "type", {
        /**
         * 类型
         */
        set: function (_type) {
            this._type = _type;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    ToptipsComponent.prototype.ngOnInit = function () {
        this.setClassMap();
    };
    ToptipsComponent.prototype.setClassMap = function () {
        this._classMap = (_a = {},
            _a["weui-toptips_" + this._type] = true,
            _a);
        var _a;
    };
    ToptipsComponent.prototype.onShow = function () {
        var _this = this;
        this.destroy();
        this._showd = true;
        this.timer = setTimeout(function () {
            _this.onHide();
        }, this.time);
        return this;
    };
    ToptipsComponent.prototype.onHide = function () {
        this._showd = false;
        this.hide.emit();
    };
    ToptipsComponent.prototype.destroy = function () {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };
    ToptipsComponent.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ToptipsComponent.prototype, "text", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], ToptipsComponent.prototype, "time", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ToptipsComponent.prototype, "hide", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ToptipsComponent.prototype, "type", null);
    ToptipsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'weui-toptips',
            template: "\n    <div class=\"weui-toptips\" style=\"display:block\" [ngClass]=\"_classMap\">{{text}}<ng-content></ng-content></div>",
            host: {
                '[hidden]': '!_showd'
            }
        })
    ], ToptipsComponent);
    return ToptipsComponent;
}());



/***/ }),

/***/ "./components/toptips/toptips.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToptipsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toptips_component__ = __webpack_require__("./components/toptips/toptips.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toptips_service__ = __webpack_require__("./components/toptips/toptips.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ToptipsModule = /** @class */ (function () {
    function ToptipsModule() {
    }
    ToptipsModule_1 = ToptipsModule;
    ToptipsModule.forRoot = function () {
        return { ngModule: ToptipsModule_1, providers: [] };
    };
    ToptipsModule = ToptipsModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__toptips_component__["a" /* ToptipsComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__toptips_component__["a" /* ToptipsComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__toptips_service__["a" /* ToptipsService */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__toptips_component__["a" /* ToptipsComponent */]]
        })
    ], ToptipsModule);
    return ToptipsModule;
    var ToptipsModule_1;
}());



/***/ }),

/***/ "./components/toptips/toptips.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToptipsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toptips_component__ = __webpack_require__("./components/toptips/toptips.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_base_service__ = __webpack_require__("./components/utils/base.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ToptipsService = /** @class */ (function (_super) {
    __extends(ToptipsService, _super);
    function ToptipsService(resolver, applicationRef, injector) {
        return _super.call(this, resolver, applicationRef, injector) || this;
    }
    /**
     * 构建一个Toptips并显示
     *
     * @param text 文本
     * @param type 类型
     * @param 显示时长后自动关闭（单位：ms）
     */
    ToptipsService.prototype.show = function (text, type, time) {
        var _this = this;
        if (time === void 0) { time = 2000; }
        var componentRef = this.build(__WEBPACK_IMPORTED_MODULE_1__toptips_component__["a" /* ToptipsComponent */]);
        if (type)
            componentRef.instance.type = type;
        if (text)
            componentRef.instance.text = text;
        componentRef.instance.time = time;
        componentRef.instance.hide.subscribe(function () {
            setTimeout(function () {
                _this.destroy(componentRef);
            }, 100);
        });
        return componentRef.instance.onShow();
    };
    /**
     * 构建一个Warn Toptips并显示
     *
     * @param text 文本
     * @param time 显示时长后自动关闭（单位：ms）
     */
    ToptipsService.prototype.warn = function (text, time) {
        if (time === void 0) { time = 2000; }
        return this.show(text, 'warn', time);
    };
    /**
     * 构建一个Info Toptips并显示
     *
     * @param text 文本
     * @param time 显示时长后自动关闭（单位：ms）
     */
    ToptipsService.prototype.info = function (text, time) {
        if (time === void 0) { time = 2000; }
        return this.show(text, 'info', time);
    };
    /**
     * 构建一个Primary Toptips并显示
     *
     * @param text 文本
     * @param time 显示时长后自动关闭（单位：ms）
     */
    ToptipsService.prototype.primary = function (text, time) {
        if (time === void 0) { time = 2000; }
        return this.show(text, 'primary', time);
    };
    /**
     * 构建一个Success Toptips并显示
     *
     * @param text 文本
     * @param time 显示时长后自动关闭（单位：ms）
     */
    ToptipsService.prototype.success = function (text, time) {
        if (time === void 0) { time = 2000; }
        return this.show(text, 'primary', time);
    };
    /**
     * 构建一个Default Toptips并显示
     *
     * @param text 文本
     * @param time 显示时长后自动关闭（单位：ms）
     */
    ToptipsService.prototype.default = function (text, time) {
        if (time === void 0) { time = 2000; }
        return this.show(text, 'default', time);
    };
    ToptipsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
    ], ToptipsService);
    return ToptipsService;
}(__WEBPACK_IMPORTED_MODULE_2__utils_base_service__["a" /* BaseService */]));



/***/ }),

/***/ "./components/uploader/file-item.class.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__file_like_object_class__ = __webpack_require__("./components/uploader/file-like-object.class.ts");

/**
 * 文件对象
 */
var FileItem = /** @class */ (function () {
    function FileItem(uploader, file, options) {
        /**
         * 索引
         */
        this.index = 0;
        /**
         * 上传进度
         */
        this.progress = 0;
        /**
         * 准备上传就绪
         */
        this.isReady = false;
        /**
         * 上传中
         */
        this.isUploading = false;
        /**
         * 已上传（不管错误与否都是true）
         */
        this.isUploaded = false;
        /**
         * 上传成功
         */
        this.isSuccess = false;
        /**
         * 用户取消上传
         */
        this.isCancel = false;
        /**
         * 上传失败
         */
        this.isError = false;
        this.uploader = uploader;
        this.setOptions(options);
        this.id = Math.random().toString(36).substring(7);
        this.file = new __WEBPACK_IMPORTED_MODULE_0__file_like_object_class__["a" /* FileLikeObject */](file);
        this._file = file;
    }
    FileItem.prototype.setOptions = function (options) {
        this.options = Object.assign({}, this.uploader.options, options);
    };
    /**
     * 上传
     */
    FileItem.prototype.upload = function () {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    };
    /**
     * 取消上传
     */
    FileItem.prototype.cancel = function () {
        this.uploader.cancelItem(this);
    };
    /**
     * 从队列中移除，当文件正在上传中时会先取消
     */
    FileItem.prototype.remove = function () {
        this.uploader.removeFromQueue(this);
    };
    FileItem.prototype._prepareToUploading = function () {
        this.index = this.index || this.uploader._getNextIndex();
        this.isReady = true;
    };
    FileItem.prototype._onBeforeUpload = function () {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        if (this.options.onUploadStart)
            this.options.onUploadStart(this);
    };
    FileItem.prototype._onProgress = function (progress) {
        this.progress = progress;
        if (this.options.onUploadProgress)
            this.options.onUploadProgress(this, progress, this.uploader.progress);
    };
    FileItem.prototype._onSuccess = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        if (this.options.onUploadSuccess)
            this.options.onUploadSuccess(this, response, status, headers);
    };
    FileItem.prototype._onError = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        if (this.options.onUploadError)
            this.options.onUploadError(this, response, status, headers);
    };
    FileItem.prototype._onComplete = function (response, status, headers) {
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
        if (this.options.onUploadComplete)
            this.options.onUploadComplete(this, response, status, headers);
    };
    FileItem.prototype._onCancel = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        if (this.options.onUploadCancel)
            this.options.onUploadCancel(this);
    };
    return FileItem;
}());



/***/ }),

/***/ "./components/uploader/file-like-object.class.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileLikeObject; });
function isElement(node) {
    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
}
/**
 * @docs-private
 */
var FileLikeObject = /** @class */ (function () {
    function FileLikeObject(fileOrInput) {
        var isInput = isElement(fileOrInput);
        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        var postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        var method = '_createFrom' + postfix;
        this[method](fakePathOrObject);
    }
    FileLikeObject.prototype._createFromFakePath = function (path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    };
    FileLikeObject.prototype._createFromObject = function (object) {
        // this.lastModifiedDate = copy(object.lastModifiedDate);
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    };
    return FileLikeObject;
}());



/***/ }),

/***/ "./components/uploader/file-thumb.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileThumbDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_browser__ = __webpack_require__("./components/utils/browser.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * 创建缩略图
 */
var FileThumbDirective = /** @class */ (function () {
    function FileThumbDirective(el) {
        this.el = el;
    }
    FileThumbDirective.prototype.render = function () {
        var url = Object(__WEBPACK_IMPORTED_MODULE_1__utils_browser__["a" /* genImageUrl */])(this.file);
        if (!url)
            return;
        this.el.nativeElement.style.backgroundImage = "url(" + url + ")";
    };
    FileThumbDirective.prototype.ngOnChanges = function (changes) {
        this.render();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-thumb'),
        __metadata("design:type", File)
    ], FileThumbDirective.prototype, "file", void 0);
    FileThumbDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: '[weui-thumb]' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], FileThumbDirective);
    return FileThumbDirective;
}());



/***/ }),

/***/ "./components/uploader/file-type.class.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileType; });
/**
 * @docs-private
 */
var FileType = /** @class */ (function () {
    function FileType() {
    }
    FileType.getMimeClass = function (file) {
        var mimeClass = 'application';
        if (this.mime_psd.indexOf(file.type) !== -1) {
            mimeClass = 'image';
        }
        else if (file.type.match('image.*')) {
            mimeClass = 'image';
        }
        else if (file.type.match('video.*')) {
            mimeClass = 'video';
        }
        else if (file.type.match('audio.*')) {
            mimeClass = 'audio';
        }
        else if (file.type === 'application/pdf') {
            mimeClass = 'pdf';
        }
        else if (this.mime_compress.indexOf(file.type) !== -1) {
            mimeClass = 'compress';
        }
        else if (this.mime_doc.indexOf(file.type) !== -1) {
            mimeClass = 'doc';
        }
        else if (this.mime_xsl.indexOf(file.type) !== -1) {
            mimeClass = 'xls';
        }
        else if (this.mime_ppt.indexOf(file.type) !== -1) {
            mimeClass = 'ppt';
        }
        if (mimeClass === 'application') {
            mimeClass = this.fileTypeDetection(file.name);
        }
        return mimeClass;
    };
    FileType.fileTypeDetection = function (inputFilename) {
        var types = {
            'jpg': 'image',
            'jpeg': 'image',
            'tif': 'image',
            'psd': 'image',
            'bmp': 'image',
            'png': 'image',
            'nef': 'image',
            'tiff': 'image',
            'cr2': 'image',
            'dwg': 'image',
            'cdr': 'image',
            'ai': 'image',
            'indd': 'image',
            'pin': 'image',
            'cdp': 'image',
            'skp': 'image',
            'stp': 'image',
            '3dm': 'image',
            'mp3': 'audio',
            'wav': 'audio',
            'wma': 'audio',
            'mod': 'audio',
            'm4a': 'audio',
            'compress': 'compress',
            'rar': 'compress',
            '7z': 'compress',
            'lz': 'compress',
            'z01': 'compress',
            'pdf': 'pdf',
            'xls': 'xls',
            'xlsx': 'xls',
            'ods': 'xls',
            'mp4': 'video',
            'avi': 'video',
            'wmv': 'video',
            'mpg': 'video',
            'mts': 'video',
            'flv': 'video',
            '3gp': 'video',
            'vob': 'video',
            'm4v': 'video',
            'mpeg': 'video',
            'm2ts': 'video',
            'mov': 'video',
            'doc': 'doc',
            'docx': 'doc',
            'eps': 'doc',
            'txt': 'doc',
            'odt': 'doc',
            'rtf': 'doc',
            'ppt': 'ppt',
            'pptx': 'ppt',
            'pps': 'ppt',
            'ppsx': 'ppt',
            'odp': 'ppt'
        };
        var chunks = inputFilename.split('.');
        if (chunks.length < 2) {
            return 'application';
        }
        var extension = chunks[chunks.length - 1].toLowerCase();
        if (types[extension] === undefined) {
            return 'application';
        }
        else {
            return types[extension];
        }
    };
    /*  MS office  */
    FileType.mime_doc = [
        'application/msword',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        'application/vnd.ms-word.document.macroEnabled.12',
        'application/vnd.ms-word.template.macroEnabled.12'
    ];
    FileType.mime_xsl = [
        'application/vnd.ms-excel',
        'application/vnd.ms-excel',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
        'application/vnd.ms-excel.sheet.macroEnabled.12',
        'application/vnd.ms-excel.template.macroEnabled.12',
        'application/vnd.ms-excel.addin.macroEnabled.12',
        'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
    ];
    FileType.mime_ppt = [
        'application/vnd.ms-powerpoint',
        'application/vnd.ms-powerpoint',
        'application/vnd.ms-powerpoint',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.openxmlformats-officedocument.presentationml.template',
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
        'application/vnd.ms-powerpoint.addin.macroEnabled.12',
        'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
        'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
        'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
    ];
    /* PSD */
    FileType.mime_psd = [
        'image/photoshop',
        'image/x-photoshop',
        'image/psd',
        'application/photoshop',
        'application/psd',
        'zz-application/zz-winassoc-psd'
    ];
    /* Compressed files */
    FileType.mime_compress = [
        'application/x-gtar',
        'application/x-gcompress',
        'application/compress',
        'application/x-tar',
        'application/x-rar-compressed',
        'application/octet-stream'
    ];
    return FileType;
}());



/***/ }),

/***/ "./components/uploader/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__file_like_object_class__ = __webpack_require__("./components/uploader/file-like-object.class.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__file_item_class__ = __webpack_require__("./components/uploader/file-item.class.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__file_type_class__ = __webpack_require__("./components/uploader/file-type.class.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uploader_config__ = __webpack_require__("./components/uploader/uploader.config.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__uploader_class__ = __webpack_require__("./components/uploader/uploader.class.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__uploader_class__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__uploader_directive__ = __webpack_require__("./components/uploader/uploader.directive.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__file_thumb_directive__ = __webpack_require__("./components/uploader/file-thumb.directive.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__uploader_module__ = __webpack_require__("./components/uploader/uploader.module.ts");
/* unused harmony reexport UploaderModule */










/***/ }),

/***/ "./components/uploader/uploader.class.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Uploader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__file_item_class__ = __webpack_require__("./components/uploader/file-item.class.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uploader_config__ = __webpack_require__("./components/uploader/uploader.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__file_like_object_class__ = __webpack_require__("./components/uploader/file-like-object.class.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__file_type_class__ = __webpack_require__("./components/uploader/file-type.class.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





/**
 * 内置HTML5上传组件
 */
var Uploader = /** @class */ (function () {
    /**
     * Creates an instance of Uploader.
     */
    function Uploader(options, globalConfig) {
        this.globalConfig = globalConfig;
        this._queue = [];
        this._progress = 0;
        this._isUploading = false;
        this._nextIndex = 0;
        this.setOptions(options);
    }
    Object.defineProperty(Uploader.prototype, "options", {
        /**
         * 获取当前上传组件配置项
         */
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "queue", {
        /**
         * 获取队列中所有文件对象
         */
        get: function () {
            return this._queue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "progress", {
        /**
         * 获取当前总进度
         */
        get: function () {
            return this._progress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "isUploading", {
        /**
         * 是否上传中
         */
        get: function () {
            return this._isUploading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "notUploadedCount", {
        /**
         * 获取未上传数量
         */
        get: function () {
            return this.getNotUploadedItems().length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "uploadedCount", {
        /**
         * 获取已上传数量
         */
        get: function () {
            return this._queue.filter(function (item) { return item.isUploaded; }).length;
        },
        enumerable: true,
        configurable: true
    });
    Uploader.prototype._getNextIndex = function () {
        return ++this._nextIndex;
    };
    /**
     * 重置选项
     *
     * @param options
     * @param includeOldQueue 是否包括已存在队列中的文件
     */
    Uploader.prototype.setOptions = function (options, includeOldQueue) {
        if (includeOldQueue === void 0) { includeOldQueue = true; }
        this._options = Object.assign({
            filters: [],
            disableMultipart: false,
            method: 'POST',
            alias: 'file',
            withCredentials: true,
            auto: false,
            limit: -1,
            size: -1,
            removeAfterUpload: false
        }, this.globalConfig, this._options, options);
        // 数量
        if (this._options.limit !== -1)
            this._options.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
        // 大小
        if (this._options.size !== -1)
            this._options.filters.unshift({ name: 'fileSize', fn: this._fileSizeFilter });
        // 类型
        if (this._options.types)
            this._options.filters.unshift({ name: 'fileType', fn: this._fileTypeFilter });
        // mime类型
        if (this._options.mimes)
            this._options.filters.unshift({ name: 'mimeType', fn: this._mimeTypeFilter });
        // 对已经存在的队列重置所有配置信息
        if (includeOldQueue) {
            for (var i = 0; i < this._queue.length; i++) {
                this._queue[i].setOptions(this._options);
            }
        }
    };
    Uploader.prototype._queueLimitFilter = function () {
        return this._options.limit === undefined || this._queue.length < this._options.limit;
    };
    Uploader.prototype._fileSizeFilter = function (item) {
        return !(this._options.size && item.size > this._options.size);
    };
    Uploader.prototype._mimeTypeFilter = function (item) {
        return !(this._options.mimes && this._options.mimes.indexOf(item.type) === -1);
    };
    Uploader.prototype._fileTypeFilter = function (item) {
        return !(this._options.types && this._options.types.indexOf(__WEBPACK_IMPORTED_MODULE_4__file_type_class__["a" /* FileType */].getMimeClass(item)) === -1);
    };
    Uploader.prototype._isValidFile = function (file, filters, options) {
        var _this = this;
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every(function (filter) {
            _this._failFilterIndex++;
            return filter.fn.call(_this, file, options);
        });
    };
    /** 过滤器，如果未指定采用内置 */
    Uploader.prototype._getFilters = function (filters) {
        if (!filters)
            return this._options.filters;
        if (Array.isArray(filters))
            return filters;
        if (typeof filters === 'string') {
            var names_1 = filters.match(/[^\s,]+/g);
            return this._options.filters
                .filter(function (filter) { return names_1.indexOf(filter.name) !== -1; });
        }
        return this._options.filters;
    };
    Uploader.prototype._getIndexOfItem = function (value) {
        return typeof value === 'number' ? value : this._queue.indexOf(value);
    };
    /** 获取未上传过列表 */
    Uploader.prototype.getNotUploadedItems = function () {
        return this._queue.filter(function (item) { return !item.isUploaded; });
    };
    Object.defineProperty(Uploader.prototype, "getReadyItems", {
        /** 获取待上传文件 */
        get: function () {
            return this._queue
                .filter(function (item) { return (item.isReady && !item.isUploading); })
                .sort(function (item1, item2) { return item1.index - item2.index; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 将文件放入队列中
     *
     * @param files 文件列表
     * @param options 强制重新指定新 `options` 内容
     * @param filters 强制重新指定新 `filters` 内容
     */
    Uploader.prototype.addToQueue = function (files, options, filters) {
        var _this = this;
        var list = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            list.push(file);
        }
        var arrayOfFilters = this._getFilters(filters);
        var count = this._queue.length;
        var addedFileItems = [];
        if (!options) {
            options = this._options;
        }
        list.map(function (some) {
            var temp = new __WEBPACK_IMPORTED_MODULE_3__file_like_object_class__["a" /* FileLikeObject */](some);
            if (_this._isValidFile(temp, arrayOfFilters, options)) {
                var fileItem = new __WEBPACK_IMPORTED_MODULE_1__file_item_class__["a" /* FileItem */](_this, some, options);
                addedFileItems.push(fileItem);
                _this._queue.push(fileItem);
                if (_this._options.onFileQueued)
                    _this._options.onFileQueued(fileItem);
            }
            else {
                var filter = arrayOfFilters[_this._failFilterIndex];
                if (_this._options.onError)
                    _this._options.onError(temp, filter, options);
            }
        });
        if (this.queue.length !== count) {
            this._progress = this._getTotalProgress();
        }
        if (this.options.auto) {
            this.uploadAll();
        }
    };
    /**
     * 从队列中移除一个文件
     *
     * @param value FileItem对象或下标
     */
    Uploader.prototype.removeFromQueue = function (value) {
        var index = this._getIndexOfItem(value);
        var item = this._queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this._queue.splice(index, 1);
        this._progress = this._getTotalProgress();
        if (this._options.onFileDequeued)
            this._options.onFileDequeued(item);
    };
    /**
     * 清空队列
     */
    Uploader.prototype.clearQueue = function () {
        while (this._queue.length) {
            this._queue[0].remove();
        }
        this._progress = 0;
        if (this._options.onFileDequeued)
            this._options.onFileDequeued();
    };
    /**
     * 上传某个文件
     */
    Uploader.prototype.uploadItem = function (value) {
        var index = this._getIndexOfItem(value);
        var item = this._queue[index];
        item._prepareToUploading();
        if (this._isUploading) {
            return;
        }
        this._isUploading = true;
        this._xhrTransport(item);
    };
    /**
     * 取消某个文件
     */
    Uploader.prototype.cancelItem = function (value) {
        var index = this._getIndexOfItem(value);
        var item = this._queue[index];
        if (item && item.isUploading) {
            if (item.options.abortTransport) {
                this._onCancelItem(item, null, null, null);
                this._onCompleteItem(item, null, null, null);
                item.options.abortTransport(item);
            }
            else {
                if (item._xhr)
                    item._xhr.abort();
            }
        }
    };
    /**
     * 上传队列中所有未上传的文件
     */
    Uploader.prototype.uploadAll = function () {
        var items = this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
        if (!items.length) {
            return;
        }
        items.map(function (item) { return item._prepareToUploading(); });
        if (this._options.onStart)
            this._options.onStart(items[0]);
        items[0].upload();
    };
    /**
     * 取消所有上传中文件
     */
    Uploader.prototype.cancelAll = function () {
        var items = this.getNotUploadedItems();
        items.map(function (item) { return item.cancel(); });
        if (this._options.onCancel)
            this._options.onCancel();
    };
    Uploader.prototype._destroy = function () {
        return void 0;
    };
    Uploader.prototype._xhrTransport = function (item) {
        var _this = this;
        item._onBeforeUpload();
        // 自实现
        if (item.options.uploadTransport) {
            item.options.uploadTransport.apply(this, [item]).subscribe(function (response) {
                _this._onSuccessItem(item, response, 0, null);
                _this._onCompleteItem(item, response, 0, null);
            });
            return this;
        }
        var xhr = item._xhr = new XMLHttpRequest();
        var sendable;
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this._options.disableMultipart) {
            sendable = new FormData();
            sendable.append(item.options.alias, item._file, item.file.name);
            if (this._options.params !== undefined) {
                Object.keys(this._options.params).forEach(function (key) {
                    sendable.append(key, _this._options.params[key]);
                });
            }
        }
        else {
            sendable = item._file;
        }
        xhr.upload.onprogress = function (event) {
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            _this._onProgressItem(item, progress);
        };
        xhr.onload = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            var method = '_on' + gist + 'Item';
            _this[method](item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onerror = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onabort = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onCancelItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.open(item.options.method, item.options.url, true);
        xhr.withCredentials = item.options.withCredentials;
        if (item.options.headers && item.options.headers.length > 0) {
            for (var _i = 0, _a = item.options.headers; _i < _a.length; _i++) {
                var header = _a[_i];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        xhr.send(sendable);
        return this;
    };
    Uploader.prototype._getTotalProgress = function (value) {
        if (value === void 0) { value = 0; }
        if (this._options.removeAfterUpload) {
            return value;
        }
        var notUploaded = this.getNotUploadedItems().length;
        var uploaded = notUploaded ? this._queue.length - notUploaded : this._queue.length;
        var ratio = 100 / this._queue.length;
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    Uploader.prototype._parseHeaders = function (headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map(function (line) {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });
        return parsed;
    };
    Uploader.prototype._transformResponse = function (response, headers) {
        return response;
    };
    Uploader.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    Uploader.prototype._onProgressItem = function (item, progress) {
        var total = this._getTotalProgress(progress);
        this._progress = total;
        item._onProgress(progress);
    };
    Uploader.prototype._onErrorItem = function (item, response, status, headers) {
        item._onError(response, status, headers);
    };
    Uploader.prototype._onSuccessItem = function (item, response, status, headers) {
        item._onSuccess(response, status, headers);
    };
    Uploader.prototype._onCancelItem = function (item, response, status, headers) {
        item._onCancel(response, status, headers);
    };
    Uploader.prototype._onCompleteItem = function (item, response, status, headers) {
        item._onComplete(response, status, headers);
        var nextItem = this.getReadyItems[0];
        this._isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this._progress = this._getTotalProgress();
        if (this._options.onFinished)
            this._options.onFinished();
    };
    Uploader = __decorate([
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__uploader_config__["a" /* UploaderConfig */])), __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_2__uploader_config__["a" /* UploaderConfig */]])
    ], Uploader);
    return Uploader;
}());



/***/ }),

/***/ "./components/uploader/uploader.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploaderConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UploaderConfig = /** @class */ (function () {
    function UploaderConfig() {
        /**
         * 发送凭据，默认：`true`
         */
        this.withCredentials = true;
        /**
         * 是否自动上传，默认：`false`
         * 设置为 true 后，不需要手动调用 `upload`，有文件选择即开始上传。
         */
        this.auto = false;
        /**
         * 允许最多上传数量，-1 表示不受限，默认：`-1`
         */
        this.limit = -1;
        /**
         * 限定文件大小（单位：字节），-1 表示不受限，默认：`-1`
         */
        this.size = -1;
    }
    UploaderConfig = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], UploaderConfig);
    return UploaderConfig;
}());



/***/ }),

/***/ "./components/uploader/uploader.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploaderFileDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uploader_class__ = __webpack_require__("./components/uploader/uploader.class.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UploaderFileDirective = /** @class */ (function () {
    function UploaderFileDirective(element) {
        this.element = element;
    }
    Object.defineProperty(UploaderFileDirective.prototype, "_options", {
        get: function () {
            return this.uploader.options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderFileDirective.prototype, "_isEmptyAfterSelection", {
        get: function () {
            return !!this.element.nativeElement.attributes.multiple;
        },
        enumerable: true,
        configurable: true
    });
    UploaderFileDirective.prototype._onChange = function () {
        var files = this.element.nativeElement.files;
        this.uploader.addToQueue(files, this._options);
        if (this._isEmptyAfterSelection) {
            this.element.nativeElement.value = '';
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('weui-uploader-file'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__uploader_class__["a" /* Uploader */])
    ], UploaderFileDirective.prototype, "uploader", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('change'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Object)
    ], UploaderFileDirective.prototype, "_onChange", null);
    UploaderFileDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[weui-uploader-file]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], UploaderFileDirective);
    return UploaderFileDirective;
}());



/***/ }),

/***/ "./components/uploader/uploader.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploaderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uploader_directive__ = __webpack_require__("./components/uploader/uploader.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__file_thumb_directive__ = __webpack_require__("./components/uploader/file-thumb.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__uploader_config__ = __webpack_require__("./components/uploader/uploader.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var UploaderModule = /** @class */ (function () {
    function UploaderModule() {
    }
    UploaderModule_1 = UploaderModule;
    UploaderModule.forRoot = function () {
        return { ngModule: UploaderModule_1, providers: [__WEBPACK_IMPORTED_MODULE_4__uploader_config__["a" /* UploaderConfig */]] };
    };
    UploaderModule = UploaderModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__uploader_directive__["a" /* UploaderFileDirective */], __WEBPACK_IMPORTED_MODULE_3__file_thumb_directive__["a" /* FileThumbDirective */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__uploader_directive__["a" /* UploaderFileDirective */], __WEBPACK_IMPORTED_MODULE_3__file_thumb_directive__["a" /* FileThumbDirective */]
            ]
        })
    ], UploaderModule);
    return UploaderModule;
    var UploaderModule_1;
}());



/***/ }),

/***/ "./components/utils/base.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
var BaseService = /** @class */ (function () {
    function BaseService(resolver, applicationRef, injector) {
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
        this.list = [];
    }
    /**
     * 销毁
     *
     * @param component 下标（从0开始或组件引用对象），或不指定时，销毁最新一个
     */
    BaseService.prototype.destroy = function (component) {
        if (typeof component === 'number')
            component = this.list[component];
        if (!component)
            component = this.list.pop();
        if (component)
            component.destroy();
    };
    /**
     * 销毁所有
     */
    BaseService.prototype.destroyAll = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var component = _a[_i];
            this.destroy(component);
        }
    };
    /** 动态构建组件 */
    BaseService.prototype.build = function (component) {
        var _this = this;
        var componentFactory = this.resolver.resolveComponentFactory(component);
        var componentRef = componentFactory.create(this.injector);
        this.list.push(componentRef);
        var componentRootNode = componentRef.hostView.rootNodes[0];
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(function () {
            _this.applicationRef.detachView(componentRef.hostView);
        });
        document.body.appendChild(componentRootNode);
        return componentRef;
    };
    return BaseService;
}());



/***/ }),

/***/ "./components/utils/boolean-property.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = toBoolean;
function toBoolean(value) {
    return value != null && "" + value !== 'false';
}


/***/ }),

/***/ "./components/utils/browser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isAndroid;
/* harmony export (immutable) */ __webpack_exports__["c"] = isIOS;
/* unused harmony export isImage */
/* harmony export (immutable) */ __webpack_exports__["a"] = genImageUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");

/**
 * 检查是否安卓系统
 */
function isAndroid() {
    return /android (\d+)/.test(Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["f" /* ɵgetDOM */])().getUserAgent().toLowerCase());
}
/**
 * 检查是否IOS系统
 */
function isIOS() {
    return /iPad|iPhone|iPod/.test(Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["f" /* ɵgetDOM */])().getUserAgent());
}
/**
 * 检查File是否为图像文件
 */
function isImage(file) {
    if (!(file instanceof window.File))
        return false;
    var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
}
/**
 * 生成可预览的图像地址
 */
function genImageUrl(file) {
    if (isImage(file))
        return window.URL.createObjectURL(file);
    return '';
}


/***/ }),

/***/ "./components/utils/dom.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = findParent;
/* harmony export (immutable) */ __webpack_exports__["a"] = add;
/* harmony export (immutable) */ __webpack_exports__["c"] = remove;
/**
 * 向上查找父节点
 */
function findParent(el, selector) {
    var retEl = null;
    while (el) {
        if (el.matches(selector)) {
            retEl = el;
            break;
        }
        el = el.parentElement;
    }
    return retEl;
}
/**
 * 查找并创建
 */
function add(el, selector, tagName, className, cssText) {
    if (selector === void 0) { selector = '.weui-cell__ft'; }
    if (tagName === void 0) { tagName = 'div'; }
    if (className === void 0) { className = 'weui-cell__ft'; }
    if (cssText === void 0) { cssText = ''; }
    var ret = el.querySelector(selector);
    if (!ret) {
        ret = document.createElement(tagName);
        ret.className = className;
        if (cssText)
            ret.style.cssText = cssText;
        el.appendChild(ret);
    }
    return ret;
}
/**
 * 移除
 */
function remove(el, selector) {
    var ret = el.querySelector(selector);
    if (ret) {
        el.removeChild(ret);
    }
}


/***/ }),

/***/ "./components/utils/loader.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var LoaderService = /** @class */ (function () {
    function LoaderService(doc) {
        this.doc = doc;
        this.list = {};
    }
    LoaderService.prototype.load = function (paths) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promises = [];
            if (!Array.isArray(paths))
                paths = [paths];
            paths.forEach(function (path) {
                if (path.endsWith('.css')) {
                    promises.push(_this.loadCss(path));
                }
                else {
                    promises.push(_this.loadScript(path));
                }
            });
            Promise.all(promises).then(function (res) {
                resolve(true);
            }).catch(function (err) {
                resolve(false);
            });
        });
    };
    LoaderService.prototype.loadScript = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.list[path] === true) {
                resolve({
                    path: path,
                    loaded: true,
                    status: 'Loaded'
                });
                return;
            }
            _this.list[path] = true;
            var node = _this.doc.createElement('script');
            node.type = 'text/javascript';
            node.src = path;
            node.charset = 'utf-8';
            node.defer = true;
            node.onload = function () {
                resolve({
                    path: path,
                    loaded: true,
                    status: 'Loaded'
                });
            };
            node.onerror = function (error) { return resolve({
                path: path,
                loaded: false,
                status: 'Loaded'
            }); };
            _this.doc.getElementsByTagName('head')[0].appendChild(node);
        });
    };
    LoaderService.prototype.loadCss = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.list[path] === true) {
                resolve({
                    path: path,
                    loaded: true,
                    status: 'Loaded'
                });
                return;
            }
            _this.list[path] = true;
            var node = _this.doc.createElement('link');
            node.rel = 'stylesheet';
            node.type = 'text/css';
            node.href = path;
            _this.doc.getElementsByTagName('head')[0].appendChild(node);
            resolve({
                path: path,
                loaded: true,
                status: 'Loaded'
            });
        });
    };
    LoaderService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DOCUMENT */])),
        __metadata("design:paramtypes", [Object])
    ], LoaderService);
    return LoaderService;
}());



/***/ }),

/***/ "./node_modules/moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./activities/activities.module": [
		"./src/app/wechat/activities/activities.module.ts",
		"activities.module",
		"common"
	],
	"./buy/buy.module": [
		"./src/app/wechat/buy/buy.module.ts",
		"buy.module",
		"common"
	],
	"./personal-center/personal-center.module": [
		"./src/app/wechat/personal-center/personal-center.module.ts",
		"personal-center.module",
		"common"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: "<router-outlet></router-outlet>"
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_weui__ = __webpack_require__("./components/ngx-weui.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_notify__ = __webpack_require__("./node_modules/ngx-notify/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular_qq_maps__ = __webpack_require__("./node_modules/angular-qq-maps/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__layout_layout_module__ = __webpack_require__("./src/app/layout/layout.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__wechat_wechat_module__ = __webpack_require__("./src/app/wechat/wechat.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__core_core_module__ = __webpack_require__("./src/app/core/core.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_service_module__ = __webpack_require__("./src/app/services/service.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










//import { RoutesModule } from './routes/routes.module';





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_11__core_core_module__["a" /* CoreModule */],
                __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_13__services_service_module__["a" /* ServiceModule */],
                //RoutesModule,
                __WEBPACK_IMPORTED_MODULE_10__wechat_wechat_module__["a" /* WechatModule */],
                __WEBPACK_IMPORTED_MODULE_9__layout_layout_module__["a" /* LayoutModule */],
                __WEBPACK_IMPORTED_MODULE_5_ngx_weui__["b" /* WeUiModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_ngx_notify__["a" /* NotifyModule */].forRoot({
                    notify: {
                        progress: false
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_7_angular_qq_maps__["a" /* AqmModule */].forRoot({
                    apiKey: 'I3TBZ-QTN3J-MWPFI-FERMS-IBOCQ-LBBWY'
                })
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/core/core.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_import_guard__ = __webpack_require__("./src/app/core/module-import-guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_service__ = __webpack_require__("./src/app/core/menu.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var CoreModule = /** @class */ (function () {
    function CoreModule(parentModule) {
        Object(__WEBPACK_IMPORTED_MODULE_1__module_import_guard__["a" /* throwIfAlreadyLoaded */])(parentModule, 'CoreModule');
    }
    CoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__menu_service__["a" /* MenuService */]
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"])()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "./src/app/core/menu.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MenuService = /** @class */ (function () {
    function MenuService() {
        this.menus = [
            {
                'id': '1',
                'name': {
                    'en-US': 'Start',
                    'zh-CN': '开始'
                },
                'icon': 'star-o',
                'type': 'page',
                'link': 'start'
            },
            {
                'id': '2',
                'name': {
                    'en-US': 'Components',
                    'zh-CN': '组件'
                },
                'icon': 'th',
                'type': 'menu',
                'link': 'components',
                'items': [
                    {
                        'name': 'ActionSheet',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_actionSheet.png'
                    },
                    {
                        'name': 'Accordion',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_actionSheet.png'
                    },
                    {
                        'name': 'Button',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_button.png'
                    },
                    {
                        'name': 'Article',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_article.png'
                    },
                    {
                        'name': 'Badge',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Dialog',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_dialog.png'
                    },
                    {
                        'name': 'Mask',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_dialog.png'
                    },
                    {
                        'name': 'Flex',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Footer',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Gallery',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Grid',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    },
                    {
                        'name': 'Icons',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_icons.png'
                    },
                    {
                        'name': 'InfiniteLoader',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Input',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'form',
                        'example': 'input'
                    },
                    {
                        'name': 'VCode',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'form',
                        'example': 'input'
                    },
                    {
                        'name': 'Textarea',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'form',
                        'example': 'input'
                    },
                    {
                        'name': 'List',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'cell'
                    },
                    {
                        'name': 'LoadMore',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Msg',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_msg.png'
                    },
                    {
                        'name': 'Navbar',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'tab'
                    },
                    {
                        'name': 'Panel',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Picker',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'CityPicker',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'picker',
                        'example': 'picker'
                    },
                    {
                        'name': 'DatePicker',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'picker',
                        'example': 'picker'
                    },
                    {
                        'name': 'DateTimePicker',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'picker',
                        'example': 'picker'
                    },
                    {
                        'name': 'TimePicker',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'picker',
                        'example': 'picker'
                    },
                    {
                        'name': 'Popup',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Preview',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Progress',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_progress.png'
                    },
                    {
                        'name': 'PullToRefresh',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'ptr',
                        'example': 'ptr'
                    },
                    {
                        'name': 'SearchBar',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_search_bar.png'
                    },
                    {
                        'name': 'Slider',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Tabbar',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_tab.png',
                        'api': 'tab'
                    },
                    {
                        'name': 'Toast',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_toast.png'
                    },
                    {
                        'name': 'Toptips',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Rating',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Uploader',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Sidebar',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Stepper 步进器',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'stepper',
                        'example': 'stepper'
                    },
                    {
                        'name': 'Pagination 分页器',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'pagination',
                        'example': 'pagination'
                    },
                    {
                        'name': 'Swiper',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Countdown',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                    },
                    {
                        'name': 'Gesture Password',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'gesture-password',
                        'example': 'gesture-password'
                    },
                    {
                        'name': 'Chart G2-Mobile',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'chart-g2',
                        'example': 'chart-g2'
                    },
                    {
                        'name': 'QQ Map',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'map-qq',
                        'example': 'map-qq'
                    },
                    {
                        'name': '微信JS-SDK',
                        'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                        'api': 'jweixin',
                        'example': 'jweixin'
                    }
                ]
            },
            {
                'id': '3',
                'name': {
                    'en-US': 'FAQ',
                    'zh-CN': '常见问题'
                },
                'icon': 'book',
                'type': 'menu',
                'link': 'docs',
                'items': [
                    {
                        'id': 'how',
                        'name': '如何使用？'
                    },
                    {
                        'id': 'config',
                        'name': '全局默认配置'
                    },
                    {
                        'id': 'style',
                        'name': 'ngx-weui 样式'
                    }
                ]
            }
        ];
    }
    MenuService.prototype.getItems = function (linkId) {
        for (var _i = 0, _a = this.menus; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.link === linkId)
                return Object.assign([], item.items);
        }
        return [];
    };
    MenuService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], MenuService);
    return MenuService;
}());



/***/ }),

/***/ "./src/app/core/module-import-guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throwIfAlreadyLoaded;
// https://angular.io/styleguide#!#04-12
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(moduleName + " has already been loaded. Import Core modules in the AppModule only.");
    }
}


/***/ }),

/***/ "./src/app/core/preloader.ts":
/***/ (function(module, exports) {

var body = document.querySelector('body');
var preloader = document.querySelector('.preloader');
body.style.overflow = 'hidden';
function remove() {
    preloader.addEventListener('transitionend', function () {
        preloader.className = 'preloader-hidden';
    });
    preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
}
window.appBootstrap = function () {
    setTimeout(function () {
        remove();
        body.style.overflow = '';
    }, 100);
};


/***/ }),

/***/ "./src/app/layout/default/default.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"App__nav\" [ngClass]=\"{\r\n    'nomenu': !needNav,\r\n    'menu': needNav\r\n    }\">\r\n    <nav class=\"navSidebar background--nav\">\r\n        <div class=\"navSidebar--logo\" [ngClass]=\"{'loading': isFetching}\">\r\n            <img src=\"./assets/weui.png\" alt=\"logo\">\r\n        </div>\r\n        <div class=\"navmenu\">\r\n            <a class=\"navmenu__item\"\r\n                *ngFor=\"let m of menuService.menus\"\r\n                routerLink=\"/{{m.link}}\" routerLinkActive=\"active\">\r\n                <span aria-hidden=\"true\" class=\"fa fa-{{m.icon}} fa-2x\"></span>\r\n                <p>{{m.name[locale]}}</p>\r\n            </a>\r\n        </div>\r\n    </nav>\r\n    <docs-nav [hidden]=\"!needNav\" style=\"width: 100%;\"></docs-nav>\r\n</div>\r\n<div class=\"App__content\"><router-outlet></router-outlet></div>\r\n"

/***/ }),

/***/ "./src/app/layout/default/default.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppLayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_menu_service__ = __webpack_require__("./src/app/core/menu.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppLayoutComponent = /** @class */ (function () {
    function AppLayoutComponent(menuService, route, router) {
        this.menuService = menuService;
        this.route = route;
        this.router = router;
        this.locale = 'en-US';
        this.isFetching = false;
        this.needNav = false;
    }
    AppLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (typeof (Storage) !== 'undefined') {
            var val = localStorage.getItem('angular-weuidoc-lang');
            this.locale = val ? val : this.locale;
        }
        this.router.events
            .subscribe(function (e) {
            if (!_this.isFetching && e instanceof __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouteConfigLoadStart */]) {
                _this.isFetching = true;
            }
            if (e instanceof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* NavigationEnd */]) {
                _this.isFetching = false;
                _this.showNav(e.urlAfterRedirects);
            }
        });
        this.showNav(this.router.url);
    };
    AppLayoutComponent.prototype.showNav = function (url) {
        var key = url.split('?')[0].split('/').filter(function (w) { return !!w; })[0];
        this.needNav = ['components', 'docs'].includes(key);
    };
    AppLayoutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'app-layout-default',
            template: __webpack_require__("./src/app/layout/default/default.component.html"),
            host: {
                '[class.App]': 'true'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_menu_service__["a" /* MenuService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* Router */]])
    ], AppLayoutComponent);
    return AppLayoutComponent;
}());



/***/ }),

/***/ "./src/app/layout/layout.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__default_default_component__ = __webpack_require__("./src/app/layout/default/default.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_2__default_default_component__["a" /* AppLayoutComponent */]
];
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */]],
            providers: [],
            declarations: COMPONENTS.slice(),
            exports: COMPONENTS.slice()
        })
    ], LayoutModule);
    return LayoutModule;
}());



/***/ }),

/***/ "./src/app/services/AppConsts.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConsts; });
var AppConsts = /** @class */ (function () {
    function AppConsts() {
    }
    //static remoteServiceBaseUrl: string = "http://ga.intcov.com";
    AppConsts.remoteServiceBaseUrl = "http://localhost:21021";
    return AppConsts;
}());



/***/ }),

/***/ "./src/app/services/common/settings.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__personal_center_wechat_user_service__ = __webpack_require__("./src/app/services/personal-center/wechat-user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AppConsts__ = __webpack_require__("./src/app/services/AppConsts.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model__ = __webpack_require__("./src/app/services/model/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SettingsService = /** @class */ (function () {
    function SettingsService(wechatUserService) {
        this.wechatUserService = wechatUserService;
    }
    SettingsService.prototype.setUserId = function (oid, tid) {
        if (tid == '0') {
            tid = null;
        }
        this.openId = oid;
        this.tenantId = tid;
    };
    SettingsService.prototype.setUser = function (val) {
        this.user = __WEBPACK_IMPORTED_MODULE_7__model__["e" /* WechatUser */].fromJS(val);
        if (this.user.headImgUrl.includes('timg-4.jpeg')) {
            this.user.headImgUrl = __WEBPACK_IMPORTED_MODULE_6__AppConsts__["a" /* AppConsts */].remoteServiceBaseUrl + this.user.headImgUrl;
        }
    };
    SettingsService.prototype.getUser = function () {
        var _this = this;
        if (this.user) {
            //return this.user;
            return __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["a" /* Observable */].of(this.user);
        }
        if (this.openId) {
            return this.wechatUserService.GetWeChatUserAsync(this.openId, this.tenantId).map(function (data) {
                _this.setUser(data);
                return _this.user;
            });
        }
        return __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["a" /* Observable */].of(null);
    };
    SettingsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__personal_center_wechat_user_service__["a" /* WechatUserService */]])
    ], SettingsService);
    return SettingsService;
}());



/***/ }),

/***/ "./src/app/services/httpclient.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SwaggerException */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_fromPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/fromPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_mergeMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__AppConsts__ = __webpack_require__("./src/app/services/AppConsts.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var SwaggerException = /** @class */ (function (_super) {
    __extends(SwaggerException, _super);
    function SwaggerException(message, status, response, headers, result) {
        var _this = _super.call(this) || this;
        _this.isSwaggerException = true;
        _this.message = message;
        _this.status = status;
        _this.response = response;
        _this.headers = headers;
        _this.result = result;
        return _this;
    }
    SwaggerException.isSwaggerException = function (obj) {
        return obj.isSwaggerException === true;
    };
    return SwaggerException;
}(Error));

function throwException(message, status, response, headers, result) {
    if (result !== null && result !== undefined)
        return __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__["a" /* Observable */].throw(result);
    else
        return __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__["a" /* Observable */].throw(new SwaggerException(message, status, response, headers, null));
}
var HttpClient = /** @class */ (function () {
    function HttpClient(http) {
        this.http = http;
        this.jsonParseReviver = undefined;
        this.baseHost = __WEBPACK_IMPORTED_MODULE_11__AppConsts__["a" /* AppConsts */].remoteServiceBaseUrl;
    }
    HttpClient.prototype.get = function (url, params, showLoading) {
        url = this.baseHost + url;
        return this.request(url + this._formatUrl(params), __WEBPACK_IMPORTED_MODULE_8__angular_http__["f" /* RequestMethod */].Get, null, showLoading);
    };
    HttpClient.prototype.post = function (url, body, params, showLoading) {
        url = this.baseHost + url;
        if (params) {
            url += this._formatUrl(params);
        }
        return this.request(url, __WEBPACK_IMPORTED_MODULE_8__angular_http__["f" /* RequestMethod */].Post, body, showLoading);
    };
    HttpClient.prototype.request = function (url, method, body, showLoading) {
        //let headers = new Headers();
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* Headers */]({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        var options = new __WEBPACK_IMPORTED_MODULE_8__angular_http__["g" /* RequestOptions */]();
        options.headers = headers;
        options.url = url;
        options.method = method;
        if (body) {
            var content_ = JSON.stringify(body);
            options.body = content_;
        }
        //options.withCredentials = true;
        var request = new __WEBPACK_IMPORTED_MODULE_8__angular_http__["e" /* Request */](options);
        if (showLoading !== false) {
        }
        return this.http.request(request).flatMap(function (response_) {
            return _this.process(response_);
        }).catch(function (x) { return _this.handleError(x); });
    };
    /**
     * 将字典转为QueryString
     */
    HttpClient.prototype._formatUrl = function (params) {
        if (!params)
            return '';
        var fegment = [];
        for (var k in params) {
            var v = params[k];
            if (v instanceof Date) {
                v = __WEBPACK_IMPORTED_MODULE_10_moment__(v).format('YYYY-MM-DD HH:mm:SS');
            }
            fegment.push(k + "=" + v);
        }
        return '?' + fegment.join('&');
    };
    /**
    * 通用异常处理
    */
    HttpClient.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_8__angular_http__["h" /* Response */]) {
            var body_1 = error.json() || '';
            var err = body_1.error || JSON.stringify(body_1);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error ? error.toString() : '服务器发生异常，请稍后再试';
        }
        return __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__["a" /* Observable */].throw(errMsg);
    };
    HttpClient.prototype.process = function (response) {
        var status = response.status;
        var _headers = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            var _responseText = response.text();
            var result200 = null;
            var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? resultData200 : __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__["a" /* Observable */].of(null);
            return __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__["a" /* Observable */].of(result200);
        }
        else if (status === 401) {
            var _responseText = response.text();
            return throwException("发生服务器错误.", status, _responseText, _headers);
        }
        else if (status === 403) {
            var _responseText = response.text();
            return throwException("发生服务器错误.", status, _responseText, _headers);
        }
        else if (status !== 200 && status !== 204) {
            var _responseText = response.text();
            return throwException("发生了意外的服务器错误.", status, _responseText, _headers);
        }
        return __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__["a" /* Observable */].of(null);
    };
    HttpClient = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* Http */]])
    ], HttpClient);
    return HttpClient;
}());



/***/ }),

/***/ "./src/app/services/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__personal_center_wechat_user_service__ = __webpack_require__("./src/app/services/personal-center/wechat-user.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__personal_center_wechat_user_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AppConsts__ = __webpack_require__("./src/app/services/AppConsts.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__AppConsts__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_settings_service__ = __webpack_require__("./src/app/services/common/settings.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__common_settings_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__personal_center_shop_service__ = __webpack_require__("./src/app/services/personal-center/shop.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__personal_center_shop_service__["a"]; });






/***/ }),

/***/ "./src/app/services/model/api.result.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiResult; });
var ApiResult = /** @class */ (function () {
    function ApiResult() {
    }
    return ApiResult;
}());



/***/ }),

/***/ "./src/app/services/model/ientity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BaseEntity */
var BaseEntity = /** @class */ (function () {
    function BaseEntity() {
    }
    return BaseEntity;
}());



/***/ }),

/***/ "./src/app/services/model/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_result__ = __webpack_require__("./src/app/services/model/api.result.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__api_result__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ientity__ = __webpack_require__("./src/app/services/model/ientity.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wechat_user__ = __webpack_require__("./src/app/services/model/wechat-user.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__wechat_user__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__wechat_user__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shop__ = __webpack_require__("./src/app/services/model/shop.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__shop__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shop_product__ = __webpack_require__("./src/app/services/model/shop-product.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__shop_product__["a"]; });







/***/ }),

/***/ "./src/app/services/model/shop-product.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShopProduct; });
var ShopProduct = /** @class */ (function () {
    function ShopProduct(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ShopProduct.prototype.init = function (data) {
        if (data) {
            this.id = data["id"];
            this.specification = data["specification"];
            this.type = data["type"];
            this.price = data["price"];
            this.isRare = data["isRare"];
            this.packageCode = data["packageCode"];
            this.barCode = data["barCode"];
            this.searchCount = data["searchCount"];
            this.isAction = data["isAction"];
            this.creationTime = data["creationTime"];
            this.tenantId = data["tenantId"];
            this.creatorUserId = data["creatorUserId"];
            this.photoUrl = data["photoUrl"];
            this.typeName = data["typeName"];
            this.shopId = data["shopId"];
            this.productId = data["productId"];
        }
    };
    ShopProduct.fromJS = function (data) {
        var result = new ShopProduct();
        result.init(data);
        return result;
    };
    ShopProduct.fromJSArray = function (dataArray) {
        var array = [];
        dataArray.forEach(function (result) {
            var item = new ShopProduct();
            item.init(result);
            array.push(item);
        });
        return array;
    };
    ShopProduct.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["specification"] = this.specification;
        data["type"] = this.type;
        data["price"] = this.price;
        data["isRare"] = this.isRare;
        data["packageCode"] = this.packageCode;
        data["barCode"] = this.barCode;
        data["searchCount"] = this.searchCount;
        data["isAction"] = this.isAction;
        data["creationTime"] = this.creationTime;
        data["tenantId"] = this.tenantId;
        data["creatorUserId"] = this.creatorUserId;
        data["photoUrl"] = this.photoUrl;
        data["typeName"] = this.typeName;
        data["shopId"] = this.shopId;
        data["productId"] = this.productId;
        return data;
    };
    ShopProduct.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ShopProduct();
        result.init(json);
        return result;
    };
    return ShopProduct;
}());



/***/ }),

/***/ "./src/app/services/model/shop.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Shop; });
var Shop = /** @class */ (function () {
    function Shop(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    Shop.prototype.init = function (data) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.address = data["address"];
            this.desc = data["desc"];
            this.retailerId = data["retailerId"];
            this.coverPhoto = data["coverPhoto"];
            this.saleTotal = data["saleTotal"];
            this.readTotal = data["readTotal"];
            this.evaluation = data["evaluation"];
            this.longitude = data["longitude"];
            this.latitude = data["latitude"];
            this.status = data["status"];
            this.auditTime = data["auditTime"];
            this.creationTime = data["creationTime"];
            this.tenantId = data["tenantId"];
            this.tel = data["tel"];
        }
    };
    Shop.fromJS = function (data) {
        var result = new Shop();
        result.init(data);
        return result;
    };
    Shop.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["address"] = this.address;
        data["desc"] = this.desc;
        data["retailerId"] = this.retailerId;
        data["coverPhoto"] = this.coverPhoto;
        data["saleTotal"] = this.saleTotal;
        data["readTotal"] = this.readTotal;
        data["evaluation"] = this.evaluation;
        data["longitude"] = this.longitude;
        data["latitude"] = this.latitude;
        data["status"] = this.status;
        data["auditTime"] = this.auditTime;
        data["creationTime"] = this.creationTime;
        data["tenantId"] = this.tenantId;
        data["tel"] = this.tel;
        return data;
    };
    Shop.prototype.clone = function () {
        var json = this.toJSON();
        var result = new Shop();
        result.init(json);
        return result;
    };
    return Shop;
}());



/***/ }),

/***/ "./src/app/services/model/wechat-user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WechatUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserType; });
var WechatUser = /** @class */ (function () {
    function WechatUser(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    WechatUser.prototype.init = function (data) {
        if (data) {
            this.id = data["id"];
            this.nickName = data["nickName"];
            this.openId = data["openId"];
            this.userType = data["userType"];
            this.userId = data["userId"];
            this.userName = data["userName"];
            this.bindStatus = data["bindStatus"];
            this.bindTime = data["bindTime"];
            this.tenantId = data["tenantId"];
            this.unBindTime = data["unBindTime"];
            this.userTypeName = data["userTypeName"];
            this.bindStatusName = data["bindStatusName"];
            this.headImgUrl = data["headImgUrl"];
            this.phone = data["phone"];
            this.memberBarCode = data["memberBarCode"];
            this.integralTotal = data["integralTotal"];
            this.isShopkeeper = data["isShopkeeper"];
            this.status = data["status"];
        }
    };
    WechatUser.fromJS = function (data) {
        var result = new WechatUser();
        result.init(data);
        return result;
    };
    WechatUser.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["nickName"] = this.nickName;
        data["openId"] = this.openId;
        data["userType"] = this.userType;
        data["userId"] = this.userId;
        data["userName"] = this.userName;
        data["bindStatus"] = this.bindStatus;
        data["bindTime"] = this.bindTime;
        data["tenantId"] = this.tenantId;
        data["unBindTime"] = this.unBindTime;
        data["headImgUrl"] = this.headImgUrl;
        data["phone"] = this.phone;
        data["memberBarCode"] = this.memberBarCode;
        data["integralTotal"] = this.integralTotal;
        data["isShopkeeper"] = this.isShopkeeper;
        data["status"] = this.status;
        return data;
    };
    WechatUser.prototype.clone = function () {
        var json = this.toJSON();
        var result = new WechatUser();
        result.init(json);
        return result;
    };
    return WechatUser;
}());

var UserType;
(function (UserType) {
    UserType[UserType["Retailer"] = 1] = "Retailer";
    UserType[UserType["Staff"] = 2] = "Staff";
    UserType[UserType["Consumer"] = 4] = "Consumer";
})(UserType || (UserType = {}));


/***/ }),

/***/ "./src/app/services/personal-center/shop.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShopService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_fromPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/fromPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_mergeMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__httpclient__ = __webpack_require__("./src/app/services/httpclient.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_index__ = __webpack_require__("./src/app/services/model/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ShopService = /** @class */ (function () {
    function ShopService(http) {
        this.http = http;
    }
    ShopService.prototype.WechatCreateOrUpdateShop = function (params) {
        return this.http.post('/api/services/app/Shop/WechatCreateOrUpdateShop', params).map(function (data) {
            return data.success;
        });
    };
    ShopService.prototype.GetShopByOpenId = function (params) {
        return this.http.get('/api/services/app/Shop/GetShopByOpenId', params).map(function (data) {
            if (data.result) {
                var rel = __WEBPACK_IMPORTED_MODULE_9__model_index__["b" /* Shop */].fromJS(data.result);
                rel.evaluationArry = rel.evaluation.split(',');
                return rel;
            }
            else {
                return null;
            }
        });
    };
    ShopService.prototype.GetShopProductsByShopId = function (params) {
        return this.http.get('/api/services/app/ShopProduct/GetShopProductsByShopId', params).map(function (data) {
            if (data.result) {
                var rel = __WEBPACK_IMPORTED_MODULE_9__model_index__["c" /* ShopProduct */].fromJSArray(data.result);
                return rel;
            }
            else {
                return null;
            }
        });
    };
    ShopService.prototype.GetRareProduct = function (params) {
        return this.http.get('/api/services/app/Product/GetRareProduct', params).map(function (data) {
            if (data.result) {
                return data.result;
            }
            else {
                return null;
            }
        });
    };
    ShopService.prototype.SaveShopProducts = function (params) {
        return this.http.post('/api/services/app/ShopProduct/SaveShopProducts', params).map(function (data) {
            return data.result;
        });
    };
    ShopService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__httpclient__["a" /* HttpClient */]])
    ], ShopService);
    return ShopService;
}());



/***/ }),

/***/ "./src/app/services/personal-center/wechat-user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WechatUserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_fromPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/fromPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_mergeMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__httpclient__ = __webpack_require__("./src/app/services/httpclient.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_index__ = __webpack_require__("./src/app/services/model/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var WechatUserService = /** @class */ (function () {
    function WechatUserService(http) {
        this.http = http;
    }
    WechatUserService.prototype.GetWeChatUserAsync = function (oId, tId) {
        var param = {};
        param.openId = oId;
        if (tId) {
            param.tenantId = tId;
        }
        return this.http.get('/api/services/app/WeChatUser/GetWeChatUserAsync', param).map(function (data) {
            return __WEBPACK_IMPORTED_MODULE_9__model_index__["e" /* WechatUser */].fromJS(data.result);
        });
    };
    WechatUserService.prototype.BindMemberAsync = function (params) {
        return this.http.post('/api/services/app/WeChatUser/BindMemberAsync', params).map(function (data) {
            var result = new __WEBPACK_IMPORTED_MODULE_9__model_index__["a" /* ApiResult */]();
            result.code = data.result.code;
            result.msg = data.result.msg;
            result.data = __WEBPACK_IMPORTED_MODULE_9__model_index__["e" /* WechatUser */].fromJS(data.result.data);
            return result;
        });
    };
    WechatUserService.prototype.BindWeChatUserAsync = function (params) {
        return this.http.post('/api/services/app/WeChatUser/BindWeChatUserAsync', params).map(function (data) {
            var result = new __WEBPACK_IMPORTED_MODULE_9__model_index__["a" /* ApiResult */]();
            result.code = data.result.code;
            result.msg = data.result.msg;
            result.data = __WEBPACK_IMPORTED_MODULE_9__model_index__["e" /* WechatUser */].fromJS(data.result.data);
            return result;
        });
    };
    WechatUserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__httpclient__["a" /* HttpClient */]])
    ], WechatUserService);
    return WechatUserService;
}());



/***/ }),

/***/ "./src/app/services/service.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__httpclient__ = __webpack_require__("./src/app/services/httpclient.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__("./src/app/services/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ServiceModule = /** @class */ (function () {
    function ServiceModule() {
    }
    ServiceModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__httpclient__["a" /* HttpClient */],
                __WEBPACK_IMPORTED_MODULE_2__index__["d" /* WechatUserService */],
                __WEBPACK_IMPORTED_MODULE_2__index__["b" /* SettingsService */],
                __WEBPACK_IMPORTED_MODULE_2__index__["c" /* ShopService */]
            ]
        })
    ], ServiceModule);
    return ServiceModule;
}());



/***/ }),

/***/ "./src/app/shared/docs-nav/docs-nav.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"navMenu\">\r\n    <weui-searchbar (search)=\"onSearch($event)\"></weui-searchbar>\r\n    <div class=\"menuItems\">\r\n        <div class=\"weui-cells__title\">{{navList.length}} items</div>\r\n        <div class=\"weui-cells\">\r\n            <a class=\"weui-cell weui-cell_link weui_cell\"\r\n                *ngFor=\"let item of navList\"\r\n                [routerLink]=\"['/' + type, item.id || item.name.toLowerCase() ]\"\r\n                routerLinkActive=\"active\">\r\n                <div class=\"weui-cell__hd\" *ngIf=\"item.icon\">\r\n                    <img src=\"{{item.icon}}\" alt=\"{{item.name}}\" class=\"navMenu--icon\">\r\n                </div>\r\n                <div class=\"weui-cell__bd\"></div>\r\n                <div class=\"weui-cell__ft\">{{item.name}}</div>\r\n            </a>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/shared/docs-nav/docs-nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocsNavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__("./node_modules/rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_menu_service__ = __webpack_require__("./src/app/core/menu.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DocsNavComponent = /** @class */ (function () {
    function DocsNavComponent(router, menuService) {
        this.router = router;
        this.menuService = menuService;
        this.type = '';
    }
    DocsNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["c" /* filter */])(function (e) { return e instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]; }))
            .subscribe(function (e) {
            _this.updateData();
            window.scrollTo(0, 0);
        });
        this.updateData();
    };
    DocsNavComponent.prototype.updateData = function () {
        var arr = this.router.url.split('/').filter(function (w) { return !!w; });
        if (arr.length === 0 || arr[0] === this.type)
            return;
        this.type = arr[0];
        this._data = this.menuService.getItems(this.type);
        this.onSearch('');
    };
    DocsNavComponent.prototype.onSearch = function (term) {
        term = term.toLowerCase();
        this.navList = this._data.filter(function (w) { return ~w.name.toLowerCase().indexOf(term); });
    };
    DocsNavComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'docs-nav',
            template: __webpack_require__("./src/app/shared/docs-nav/docs-nav.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__core_menu_service__["a" /* MenuService */]])
    ], DocsNavComponent);
    return DocsNavComponent;
}());



/***/ }),

/***/ "./src/app/shared/edit-button/edit-button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EditButtonComponent = /** @class */ (function () {
    function EditButtonComponent() {
    }
    Object.defineProperty(EditButtonComponent.prototype, "item", {
        set: function (data) {
            this._full = "https://github.com/cipchk/ngx-weui/edit/master" + data.path;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], EditButtonComponent.prototype, "item", null);
    EditButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'edit-button',
            template: "\n    <a href=\"{{_full}}\" title=\"\u5728Github\u4E0A\u7F16\u8F91\u6B64\u9875\" target=\"_blank\" class=\"edit-button\">\n        <i class=\"fa fa-edit\"></i>\n    </a>\n    "
        })
    ], EditButtonComponent);
    return EditButtonComponent;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_weui__ = __webpack_require__("./components/ngx-weui.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular_qq_maps__ = __webpack_require__("./node_modules/angular-qq-maps/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_gesture_password__ = __webpack_require__("./node_modules/ngx-gesture-password/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_notify__ = __webpack_require__("./node_modules/ngx-notify/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_countdown__ = __webpack_require__("./node_modules/ngx-countdown/bundles/ngx-countdown.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_countdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ngx_countdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__docs_nav_docs_nav_component__ = __webpack_require__("./src/app/shared/docs-nav/docs-nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__edit_button_edit_button_component__ = __webpack_require__("./src/app/shared/edit-button/edit-button.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var COMPONENTS = [__WEBPACK_IMPORTED_MODULE_9__docs_nav_docs_nav_component__["a" /* DocsNavComponent */], __WEBPACK_IMPORTED_MODULE_10__edit_button_edit_button_component__["a" /* EditButtonComponent */]];
var THIDS = [
    __WEBPACK_IMPORTED_MODULE_8_ngx_countdown__["CountdownModule"],
    __WEBPACK_IMPORTED_MODULE_7_ngx_notify__["a" /* NotifyModule */],
    __WEBPACK_IMPORTED_MODULE_6_ngx_gesture_password__["a" /* GesturePasswordModule */],
    __WEBPACK_IMPORTED_MODULE_5_angular_qq_maps__["a" /* AqmModule */]
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["e" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4_ngx_weui__["b" /* WeUiModule */]
            ].concat(THIDS),
            declarations: COMPONENTS,
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["e" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4_ngx_weui__["b" /* WeUiModule */]
            ].concat(THIDS, COMPONENTS)
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/wechat/components/components.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_page_component__ = __webpack_require__("./src/app/wechat/components/page/page.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var COMPONENTS = [__WEBPACK_IMPORTED_MODULE_2__page_page_component__["a" /* PageComponent */]];
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */]
            ],
            declarations: COMPONENTS,
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__page_page_component__["a" /* PageComponent */]
            ],
            exports: COMPONENTS
        })
    ], ComponentsModule);
    return ComponentsModule;
}());



/***/ }),

/***/ "./src/app/wechat/components/page/page.component.scss":
/***/ (function(module, exports) {

module.exports = "html,\nbody {\n  height: 100%;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif; }\n\nul {\n  list-style: none; }\n\nbody,\n.page {\n  background-color: #F8F8F8; }\n\n.link {\n  color: #1aad19; }\n\n.container {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow: hidden; }\n\n.page {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  z-index: 1; }\n\n.page__hd {\n  padding: 40px; }\n\n.page__bd_spacing {\n  padding: 0 15px; }\n\n.page__ft {\n  padding-top: 40px;\n  padding-bottom: 10px;\n  text-align: center; }\n\n.page__ft img {\n    height: 19px; }\n\n.page__ft.j_bottom {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n\n.page__title {\n  text-align: left;\n  font-size: 20px;\n  font-weight: 400; }\n\n.page__desc {\n  margin-top: 5px;\n  color: #888888;\n  text-align: left;\n  font-size: 14px; }\n\n.page-enter {\n  z-index: 1024;\n  opacity: 0.01;\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n  -webkit-transition: all .2s ease;\n  transition: all .2s ease; }\n\n.page-enter.page-enter-active {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n\n.page-leave {\n  opacity: 1;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  -webkit-transition: all .2s ease;\n  transition: all .2s ease; }\n\n.page-leave.page-leave-active {\n    opacity: 0.01;\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n\n.page.article,\n.page.loadmore,\n.page.actionsheet,\n.page.dialog,\n.page.msg_warn,\n.page.msg_success,\n.page.msg,\n.page.toast,\n.page.toptips,\n.page.popup {\n  background-color: #fff; }\n\n.page.infinite {\n  position: relative; }\n\n.page.flex .placeholder {\n  background-color: #EBEBEB;\n  height: 2.3em;\n  line-height: 2.3em;\n  text-align: center;\n  margin: 5px;\n  color: #CFCFCF; }\n\n.page.icons {\n  text-align: center; }\n\n.page.icons .page__bd {\n    /*padding: 0 40px;*/\n    text-align: left; }\n\n.page.icons .icon-box {\n    margin-bottom: 25px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n\n.page.icons .icon-box i {\n      margin-right: 18px; }\n\n.page.icons .icon-box__ctn {\n    -ms-flex-negative: 100;\n        flex-shrink: 100; }\n\n.page.icons .icon-box__title {\n    font-weight: normal; }\n\n.page.icons .icon-box__desc {\n    margin-top: 6px;\n    font-size: 12px;\n    color: #888888; }\n\n.page.icons .icon_sp_area {\n    margin-top: 10px;\n    text-align: left; }\n\n.page.icons .icon_sp_area i:before {\n      margin-bottom: 5px; }\n"

/***/ }),

/***/ "./src/app/wechat/components/page/page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageComponent = /** @class */ (function () {
    function PageComponent() {
        this.spacing = true;
        this.ftBottom = false;
        this.noBottom = false;
        this.showTitle = true;
        this.showBindStaff = false;
        this.showBack = false;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PageComponent.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PageComponent.prototype, "subTitle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PageComponent.prototype, "spacing", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PageComponent.prototype, "ftBottom", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PageComponent.prototype, "noBottom", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PageComponent.prototype, "showTitle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PageComponent.prototype, "showBindStaff", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PageComponent.prototype, "showBack", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PageComponent.prototype, "backUrl", void 0);
    PageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'Page',
            template: "\n    <div class=\"page__hd\" *ngIf=\"showTitle\" >\n        <h1 class=\"page__title\" [innerHTML]=\"title\"></h1>\n        <p class=\"page__desc\" [innerHTML]=\"subTitle\"></p>\n    </div>\n    <div class=\"weui-cells\" *ngIf=\"showBack\" style=\"margin-top:0px;\">\n    <div class=\"weui-cell\">\n        <div class=\"weui-cell__hd\">\n        <i class=\"iconfont icon-left\"></i>\n        </div>\n        <div class=\"weui-cell__bd\">\n        <a [routerLink]=\"backUrl\" style=\"color:#353535;text-decoration:none; \" > {{title}}</a>\n        </div>\n    </div>\n    </div>\n    <div class=\"page__bd\" [ngClass]=\"{'page__bd_spacing': spacing}\"><ng-content></ng-content></div>\n    <div class=\"page__ft\" *ngIf=\"!noBottom\">\n    <div class=\"weui-footer\">\n        <p class=\"weui-footer__links\" *ngIf=\"showBindStaff\">\n        <a [routerLink]=\"['/center/bind-staff']\" class=\"weui-footer__link\">\u5458\u5DE5\u7ED1\u5B9A</a>\n        </p>\n        <p class=\"weui-footer__text\">\u5E7F\u5B89\u70DF\u8349 | \u6E20\u6C5F\u70DF\u8BED</p>\n    </div>\n        <ng-content select=\"[footer]\"></ng-content>\n    </div>\n    ",
            host: {
                'class': 'page'
            },
            styles: [__webpack_require__("./src/app/wechat/components/page/page.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        })
    ], PageComponent);
    return PageComponent;
}());



/***/ }),

/***/ "./src/app/wechat/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'grid'\" [title]=\"'Grid'\" [subTitle]=\"'主页'\" [spacing]=\"false\" [ftBottom]=\"true\">\r\n\r\n    <div class=\"weui-grids\">\r\n        <a [routerLink]=\"['/activities/activity']\" class=\"weui-grid\">\r\n            <div class=\"weui-grid__icon\">\r\n                <img src=\"./assets/images/icon_tabbar.png\" alt=\"\">\r\n            </div>\r\n            <p class=\"weui-grid__label\">营销活动</p>\r\n        </a>\r\n        <a href=\"javascript:;\" class=\"weui-grid\">\r\n            <div class=\"weui-grid__icon\">\r\n                <img src=\"./assets/images/icon_tabbar.png\" alt=\"\">\r\n            </div>\r\n            <p class=\"weui-grid__label\">Grid</p>\r\n        </a>\r\n        <a href=\"javascript:;\" class=\"weui-grid\">\r\n            <div class=\"weui-grid__icon\">\r\n                <img src=\"./assets/images/icon_tabbar.png\" alt=\"\">\r\n            </div>\r\n            <p class=\"weui-grid__label\">Grid</p>\r\n        </a>\r\n        <a [routerLink]=\"['/buy/nearby-shop']\" class=\"weui-grid\">\r\n            <div class=\"weui-grid__icon\">\r\n                <img src=\"./assets/images/icon_tabbar.png\" alt=\"\">\r\n            </div>\r\n            <p class=\"weui-grid__label\">附近店铺</p>\r\n        </a>\r\n        <a href=\"javascript:;\" class=\"weui-grid\">\r\n            <div class=\"weui-grid__icon\">\r\n                <img src=\"./assets/images/icon_tabbar.png\" alt=\"\">\r\n            </div>\r\n            <p class=\"weui-grid__label\">Grid</p>\r\n        </a>\r\n        <a href=\"javascript:;\" class=\"weui-grid\">\r\n            <div class=\"weui-grid__icon\">\r\n                <img src=\"./assets/images/icon_tabbar.png\" alt=\"\">\r\n            </div>\r\n            <p class=\"weui-grid__label\">Grid</p>\r\n        </a>\r\n        <a [routerLink]=\"['/center/personal']\" class=\"weui-grid\">\r\n            <div class=\"weui-grid__icon\">\r\n                <img src=\"./assets/images/icon_tabbar.png\" alt=\"\">\r\n            </div>\r\n            <p class=\"weui-grid__label\">个人中心</p>\r\n        </a>\r\n        <a [routerLink]=\"['/center/member-card']\" class=\"weui-grid\">\r\n            <div class=\"weui-grid__icon\">\r\n                <img src=\"./assets/images/icon_tabbar.png\" alt=\"\">\r\n            </div>\r\n            <p class=\"weui-grid__label\">会员卡</p>\r\n        </a>\r\n        <a [routerLink]=\"['/center/shop']\" class=\"weui-grid\">\r\n            <div class=\"weui-grid__icon\">\r\n                <img src=\"./assets/images/icon_tabbar.png\" alt=\"\">\r\n            </div>\r\n            <p class=\"weui-grid__label\">我的店铺</p>\r\n        </a>\r\n    </div>\r\n</Page>\r\n"

/***/ }),

/***/ "./src/app/wechat/home/home.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wechat/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-home',
            template: __webpack_require__("./src/app/wechat/home/home.component.html"),
            styles: [__webpack_require__("./src/app/wechat/home/home.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        })
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/wechat/wechat.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WechatModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wechat_components_components_module__ = __webpack_require__("./src/app/wechat/components/components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home_component__ = __webpack_require__("./src/app/wechat/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wechat_route__ = __webpack_require__("./src/app/wechat/wechat.route.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var WechatModule = /** @class */ (function () {
    function WechatModule() {
    }
    WechatModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_3__wechat_components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__wechat_route__["a" /* routes */], { useHash: true })
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__home_home_component__["a" /* HomeComponent */]
            ],
            providers: [],
            entryComponents: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */]
            ]
        })
    ], WechatModule);
    return WechatModule;
}());



/***/ }),

/***/ "./src/app/wechat/wechat.route.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home_component__ = __webpack_require__("./src/app/wechat/home/home.component.ts");

var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_0__home_home_component__["a" /* HomeComponent */] },
    { path: 'activities', loadChildren: './activities/activities.module#ActivitiesModule' },
    { path: 'buy', loadChildren: './buy/buy.module#BuyModule' },
    { path: 'center', loadChildren: './personal-center/personal-center.module#PersonalCenterModule' },
    // Not found
    { path: '**', redirectTo: '' }
];


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__("./src/polyfills.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_core_preloader__ = __webpack_require__("./src/app/core/preloader.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_core_preloader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__app_core_preloader__);






if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]).then(function () {
    if (window.appBootstrap) {
        window.appBootstrap();
    }
});


/***/ }),

/***/ "./src/polyfills.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es7_reflect__ = __webpack_require__("./node_modules/core-js/es7/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_zone_js_dist_zone__ = __webpack_require__("./node_modules/zone.js/dist/zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_zone_js_dist_zone__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following for the Reflect API. */
// import 'core-js/es6/reflect';
/** Evergreen browsers require these. **/
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.

/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.
/**
 * Need to import at least one locale-data with intl.
 */
// import 'intl/locale-data/jsonp/en';


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map