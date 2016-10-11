import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HomeComponent } from './home/home.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './account/login/login.component';
import { FormsModule }    from '@angular/forms';
import {Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers,HttpModule} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AuthenticationService} from './account/login/login.service';
import appRoutes from './app.router';
import {ROUTER_PROVIDERS, Router} from '@angular/router';

class HttpInterceptor extends Http {
 
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router) {
        super(backend, defaultOptions);
    }
 
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }
 
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url,options));
    }
 
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {   
        return super.post(url, body);
    }
 
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }
 
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));
    }
    
    getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    }
 
    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status  == 401 && !_.endsWith(err.url, 'api/auth/login')) {
                
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
 
    }
}

@NgModule({
  imports: [BrowserModule, appRoutes, FormsModule,
    HttpModule],
  declarations: [AppComponent, HomeComponent, AboutComponent, LoginComponent],
  bootstrap: [AppComponent
  ],
  providers: [
    AuthenticationService,
    {provide:LocationStrategy, useClass: HashLocationStrategy },
    {
		provide: Http,
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
        deps: [XHRBackend, RequestOptions, Router]
    }

  ]
  
})

export class AppModule { }

