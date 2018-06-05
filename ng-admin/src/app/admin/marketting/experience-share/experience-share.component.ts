import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ArticleServiceProxy, PagedResultDtoOfArticle } from '@shared/service-proxies/marketing-service';
import { Article } from '@shared/entity/marketting';
import { Parameter } from '@shared/service-proxies/entity';
import { Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';

@Component({
    moduleId: module.id,
    selector: 'experience-share',
    templateUrl: 'experience-share.component.html',
})
export class ExperienceShareComponent extends AppComponentBase implements OnInit {
    search: any = { status: 2 };
    PushStatus = [
        { text: '全部', value: 2 },
        { text: '草稿', value: 0 },
        { text: '已发布', value: 1 },
    ];
    articles: Article[] = [];
    loading = false;
    exportLoading = false;
    constructor(injector: Injector, private articityService: ArticleServiceProxy,
    private router:Router,) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
    }

    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { status: 2 };
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.articityService.getExperienceAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfArticle) => {
            this.loading = false;
            this.articles = result.items;
            this.query.total = result.totalCount;
        })
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Author', value: this.search.author }));
        arry.push(Parameter.fromJS({ key: 'Status', value: this.search.status === 2 ? null : this.search.status }));
        return arry;
    }

    /**
     * 编辑活动
     * @param article 
     */
    editArticle(article: Article) {
        this.router.navigate(['admin/marketting/experience-detail', article.id])
    }
    /**
     * 新增活动
     */
    createArticle() {
        this.router.navigate(['admin/marketting/experience-detail'])
    }

    /**
     * 导出经验分享
     */
    exportExcel(){
        this.exportLoading=true;
        this.articityService.ExportExcel({name:this.search.name,author:this.search.author,status:this.search.status === 2 ? null : this.search.status,type:2}).subscribe(data => {
            if (data.code == 0) {
                var url = AppConsts.remoteServiceBaseUrl + data.data;
                document.getElementById('aArticleExcelUrl').setAttribute('href', url);
                document.getElementById('btnArticleHref').click();
            } else {
                this.notify.error(data.msg);
            }
            this.exportLoading = false;
        });
    }
}
