import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { HttpClient } from '../httpclient';
import { Observable } from 'rxjs/Observable';
import { Article } from '../model/index';


@Injectable()
export class ArticleService {
    constructor(private http: HttpClient) { }

    GetPagedArticles(params: any): Observable<Article[]> {
        return this.http.get('/api/services/app/Article/GetWXPagedArticlesAsync', params).map(data => {
            if (data.result) {
                return Article.fromJSArray(data.result);
            } else {
                return null;
            }
        });
    }

    GetArticleById(params: any): Observable<Article> {
        return this.http.get('/api/services/app/Article/GetWXArticlesByIdAsync', params).map(data => {
            if (data.result) {
                return Article.fromJS(data.result);
            } else {
                return null;
            }
        });
    }

    GetWXPagedExpAsync(params: any): Observable<Article[]> {
        return this.http.get('/api/services/app/Article/GetWXPagedExpAsync', params).map(data => {
            if (data.result) {
                return Article.fromJSArray(data.result);
            } else {
                return null;
            }
        });
    }

    GetWXExpByIdAsync(params: any): Observable<Article> {
        return this.http.get('/api/services/app/Article/GetWXExpByIdAsync', params).map(data => {
            if (data.result) {
                return Article.fromJS(data.result);
            } else {
                return null;
            }
        });
    }

    AddStatisticalAsync(input: any): Observable<any> {
        return this.http.post('/api/services/app/StatisticalDetail/AddStatisticalAsync', input).map(data => {
            return data.result;
        });
    }

    GetIsGoodAsync(params: any): Observable<any> {
        return this.http.get('/api/services/app/StatisticalDetail/GetIsGoodAsync', params).map(data => {
            if (data.result) {
                return data.result;
            } else {
                return null;
            }
        });
    }

    AddGoodAsync(params: any): Observable<any> {
        return this.http.post('/api/services/app/StatisticalDetail/AddGoodAsync', params).map(data => {
            if (data.result) {
                return data.result;
            } else {
                return null;
            }
        });
    }
    CreatWXManuscript(params: any): Observable<any> {
        return this.http.post('/api/services/app/Manuscript/CreatWXManuscript', params).map(data => {
            if (data.result) {
                return data.result;
            } else {
                return null;
            }
        });
    }

}
