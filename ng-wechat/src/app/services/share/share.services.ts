import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Share} from '../model/share';
import {HttpClient} from '../httpclient';
import {Article} from '../model';

@Injectable()
export class ShareService {
    constructor(private http: HttpClient) {
    }

    GetWXPagedExpAsync(params: any): Observable<Share[]> {
        return this.http.get('/api/services/app/Article/GetWXPagedExpAsync', params).map(data => {
            if (data.result) {
                return Share.fromJSArray(data.result);
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


}
