webpackJsonp(["buy.module"],{

/***/ "./src/app/wechat/buy/buy.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuyModule", function() { return BuyModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_split__ = __webpack_require__("./node_modules/angular-split/esm5/angular-split.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nearby_shop_nearby_shop_component__ = __webpack_require__("./src/app/wechat/buy/nearby-shop/nearby-shop.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__("./src/app/wechat/components/components.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// region: components
var COMPONENTS = [__WEBPACK_IMPORTED_MODULE_3__nearby_shop_nearby_shop_component__["a" /* NearbyShopComponent */]];
var routes = [
    { path: '', redirectTo: 'nearby-shop' },
    { path: 'nearby-shop', component: __WEBPACK_IMPORTED_MODULE_3__nearby_shop_nearby_shop_component__["a" /* NearbyShopComponent */] },
];
// endregion
var BuyModule = /** @class */ (function () {
    function BuyModule() {
    }
    BuyModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_2_angular_split__["a" /* AngularSplitModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forChild(routes)
            ],
            declarations: COMPONENTS.slice()
        })
    ], BuyModule);
    return BuyModule;
}());



/***/ }),

/***/ "./src/app/wechat/buy/nearby-shop/nearby-shop.component.html":
/***/ (function(module, exports) {

module.exports = "<Page [ngClass]=\"'badge'\" [title]=\"'Badge'\" [subTitle]=\"'徽章'\" [spacing]=\"false\" [ftBottom]=\"true\">\r\n\r\n    <div class=\"weui-cells__title\">新消息提示跟摘要信息后，统一在列表右侧</div>\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">单行列表</div>\r\n            <div class=\"weui-cell__ft\" style=\"font-size: 0\">\r\n                <span style=\"vertical-align:middle; font-size: 17px;\">详细信息</span>\r\n                <span class=\"weui-badge weui-badge_dot\" style=\"margin-left: 5px;margin-right: 5px;\"></span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"weui-cells__title\">未读数红点跟在主题信息后，统一在列表左侧</div>\r\n    <div class=\"weui-cells\">\r\n        <div class=\"weui-cell\">\r\n            <div class=\"weui-cell__hd\" style=\"position: relative;margin-right: 10px;\">\r\n                <img src=\"./assets/images/pic_160.png\" style=\"width: 50px;display: block\">\r\n                <span class=\"weui-badge\" style=\"position: absolute;top: -.4em;right: -.4em;\">8</span>\r\n            </div>\r\n            <div class=\"weui-cell__bd\">\r\n                <p>联系人名称</p>\r\n                <p style=\"font-size: 13px;color: #888888;\">摘要信息</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">单行列表</span>\r\n                <span class=\"weui-badge\" style=\"margin-left: 5px;\">8</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\"></div>\r\n        </div>\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">单行列表</span>\r\n                <span class=\"weui-badge\" style=\"margin-left: 5px;\">8</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\">详细信息</div>\r\n        </div>\r\n        <div class=\"weui-cell weui-cell_access\">\r\n            <div class=\"weui-cell__bd\">\r\n                <span style=\"vertical-align: middle\">单行列表</span>\r\n                <span class=\"weui-badge\" style=\"margin-left: 5px;\">New</span>\r\n            </div>\r\n            <div class=\"weui-cell__ft\"></div>\r\n        </div>\r\n    </div>\r\n</Page>\r\n"

/***/ }),

/***/ "./src/app/wechat/buy/nearby-shop/nearby-shop.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/wechat/buy/nearby-shop/nearby-shop.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NearbyShopComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NearbyShopComponent = /** @class */ (function () {
    function NearbyShopComponent() {
    }
    NearbyShopComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wechat-nearby-shop',
            template: __webpack_require__("./src/app/wechat/buy/nearby-shop/nearby-shop.component.html"),
            styles: [__webpack_require__("./src/app/wechat/buy/nearby-shop/nearby-shop.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        })
    ], NearbyShopComponent);
    return NearbyShopComponent;
}());



/***/ })

});
//# sourceMappingURL=buy.module.chunk.js.map