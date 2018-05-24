import { Component, ViewEncapsulation, OnInit, Injector, ViewChild } from '@angular/core';
import { Article, WechatUser, PageModel, StatisticalDetail } from '../../../services/model';
import { AppComponentBase } from '../../components/app-component-base';
import { Router } from '@angular/router';
import { ArticleService, AppConsts } from '../../../services';
import { JWeiXinService, InfiniteLoaderComponent, PTRComponent, ToptipsService } from 'ngx-weui';
import { timer } from 'rxjs/observable/timer';

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

    constructor(injector: Injector, private router: Router,
        private articleService: ArticleService, private srv: ToptipsService, private wxService: JWeiXinService,
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
        this.articleService.GetPagedArticles(params).subscribe(result => {
            result.filter(v => {
                v.content = v.content.replace(/<\/?[^>]*>/g, "");
            })
            this.activityList.push(...result);
            if (result && result.length < this.pageModel.pageSize) {
                this.pageModel.isLast = true;
            }
        });
    }

    goDetailActivity(id: string) {
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
