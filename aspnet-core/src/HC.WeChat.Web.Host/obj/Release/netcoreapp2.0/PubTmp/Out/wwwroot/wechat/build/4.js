webpackJsonp([4],{

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_result__ = __webpack_require__(367);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(368);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__user__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__retailer__ = __webpack_require__(369);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__retailer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__employee__ = __webpack_require__(370);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__employee__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wechat__ = __webpack_require__(371);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__wechat__["a"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ApiResult */
var ApiResult = (function () {
    function ApiResult() {
    }
    return ApiResult;
}());

//# sourceMappingURL=api.result.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* unused harmony export UserTypeEnum */
var User = (function () {
    function User() {
    }
    return User;
}());

var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum[UserTypeEnum["Retailer"] = 1] = "Retailer";
    UserTypeEnum[UserTypeEnum["Manager"] = 2] = "Manager";
    UserTypeEnum[UserTypeEnum["Consumer"] = 3] = "Consumer";
})(UserTypeEnum || (UserTypeEnum = {}));
//# sourceMappingURL=user.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Retailer; });
var Retailer = (function () {
    function Retailer() {
    }
    return Retailer;
}());

//# sourceMappingURL=retailer.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Employee; });
var Employee = (function () {
    function Employee() {
    }
    return Employee;
}());

//# sourceMappingURL=employee.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeChat; });
var WeChat = (function () {
    function WeChat() {
    }
    return WeChat;
}());

//# sourceMappingURL=wechat.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeChatHomeModule", function() { return WeChatHomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wechat_home__ = __webpack_require__(448);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WeChatHomeModule = (function () {
    function WeChatHomeModule() {
    }
    return WeChatHomeModule;
}());
WeChatHomeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__wechat_home__["a" /* WechatHome */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__wechat_home__["a" /* WechatHome */]),
        ],
    })
], WeChatHomeModule);

//# sourceMappingURL=wechat-home.module.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponentBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__kl_model_index__ = __webpack_require__(324);


var AppComponentBase = (function () {
    function AppComponentBase(injector) {
        var platform = injector.get(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* Platform */]);
        this.weChat = new __WEBPACK_IMPORTED_MODULE_1__kl_model_index__["d" /* WeChat */]();
        this.weChat.Code = platform.getQueryParam('code');
        this.weChat.State = platform.getQueryParam('state');
    }
    return AppComponentBase;
}());

//# sourceMappingURL=app-component-base.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WechatHome; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component_base__ = __webpack_require__(439);
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



var WechatHome = (function (_super) {
    __extends(WechatHome, _super);
    function WechatHome(injector, navCtrl, navParams) {
        var _this = _super.call(this, injector) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        return _this;
        //alert(this.weChat.Code)
        //alert(this.weChat.State)
    }
    WechatHome.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WechatHome');
    };
    WechatHome.prototype.goUserBind = function () {
        console.log("goUserBind");
        this.navCtrl.push('user-bind');
    };
    WechatHome.prototype.goUser = function () {
        console.log("goUser");
        this.navCtrl.push('user');
    };
    return WechatHome;
}(__WEBPACK_IMPORTED_MODULE_2__app_component_base__["a" /* AppComponentBase */]));
WechatHome = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])({
        name: 'wechat-home'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'wechat-home-component',template:/*ion-inline-start:"D:\projects\hc\HCWeChat\ionic-wechat\src\pages\wechat\home\wechat-home.html"*/'<ion-header hideWhen="wechat">\n\n    <ion-navbar>\n\n        <ion-title>宜宾烟草</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content text-center class="icons-basic-page">\n\n    <h2>欢迎使用宜宾烟草!</h2>\n\n    <ion-row>\n\n        <ion-col>\n\n            <ion-icon name="md-person" color="primary" title="\'个人中心\'"></ion-icon>\n\n            <br/>个人中心</ion-col>\n\n        <ion-col>\n\n            <ion-icon name="md-person-add" color="primary" (click)="goUserBind()" title="\'用户绑定\'"></ion-icon>\n\n            <br/>用户绑定</ion-col>\n\n        <ion-col>\n\n            <ion-icon name="heart" color="danger" title="\'营销活动\'"></ion-icon>\n\n            <br/>营销活动</ion-col>\n\n        <ion-col>\n\n            <ion-icon name="ionitron" color="primary" title="\'活动申请\'"></ion-icon>\n\n            <br/>活动申请</ion-col>\n\n    </ion-row>\n\n</ion-content>'/*ion-inline-end:"D:\projects\hc\HCWeChat\ionic-wechat\src\pages\wechat\home\wechat-home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Injector */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], WechatHome);

//# sourceMappingURL=wechat-home.js.map

/***/ })

});
//# sourceMappingURL=4.js.map