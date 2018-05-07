webpackJsonp(["activities.module"],{

/***/ "./src/app/wechat/activities/activities.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivitiesModule", function() { return ActivitiesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_split__ = __webpack_require__("./node_modules/angular-split/esm5/angular-split.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activity_activity_component__ = __webpack_require__("./src/app/wechat/activities/activity/activity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__("./src/app/wechat/components/components.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// region: components
var COMPONENTS = [__WEBPACK_IMPORTED_MODULE_3__activity_activity_component__["a" /* ActivityComponent */]];
var routes = [
    { path: '', redirectTo: 'activity' },
    { path: 'activity', component: __WEBPACK_IMPORTED_MODULE_3__activity_activity_component__["a" /* ActivityComponent */] },
];
// endregion
var ActivitiesModule = /** @class */ (function () {
    function ActivitiesModule() {
    }
    ActivitiesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_2_angular_split__["a" /* AngularSplitModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forChild(routes)
            ],
            declarations: COMPONENTS.slice()
        })
    ], ActivitiesModule);
    return ActivitiesModule;
}());



/***/ }),

/***/ "./src/app/wechat/activities/activity/activity.component.html":
/***/ (function(module, exports) {

module.exports = " <Page [ngClass]=\"'swiper'\" [title]=\"'Swiper'\" [subTitle]=\"'触摸滑动'\" [spacing]=\"false\"> \r\n\r\n    <p>log: {{log}}</p>\r\n    <!-- options等同于：Swiper API（@see: http://www.swiper.com.cn/api/index.html） -->\r\n    <weui-swiper [options]=\"options\">\r\n        <div class=\"swiper-container\">\r\n            <!-- 容器（必选） -->\r\n            <div class=\"swiper-wrapper\">\r\n                <div class=\"swiper-slide\" *ngFor=\"let i of [1, 2, 3, 4]\">\r\n                    Slide {{i}}\r\n                </div>\r\n            </div>\r\n            <!-- 分页（可选） -->\r\n            <div class=\"swiper-pagination\"></div>\r\n        </div>\r\n    </weui-swiper>\r\n    <p>渐变效果</p>\r\n    <weui-swiper [options]=\"{effect: 'fade', spaceBetween: 30, autoplay: 2000}\">\r\n        <div class=\"swiper-container\">\r\n            <!-- 容器（必选） -->\r\n            <div class=\"swiper-wrapper\">\r\n                <div class=\"swiper-slide\" *ngFor=\"let i of images\">\r\n                    <img src=\"{{i.url}}\">\r\n                </div>\r\n            </div>\r\n            <!-- 分页（可选） -->\r\n            <div class=\"swiper-pagination\"></div>\r\n        </div>\r\n    </weui-swiper>\r\n\r\n </Page>"

/***/ }),

/***/ "./src/app/wechat/activities/activity/activity.component.scss":
/***/ (function(module, exports) {

module.exports = ".swiper-slide {\n  width: 100%;\n  height: 200px;\n  line-height: 200px;\n  text-align: center;\n  background: #93FF93; }\n"

/***/ }),

/***/ "./src/app/wechat/activities/activity/activity.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ActivityComponent = /** @class */ (function () {
    function ActivityComponent() {
        var _this = this;
        this.log = '';
        this.options = {
            onInit: function () {
                setTimeout(function () { _this.log = '初始化完成'; });
            },
            onSlideChangeEnd: function (swiper) {
                setTimeout(function () { _this.log = "\u79FB\u52A8\u81F3\u7B2C " + (swiper.realIndex + 1) + " \u5F20"; });
            }
        };
        this.images = [
            { url: './assets/images/swiper-1.png', title: '标题1' },
            { url: './assets/images/swiper-2.png', title: '标题2' },
            { url: './assets/images/swiper-3.png', title: '标题3' }
        ];
    }
    ActivityComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity',
            template: __webpack_require__("./src/app/wechat/activities/activity/activity.component.html"),
            styles: [__webpack_require__("./src/app/wechat/activities/activity/activity.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        })
    ], ActivityComponent);
    return ActivityComponent;
}());



/***/ })

});
//# sourceMappingURL=activities.module.chunk.js.map