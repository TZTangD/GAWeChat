import { Component, ViewEncapsulation, OnInit, Injector, ViewChild } from '@angular/core';
import { Article, WechatUser, PageModel } from '../../../services/model';
import { AppComponentBase } from '../../components/app-component-base';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services';
import { JWeiXinService, InfiniteLoaderComponent, PTRComponent } from 'ngx-weui';
import { timer } from 'rxjs/observable/timer';

@Component({
    selector: 'activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ArticleComponent extends AppComponentBase implements OnInit {
    activity: Article[] = [];
    pageModel: PageModel = new PageModel(); // 分页信息
    @ViewChild(InfiniteLoaderComponent) il;
    restartBtn = false;

    constructor(injector: Injector, private router: Router,
        private articleService: ArticleService, private wxService: JWeiXinService,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.pageModel.isLast = false;
        this.GetPagedArticles();
    }

    onLoadMore(comp: InfiniteLoaderComponent) {
        this.pageModel.pageIndex++;
        console.log(this.pageModel.isLast);
        if (this.pageModel.isLast) {
            comp.setFinished();
            return;
        }
        this.GetPagedArticles();
        comp.resolveLoading();

    }

    GetPagedArticlesNopage() {
        let params: any = {};
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        this.articleService.GetPagedArticles(params).subscribe(result => {
            this.activity = result;
        });
    }

    GetPagedArticles() {
        let params: any = {};
        if (this.settingsService.tenantId) {
            params.tenantId = this.settingsService.tenantId;
        }
        params.pageIndex = this.pageModel.pageIndex;
        params.pageSize = this.pageModel.pageSize;
        this.articleService.GetPagedArticles(params).subscribe(result => {
            this.activity.push(...result);
            if (result && result.length < this.pageModel.pageSize) {
                this.pageModel.isLast = true;
            }
        });
    }

    goDetailActivity(id: string) {
        this.router.navigate(['/activities/activity-detail', { id: id }]);
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
