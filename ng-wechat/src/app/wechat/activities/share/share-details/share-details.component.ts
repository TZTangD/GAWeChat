///<reference path="../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '../../../components/app-component-base';
import { JWeiXinService } from 'ngx-weui/jweixin';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, StatisticalDetail } from '../../../../services/model';
import { ArticleService } from '../../../../services';
import { ToptipsService } from 'ngx-weui';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'share-details',
    templateUrl: './share-details.component.html',
    styleUrls: ['./share-details.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ShareDetailComponent extends AppComponentBase implements OnInit {
    sDetailsOfShare: Article = new Article();
    statisticalDetail: StatisticalDetail = new StatisticalDetail();
    isGood: boolean = false; // 是否点赞
    constructor(injector: Injector
        , private router: Router
        , private shareService: ArticleService
        , private wxService: JWeiXinService
        , private route: ActivatedRoute
        , private srv: ToptipsService
        , private sanitizer: DomSanitizer
    ) {
        super(injector);
    }

    mShareId: string = this.route.snapshot.params['id'];

    ngOnInit(): void {
        let params: any = {
            id: this.mShareId,
            tenantId: this.settingsService.tenantId
        };
        this.shareService.GetWXExpByIdAsync(params).subscribe(res => {
            this.sDetailsOfShare = res;
        });
        this.GetIsGoodAsync();
    }

    GetIsGoodAsync() {
        let params: any = { id: this.id };
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        params.openId = this.settingsService.openId;
        params.articleId = this.id;
        this.shareService.GetIsGoodAsync(params).subscribe(data => {
            this.isGood = data;
        });
    }

    goShareWrite() {
        this.router.navigate(['shares/share-write']);
    }

    assembleHTML(strHTML: any) {
        return this.sanitizer.bypassSecurityTrustHtml(strHTML);
    }

    addGood() {
        this.statisticalDetail.articleId = this.mShareId;
        this.statisticalDetail.type = 2;
        this.statisticalDetail.openId = this.settingsService.openId;
        if (!this.isGood) {
            this.isGood = true;
            this.sDetailsOfShare.goodTotal++;
        }
        this.shareService.AddGoodAsync(this.statisticalDetail).subscribe(data => {
            if (data && data.code === 0) {
            } else {
                this.isGood = false;
                this.sDetailsOfShare.goodTotal--;
                this.srv['warn']('请重试');
            }
        });
    }
}
