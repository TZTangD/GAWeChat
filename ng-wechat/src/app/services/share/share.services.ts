import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Share} from '../model/share';
import {HttpClient} from '../httpclient';

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


}
