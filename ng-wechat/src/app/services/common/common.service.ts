import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable()
export class CommonService {
    private searchText$ = new Subject<string>();

    search(key: string){
        this.searchText$.next(key);
    }

    config(sm: any) {
         this.searchText$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            sm
          ); 
    }
}