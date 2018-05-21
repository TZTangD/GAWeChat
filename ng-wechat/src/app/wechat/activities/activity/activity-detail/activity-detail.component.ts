import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { AppComponentBase } from '../../../components/app-component-base';
import { Router, Params } from '@angular/router';
import { UploaderOptions, FileItem, Uploader, UploaderHeaders } from 'ngx-weui';
import { AppConsts, ArticleService } from '../../../../services';
import { JWeiXinService } from 'ngx-weui/jweixin';
import { Article } from '../../../../services/model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'activity-detail',
    templateUrl: './activity-detail.component.html',
    styleUrls: ['./activity-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityDetailComponent extends AppComponentBase implements OnInit {
    activity: Article = new Article();
    id: string = this.route.snapshot.params['id'];
    constructor(injector: Injector, private router: Router,
        private articleService: ArticleService,
        private route: ActivatedRoute) {
        super(injector);
    }
    ngOnInit() {
        let params: any = { id: this.id };
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        this.articleService.GetArticleById(params).subscribe(result => {
            this.activity = result;
        });
    }
}
