import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { ActivityBanquetDto, Parameter, UploadFileDto, ApiResult } from "@shared/service-proxies/entity";
import { UploadFile } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';
// import * as moment from 'moment';
import { API_BASE_URL, SwaggerException } from '@shared/service-proxies/service-proxies';

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, headers, null));
}

export class ActivityBanquetServiceProxy {
    private http: Http;
    private baseUrl: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor(@Inject(Http) http: Http, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    /**
     * 通过id获取回传资料信息
     * @param id 消息id
     */
    get(id: string): Observable<ActivityBanquetDto> {
        let url_ = this.baseUrl + "/api/services/app/ActivityBanquet/GetActivityBanquetByIdAsync?";
        if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = {
            method: "get",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processGet(response_);
                } catch (e) {
                    return <Observable<ActivityBanquetDto>><any>Observable.throw(e);
                }
            } else
                return <Observable<ActivityBanquetDto>><any>Observable.throw(response_);
        });
    }

    /**
    * 通过formId获取回传资料信息
    * @param formId 消息id
    */
    getByFormId(formId: string): Observable<ActivityBanquetDto> {
        let url_ = this.baseUrl + "/api/services/app/ActivityBanquet/GetActivityBanquetByFormIdAsync?";
        if (formId !== undefined)
            url_ += "Id=" + encodeURIComponent("" + formId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = {
            method: "get",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processGet(response_);
                } catch (e) {
                    return <Observable<ActivityBanquetDto>><any>Observable.throw(e);
                }
            } else
                return <Observable<ActivityBanquetDto>><any>Observable.throw(response_);
        });
    }


    protected processGet(response: Response): Observable<ActivityBanquetDto> {
        const status = response.status;

        let _headers: any = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            const _responseText = response.text();
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? ActivityBanquetDto.fromJS(resultData200) : new ActivityBanquetDto();
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
        return Observable.of<ActivityBanquetDto>(<any>null);
    }

    update(input: ActivityBanquetDto): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/ActivityBanquet/CreateOrUpdateActivityBanquet";
        url_ = url_.replace(/[?&]$/, "");
        let inputjson = { activityBanquet: input };
        const content_ = JSON.stringify(inputjson);

        let options_ = {
            body: content_,
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processUpdate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processUpdate(response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processUpdate(response: Response): Observable<void> {
        const status = response.status;

        let _headers: any = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            const _responseText = response.text();
            return Observable.of<void>(<any>null);
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
        return Observable.of<void>(<any>null);
    }

    /**
     * 通过formId获取回传资料信息
     * @param formId 消息id
     */
    upload(file: any): Observable<UploadFileDto> {
        let url_ = this.baseUrl + "/WeChatFile/BanquetPhotoSave";
        const formData = new FormData();
        formData.append('imgs', file);
        let options_ = {
            body: formData,
            method: "post",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processUpload(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processUpload(response_);
                } catch (e) {
                    return <Observable<UploadFileDto>><any>Observable.throw(e);
                }
            } else
                return <Observable<UploadFileDto>><any>Observable.throw(response_);
        });
    }

    protected processUpload(response: Response): Observable<UploadFileDto> {
        const status = response.status;

        let _headers: any = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            const _responseText = response.text();
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? UploadFileDto.fromJS(resultData200) : new UploadFileDto();
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
        return Observable.of<UploadFileDto>(<any>null);
    }

    uploadBase64(input: any): Observable<ApiResult> {
        let url_ = this.baseUrl + "/WeChatFile/BanquetPhotoSaveBase64";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(input);

        let options_ = {
            body: content_,
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processUploadBase64(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processUploadBase64(response_);
                } catch (e) {
                    return <Observable<ApiResult>><any>Observable.throw(e);
                }
            } else
                return <Observable<ApiResult>><any>Observable.throw(response_);
        });
    }

    protected processUploadBase64(response: Response): Observable<ApiResult> {
        const status = response.status;

        let _headers: any = response.headers ? response.headers.toJSON() : {};
        if (status === 200) {
            const _responseText = response.text();
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? ApiResult.fromJS(resultData200) : new ApiResult();
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
        return Observable.of<ApiResult>(<any>null);
    }
}
export class PagedResultDtoOfActivityBanquet implements IPagedResultDtoOfActivityBanquet {
    totalCount: number;
    items: ActivityBanquetDto[];

    constructor(data?: IPagedResultDtoOfActivityBanquet) {
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
                    this.items.push(ActivityBanquetDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfActivityBanquet {
        let result = new PagedResultDtoOfActivityBanquet();
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
        let result = new PagedResultDtoOfActivityBanquet();
        result.init(json);
        return result;
    }
}

export interface IPagedResultDtoOfActivityBanquet {
    totalCount: number;
    items: ActivityBanquetDto[];
}