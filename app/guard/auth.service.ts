import {
    Http, Headers, ConnectionBackend, Response,
    RequestOptionsArgs, RequestOptions, Request
} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export const JWT_RESPONSE_HEADER = 'X-Auth-Token';

@Injectable()
export class AuthHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const request = super.get(url, this.appendAuthHeader(options));
        request.map(this.saveToken);
        return this.interceptResponse(request);
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const request = super.post(url, body, this.appendAuthHeader(options));
        
        request.map(this.saveToken);
        return this.interceptResponse(request);
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const request = super.put(url, body, this.appendAuthHeader(options));
        request.map(this.saveToken);
        return this.interceptResponse(request);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const request = super.delete(url, this.appendAuthHeader(options));
        request.map(this.saveToken);
        return this.interceptResponse(request);
    }

    private appendAuthHeader(options?: RequestOptionsArgs): RequestOptionsArgs {
        console.log("TEST")
        let mergedOptions: RequestOptionsArgs;
        if (!options) {
            mergedOptions = {headers: new Headers()};
        } else {
            mergedOptions = options;
        }
        const token = localStorage.getItem(JWT_RESPONSE_HEADER);
        const isTokenSet = mergedOptions.headers.has('Authorization');
        if (token && !isTokenSet) mergedOptions.headers.append('Authorization', `Bearer ${token}`);
        return mergedOptions;
    }

    private saveToken(res: Response): void {
        const token = res.headers.get(JWT_RESPONSE_HEADER);
        if (token) localStorage.setItem(JWT_RESPONSE_HEADER, token);
    }

    interceptResponse(observable: Observable<any>): Observable<any> {
        return observable.catch((err) => {
            if (err.status === 401) {
                console.log('asdfsd');
                return Observable.create();
            } else {
                return Observable.throw(err);
            }
        });
    }
}