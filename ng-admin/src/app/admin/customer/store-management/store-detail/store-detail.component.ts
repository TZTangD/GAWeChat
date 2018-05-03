import { Component, OnInit, Injector } from '@angular/core';
import { Shop, ShopEvaluation } from '@shared/entity/customer';
import { WechatUser } from '@shared/entity/wechat';
import { AppComponentBase } from '@shared/app-component-base';
import { ShopServiceProxy, ShopEvaluationServiceProxy, PagedResultDtoOfShopEvaluation } from '@shared/service-proxies/customer-service';
import { WechatUserServiceProxy, PagedResultDtoOfWeChatUser } from '@shared/service-proxies/wechat-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Parameter } from '@shared/service-proxies/entity';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'store-detail',
    templateUrl: 'store-detail.component.html',
    styleUrls: ['store-detail.component.scss']
})
export class StoreDetailComponent extends AppComponentBase implements OnInit {
    //积分明细
    queryE: any = {
        pageIndex: 1,
        pageSize: 10,
        skipCount: function () { return (this.pageIndex - 1) * this.pageSize; },
        total: 0,
        sorter: '',
        status: -1,
        statusList: []
    };
    shop: Shop = new Shop();
    shopEmployees: WechatUser[] = [];
    shopEvaluations: ShopEvaluation[] = [];
    loading = false;
    loadingE = false;
    shopName = '';
    id: number;
    evaluation: ShopEvaluation;
    //评价

    low: number = 0;
    middle: number = 0;
    hight: number = 0;
    totalE: number = 0;
    evaluations = [
        { id: 0, text: '全部', value: true, color: 'blue' },
        { id: 5, text: '好评', value: false, color: 'red' },
        { id: 3, text: '中评', value: false, color: 'orange' },
        { id: 1, text: '差评', value: false, color: '#AAAAAA' },
    ];
    evaluationSearch: number = 0;
    evaluationShow: string;
    constructor(injector: Injector, private shopService: ShopServiceProxy, private shopEvaluationService: ShopEvaluationServiceProxy,
        private weChatService: WechatUserServiceProxy, private Acroute: ActivatedRoute, private modal: NzModalService,
        private router: Router) {
        super(injector);
        this.id = this.Acroute.snapshot.params['id'];
    }
    ngOnInit(): void {
        this.getSingleShop();
    }

    getSingleShop() {
        this.shopService.get(this.id).subscribe((result: Shop) => {
            this.shop = result;
            this.evaluations = [
                { id: 0, text: '全部', value: true, color: 'blue' },
                { id: 5, text: '好评', value: false, color: 'red' },
                { id: 3, text: '中评', value: false, color: 'orange' },
                { id: 1, text: '差评', value: false, color: '#AAAAAA' },
            ];
            if (result.evaluation) {
                var assess = result.evaluation.split(',');
                this.hight = parseInt(assess[0]);
                this.middle = parseInt(assess[1]);
                this.low = parseInt(assess[2]);
                this.evaluationShow = '好评：' + this.hight + ' 中评：' + this.middle + ' 差评：' + this.low;
                this.totalE = this.low + this.middle + this.hight;
                this.evaluations.map(i => {
                    if (i.id == 0) {
                        i.text = i.text + '(' + this.totalE + ')';
                    } else if (i.id == 5) {
                        i.text = i.text + '(' + this.hight + ')';
                    } else if (i.id == 3) {
                        i.text = i.text + '(' + this.middle + ')';
                    } else if (i.id == 1) {
                        i.text = i.text + '(' + this.low + ')';
                    }
                })
            }
            this.shopName = '店铺名：' + this.shop.name + '  状态：' + this.shop.statusName;
            this.refreshData();
            this.refreshDataE();

        });
    }
    refreshData() {
        this.loading = true;
        this.weChatService.getShopWeChatUserAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfWeChatUser) => {
            this.loading = false;
            this.shopEmployees = result.items;
            this.query.total = result.totalCount;
        });
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'ShopOwnerId', value: this.shop.retailerId }));
        return arry;
    }
    refreshDataE() {
        this.loadingE = true;
        this.shopEvaluationService.getAll(this.queryE.skipCount(), this.queryE.pageSize, this.getParameterEvaluation()).subscribe((result: PagedResultDtoOfShopEvaluation) => {
            this.loadingE = false;
            this.shopEvaluations = result.items;
            this.queryE.total = result.totalCount;
        });
    }
    getParameterEvaluation(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'ShopId', value: this.shop.id }));
        arry.push(Parameter.fromJS({ key: 'Evaluation', value: this.evaluationSearch == 0 ? null : this.evaluationSearch }));
        return arry;
    }

    /**
     * 用于显示评价详情
     * @param evaluation 
     */
    editShopEvalustion(evaluation: ShopEvaluation) {
        this.evaluation = evaluation;
    }

    changeCategory(status: boolean, idx: number, id: number) {
        // if (id === 0) {
        //     this.evaluations.map(i => i.value = status);
        // } else {
        //     this.evaluations[idx].value = status;
        // }
        this.evaluations.map(i => i.value = !status);
        this.evaluations[idx].value = status;
        // this.evaluations[idx].color = 'green';
        this.evaluationSearch = id;
        this.refreshDataE();
    }

    check(status: number, contentTpl) {
        this.modal.confirm({
            content: contentTpl,
            okText: '是',
            cancelText: '否',
            onOk: () => {
                this.shop.status = status;
                this.shop.auditTime = this.dateFormat(new Date);
                this.shopService.update(this.shop).subscribe((result: Shop) => {
                    this.shop = result;
                    this.getSingleShop();
                    this.notify.info(this.l('店铺状态更新成功！'));
                });
            }
        });
    }
    return() {
        this.router.navigate(['admin/customer/store-management']);
    }
}
