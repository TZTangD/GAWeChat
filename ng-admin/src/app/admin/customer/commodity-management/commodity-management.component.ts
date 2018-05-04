import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ProductsServiceProxy, PagedResultDtoOfProducts } from '@shared/service-proxies/customer-service';
import { Products } from '@shared/entity/customer';
import { Parameter } from '@shared/service-proxies/entity';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'commodity-management',
    templateUrl: 'commodity-management.component.html',
})
export class CommodityManagementComponent extends AppComponentBase implements OnInit {
    loading = false;
    status = [
        { text: '启用', value: false, type: 'success' },
        { text: '禁用', value: false, type: 'default' },
    ];
    isRares = [
        { text: '全部', value: 0 },
        { text: '是', value: true },
        { text: '否', value: false },
    ];
    types = [
        { text: '全部', value: 0 },
        { text: '卷烟类', value: 1 },
        { text: '特产类', value: 2 },
    ]
    products: Products[] = [];
    search: any = { isRare: 0, type: 0 }
    //图片放大
    previewImage = ''
    previewVisible = false;
    imgWidth: number = 550;
    defalutImg = './assets/img/tobacco.jpg';
    //用于删除显示
    productName = '';
    constructor(injector: Injector, private productsService: ProductsServiceProxy, private modal: NzModalService) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
    }
    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { isRares: 0, types: 0 };
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.productsService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfProducts) => {
            this.loading = false;
            let status = 0;
            this.products = result.items.map(i => {
                if (i.isAction) {
                    status = 1;
                } else {
                    status = 0;
                }
                const statusItem = this.status[status];
                i.activeText = statusItem.text;
                i.activeType = statusItem.type;
                return i;
            })
            this.query.total = result.totalCount;
        })

    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Type', value: this.search.type === 0 ? null : this.search.type }));
        arry.push(Parameter.fromJS({ key: 'IsRare', value: this.search.isRare == 0 ? null : this.search.IsRare }));
        return arry;
    }
    handlePreview = (url: string) => {
        if (!url) {
            this.previewImage = this.defalutImg;
        }
        else {
            this.previewImage = url;
        }
        this.previewVisible = true;
    }

    /**
     * 删除单个商品
     * @param product 商品实体
     * @param contentTpl 弹框id
     */
    delete(product: Products, contentTpl): void {
        this.productName = product.specification;
        this.modal.confirm({
            content: contentTpl,
            okText: '是',
            cancelText: '否',
            onOk: () => {
                this.productsService.delete(product.id).subscribe(() => {
                    this.notify.info(this.l('删除成功！'));
                    this.refreshData();
                })
            }
        });
    }

}
