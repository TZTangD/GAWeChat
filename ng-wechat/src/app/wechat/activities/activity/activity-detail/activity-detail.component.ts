import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { AppComponentBase } from '../../../components/app-component-base';
import { Router, Params } from '@angular/router';
import { UploaderOptions, FileItem, Uploader, UploaderHeaders, ToptipsService } from 'ngx-weui';
import { AppConsts, ArticleService } from '../../../../services';
import { JWeiXinService } from 'ngx-weui/jweixin';
import { Article, StatisticalDetail } from '../../../../services/model';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'activity-detail',
    templateUrl: './activity-detail.component.html',
    styleUrls: ['./activity-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActivityDetailComponent extends AppComponentBase implements OnInit {
    activity: Article = new Article();
    id: string = this.route.snapshot.params['id'];
    statisticalDetail: StatisticalDetail = new StatisticalDetail();
    isGood: boolean = false; // 是否点赞
    constructor(injector: Injector, private router: Router,
        private articleService: ArticleService, private srv: ToptipsService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
        super(injector);
    }
    ngOnInit() {
        let params: any = { id: this.id };
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        this.articleService.GetArticleById(params).subscribe(result => {
            var start = '<body>';
            var end = '</body>';
            var s = result.content.indexOf(start) + start.length;
            var e = result.content.indexOf(end);
            result.content = result.content.substring(s, e).replace(/gawechat\//g, '');
            this.activity = result;
        });
        this.GetIsGoodAsync();
    }

    assembleHTML(strHTML: any) {
        return this.sanitizer.bypassSecurityTrustHtml(strHTML);
    }

    GetIsGoodAsync() {
        let params: any = { id: this.id };
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        params.openId = this.settingsService.openId;
        params.articleId = this.id;
        this.articleService.GetIsGoodAsync(params).subscribe(data => {
            this.isGood = data;
            if (this.isGood == null) {
                this.isGood == false;
            }
        });
    }

    addGood() {
        this.statisticalDetail.articleId = this.id;
        this.statisticalDetail.type = 2;
        this.statisticalDetail.openId = this.settingsService.openId;
        if (!this.isGood) {
            this.isGood = true;
            this.activity.goodTotal++;
        }
        this.articleService.AddGoodAsync(this.statisticalDetail).subscribe(data => {
            if (data && data.code === 0) {
            } else {
                this.isGood = false;
                this.activity.goodTotal--;
                this.srv['warn']('请重试');
            }
        });
    }
}
