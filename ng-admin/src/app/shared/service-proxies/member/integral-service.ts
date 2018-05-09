import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Activity } from "@shared/service-proxies/entity/acitivity";
import { SwaggerException, API_BASE_URL } from "@shared/service-proxies/service-proxies";
import { Inject, Optional, Injectable, InjectionToken } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Headers, ResponseContentType, Response } from "@angular/http";
import { Parameter } from '@shared/service-proxies/entity';
import { IntegralDetails } from '@shared/entity/member';

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, headers, null));
}

export class IntegralServiceProxy {
    private http: Http;
    private baseUrl: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor(@Inject(Http) http: Http, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }
    getAll(skipCount: number, maxResultCount: number, parameter: Parameter[]): Observable<PagedResultDtoOfIntegralDetails> {
        let url_ = this.baseUrl + "/api/services/app/IntegralDetail/GetPagedIntegralDetails?";
        if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        if (parameter.length > 0) {
            parameter.forEach(element => {
                if (element.value !== undefined && element.value !== null) {
                    url_ += element.key + "=" + encodeURIComponent("" + element.value) + "&";
                }
            });
        }
        url_ = url_.replace(/[?&]$/, "");

        let options_ = {
            method: "get",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processGetAll(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processGetAll(response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfIntegralDetails>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultDtoOfIntegralDetails>><any>Observable.throw(response_);
        });
    }

    protected processGetAll(response: Response): Observable<PagedResultDtoOfIntegralDetails> {
        const status = response.status;

        let _headers: any = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            const _responseText = response.text();
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultDtoOfIntegralDetails.fromJS(resultData200) : new PagedResultDtoOfIntegralDetails();
            return Observable.of(result200);
        } else if (status === 401) {
            const _responseText = response.text();
            return throwException("A server error occurred.", status, _responseText, _headers);
        } else if (status === 403) {
            const _responseText = response.text();
            return throwException("A server error occurred.", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.text();
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Observable.of<PagedResultDtoOfIntegralDetails>(<any>null);
    }

    GetUserInfo(openId: string): Observable<IntegralDetails> {
        let url_ = this.baseUrl + "/api/services/app/IntegralDetail/GetUserInfo?";
        if (openId !== undefined)
            url_ += "openId=" + encodeURIComponent("" + openId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = {
            method: "get",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };
        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processGetUserInfo(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processGetUserInfo(response_);
                } catch (e) {
                    return <Observable<IntegralDetails>><any>Observable.throw(e);
                }
            } else
                return <Observable<IntegralDetails>><any>Observable.throw(response_);
        });
    }

    protected processGetUserInfo(response: Response): Observable<IntegralDetails> {
        const status = response.status;

        let _headers: any = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            const _responseText = response.text();
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? IntegralDetails.fromJS(resultData200) : new IntegralDetails();
            return Observable.of(result200);
        } else if (status === 401) {
            const _responseText = response.text();
            return throwException("A server error occurred.", status, _responseText, _headers);
        } else if (status === 403) {
            const _responseText = response.text();
            return throwException("A server error occurred.", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.text();
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Observable.of<IntegralDetails>(<any>null);
    }

    getIntegralDetailsById(skipCount: number, maxResultCount: number, openId: string): Observable<PagedResultDtoOfIntegralDetails> {
        let url_ = this.baseUrl + "/api/services/app/IntegralDetail/GetPagedIntegralDetailsById?";
        if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        if (openId !== undefined)
            url_ += "OpenId=" + encodeURIComponent("" + openId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = {
            method: "get",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processgetIntegralDetailsById(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processgetIntegralDetailsById(response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfIntegralDetails>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultDtoOfIntegralDetails>><any>Observable.throw(response_);
        });
    }

    protected processgetIntegralDetailsById(response: Response): Observable<PagedResultDtoOfIntegralDetails> {
        const status = response.status;

        let _headers: any = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            const _responseText = response.text();
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultDtoOfIntegralDetails.fromJS(resultData200) : new PagedResultDtoOfIntegralDetails();
            return Observable.of(result200);
        } else if (status === 401) {
            const _responseText = response.text();
            return throwException("A server error occurred.", status, _responseText, _headers);
        } else if (status === 403) {
            const _responseText = response.text();
            return throwException("A server error occurred.", status, _responseText, _headers);
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.text();
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Observable.of<PagedResultDtoOfIntegralDetails>(<any>null);
    }
}

export class PagedResultDtoOfIntegralDetails implements PagedResultDtoOfIntegralDetails {
    totalCount: number;
    items: IntegralDetails[];

    constructor(data?: PagedResultDtoOfIntegralDetails) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.totalCount = data["totalCount"];
            if (data["items"] && data["items"].constructor === Array) {
                this.items = [];
                for (let item of data["items"])
                    this.items.push(IntegralDetails.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfIntegralDetails {
        let result = new PagedResultDtoOfIntegralDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        if (this.items && this.items.constructor === Array) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new PagedResultDtoOfIntegralDetails();
        result.init(json);
        return result;
    }
}

export interface IPagedResultDtoOfIntegralDetails {
    totalCount: number;
    items: IntegralDetails[];
}