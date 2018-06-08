import { Component, ViewEncapsulation, OnInit, Injector, ViewChild } from '@angular/core';
import { Article, WechatUser, PageModel, StatisticalDetail } from '../../../services/model';
import { AppComponentBase } from '../../components/app-component-base';
import { Router } from '@angular/router';
import { ArticleService, AppConsts } from '../../../services';
import { JWeiXinService, InfiniteLoaderComponent, PTRComponent, ToptipsService } from 'ngx-weui';
import { timer } from 'rxjs/observable/timer';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ArticleComponent extends AppComponentBase implements OnInit {
    activityList: Article[] = [];
    statisticalDetail: StatisticalDetail = new StatisticalDetail();
    pageModel: PageModel = new PageModel(); // 分页信息
    @ViewChild(InfiniteLoaderComponent) il;
    hostUrl: string = AppConsts.remoteServiceBaseUrl;
    href: any;
    constructor(injector: Injector, private router: Router, private sanitizer: DomSanitizer
        , private articleService: ArticleService, private srv: ToptipsService, private wxService: JWeiXinService,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.pageModel.isLast = false;
        this.GetPagedArticles();
    }

    onLoadMore(comp: InfiniteLoaderComponent) {
        this.pageModel.pageIndex++;
        if (this.pageModel.isLast) {
            comp.setFinished();
            return;
        }
        this.GetPagedArticles();
        comp.resolveLoading();

    }

    GetPagedArticles() {
        let params: any = {};
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        params.pageIndex = this.pageModel.pageIndex;
        params.pageSize = this.pageModel.pageSize;
        var lreg = new RegExp('&ldquo;', "g");
        var rreg = new RegExp('&rdquo;', "g");
        this.articleService.GetPagedArticles(params).subscribe(result => {
            result.filter(v => {
                // if (v.linkType == 2) this.ahref = v.linkAddress;
                // if (v.linkType == 2) this.href = this.sanitizer.bypassSecurityTrustResourceUrl(v.linkAddress);
                // else this.href = 'javascript:void(0);'
                v.content = v.content.replace(/<\/?[^>]*>/g, '').replace(lreg, '').replace(rreg, '');
            })
            this.activityList.push(...result);
            if (result && result.length < this.pageModel.pageSize) {
                this.pageModel.isLast = true;
            }
        });
    }

    goDetailActivity(id: string, linkType: number, linkAddress: string) {
        if (linkType == 1) {
            this.statisticalDetail.articleId = id;
            this.statisticalDetail.type = 1;
            this.statisticalDetail.openId = this.settingsService.openId;
            this.articleService.AddStatisticalAsync(this.statisticalDetail).subscribe(data => {
                if (data && data.code === 0) {
                    this.router.navigate(['/activities/activity-detail', { id: id }]);
                } else {
                    this.srv['warn']('请重试');
                }
            });
        }
        else {
            location.href = linkAddress;
        }
    }

    /**
     * 暂不做刷新
     */
    // onRefresh(ptr: PTRComponent) {
    //     this.pageModel.pageIndex = 1;
    //     this.activity = [];
    //     this.pageModel.isLast = false;
    //     timer(800).subscribe(() => {
    //         this.GetPagedArticles();
    //         ptr.setFinished('释放立即刷新');
    //     });
    // }
}
