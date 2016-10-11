"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var app_component_1 = require('./app.component');
var home_component_1 = require('./home/home.component');
var about_component_1 = require('./about/about.component');
var login_component_1 = require('./account/login/login.component');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var login_service_1 = require('./account/login/login.service');
var app_router_1 = require('./app.router');
var router_1 = require('@angular/router');
var HttpInterceptor = (function (_super) {
    __extends(HttpInterceptor, _super);
    function HttpInterceptor(backend, defaultOptions, _router) {
        _super.call(this, backend, defaultOptions);
        this._router = _router;
    }
    HttpInterceptor.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, options));
    };
    HttpInterceptor.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, options));
    };
    HttpInterceptor.prototype.post = function (url, body, options) {
        return _super.prototype.post.call(this, url, body);
    };
    HttpInterceptor.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, options));
    };
    HttpInterceptor.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    };
    HttpInterceptor.prototype.intercept = function (observable) {
        return observable.catch(function (err, source) {
            if (err.status == 401 && !_.endsWith(err.url, 'api/auth/login')) {
                return Observable.empty();
            }
            else {
                return Observable.throw(err);
            }
        });
    };
    return HttpInterceptor;
}(http_1.Http));
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_router_1.default, forms_1.FormsModule,
                http_1.HttpModule],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, about_component_1.AboutComponent, login_component_1.LoginComponent],
            bootstrap: [app_component_1.AppComponent
            ],
            providers: [
                login_service_1.AuthenticationService,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                {
                    provide: http_1.Http,
                    useFactory: function (xhrBackend, requestOptions, router) { return new HttpInterceptor(xhrBackend, requestOptions, router); },
                    deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router]
                }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map