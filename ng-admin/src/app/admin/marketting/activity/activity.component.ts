import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ArticleServiceProxy, PagedResultDtoOfArticle } from '@shared/service-proxies/marketing-service';
import { Parameter } from '@shared/service-proxies/entity';
import { Article } from '@shared/entity/marketting';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { AppConsts } from '@shared/AppConsts';

@Component({
    moduleId: module.id,
    selector: 'activity',
    templateUrl: 'activity.component.html',
})
export class ActivityComponent extends AppComponentBase implements OnInit {
    search: any = { status: 2};
    PushStatus = [
        { text: '全部', value: 2 },
        { text: '草稿', value: 0},
        { text: '已发布', value: 1 },
    ];
    articles: Article[] = [];
    //用于删除显示
    articleTitle = ''
    loading = false;
    exportLoading = false;
    constructor(injector: Injector, private activityService: ArticleServiceProxy,
        private router: Router, private modal: NzModalService) {
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
        this.activityService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfArticle) => {
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
    editActivity(article: Article) {
        this.router.navigate(['admin/marketting/activity-detail', article.id])
    }
    /**
     * 新增活动
     */
    createActivity() {
        this.router.navigate(['admin/marketting/activity-detail'])
    }
    delete(article: Article, TplContent) {
        this.modal.confirm({
            content: TplContent,
            cancelText: '否',
            okText: '是',
            onOk: () => {
                this.activityService.delete(article.id).subscribe(() => {
                    this.notify.info(this.l('删除成功！'));
                    this.refreshData();
                });
            }
        })
    }

    exportExcel(){
        this.exportLoading=true;
        this.activityService.ExportExcel({name:this.search.name,author:this.search.author,status:this.search.status === 2 ? null : this.search.status,type:1}).subscribe(data => {
            if (data.code == 0) {
                var url = AppConsts.remoteServiceBaseUrl + data.data;
                document.getElementById('aActivityExcelUrl').setAttribute('href', url);
                document.getElementById('btnActivityHref').click();
            } else {
                this.notify.error(data.msg);
            }
            this.exportLoading = false;
        });
    }
}
