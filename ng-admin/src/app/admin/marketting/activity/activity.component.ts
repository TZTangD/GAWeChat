import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ArticleServiceProxy, PagedResultDtoOfArticle } from '@shared/service-proxies/marketing-service';
import { Parameter } from '@shared/service-proxies/entity';
import { Article } from '@shared/entity/marketting';

@Component({
    moduleId: module.id,
    selector: 'activity',
    templateUrl: 'activity.component.html',
})
export class ActivityComponent extends AppComponentBase implements OnInit {
    search: any = { status: 0 };
    PushStatus = [
        { text: '全部', value: 0 },
        { text: '已发布', value: 1 },
        { text: '草稿', value: 2 }
    ];
    articles: Article[] = [];
    loading = false;
    constructor(injector: Injector, private activityService: ArticleServiceProxy) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
    }

    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { status: 0 };
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
        arry.push(Parameter.fromJS({ name: '', value: this.search.name }));
        arry.push(Parameter.fromJS({ name: '', value: this.search.author }));
        arry.push(Parameter.fromJS({ name: '', value: this.search.status === 0 ? null : this.search.status }));
        return arry;
    }
}
