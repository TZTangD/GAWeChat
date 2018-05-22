import {AppComponentBase} from '../../components/app-component-base';
import {Component, Injector, OnInit, ViewEncapsulation} from '@angular/core';
import 'rxjs/add/observable/timer';
import {Router} from '@angular/router';
import {JWeiXinService} from 'ngx-weui/jweixin';
import {Observable} from 'rxjs/Observable';
import {ArticleService} from '../../../services';
import {Article, StatisticalDetail} from '../../../services/model';
import {ToptipsService} from 'ngx-weui';

@Component({
    selector: 'share',
    templateUrl: './share.component.html',
    styleUrls: ['./share.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShareComponent extends AppComponentBase implements OnInit {
    tenantId: string;
    pageIndex: number = 1;
    // 每页条数规定15条数据
    pageSize: number = 15;

    _loading: boolean = false;
    _finished: boolean = false;

    items: Article[] = [];
    statisticalDetail: StatisticalDetail = new StatisticalDetail();

    constructor(injector: Injector
        , private wxService: JWeiXinService
        , private router: Router
        , private shareService: ArticleService
        , private srv: ToptipsService) {
        super(injector);
    }

    ngOnInit(): void {
        this.getEXPList();
    }

    // = Array(20).fill(this.pageIndex).map((v: any, i: number) => i);
    onLoadMore(comp: ShareComponent) {
        Observable.timer(1500).subscribe(() => {
            this.items.push(...Array(this.pageSize).fill(this.items.length).map((v, i) => v + i));
            if (this.items.length >= this.items.length) {
                comp.setFinished();
                return;
            }
            comp.resolveLoading();
        });
    }

    /** 设置本次加载完成 */
    resolveLoading() {
        this._loading = false;
        this._finished = false;
    }

    /** 设置结束 */
    setFinished() {
        this._loading = false;
        this._finished = true;
    }

    getEXPList() {
        let params: any = {
            tenantId: this.settingsService.tenantId,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        };
        this.shareService.GetWXPagedExpAsync(params).subscribe(res => {
            this.items = res;
        });
    }

    goShareDetails(id: string) {
        this.statisticalDetail.articleId = id;
        this.statisticalDetail.type = 1;
        this.statisticalDetail.openId = this.settingsService.openId;
        this.shareService.AddStatisticalAsync(this.statisticalDetail).subscribe(data => {
            if (data && data.code === 0) {
                this.router.navigate(['shares/share-details', {id: id}]);
            } else {
                this.srv['warn']('请重试');
            }
        });
    }
}
