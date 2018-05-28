import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RetailCustomer, Parameter } from '@shared/service-proxies/entity';
import { GoodSourceServiceProxy, PagedResultDtoOfGoodSource } from '@shared/service-proxies/customer-service';
import { NzModalService, UploadFile } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { GoodSource } from '@shared/entity/customer';
@Component({
    moduleId: module.id,
    selector: 'source-goods-level',
    templateUrl: 'source-goods-level.component.html',
})
export class SourceGoodsLevelComponent extends AppComponentBase implements OnInit {
    constructor(injector: Injector, private goodSourceService: GoodSourceServiceProxy, private router: Router,
        private modal: NzModalService, ) {
        super(injector);
    }
    loading = false;
    exportExcelUrl: string;
    exportLoading = false;
    search: any = {};
    goodSourceList: GoodSource[] = [];
    uploadLoading = false;
    host: string = AppConsts.remoteServiceBaseUrl;
    ngOnInit(): void {
        this.refreshData();
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'CustCode', value: this.search.custCode }));
        arry.push(Parameter.fromJS({ key: 'CusName', value: this.search.cusName }));
        arry.push(Parameter.fromJS({ key: 'GoodName', value: this.search.goodName }));
        return arry;
    }
    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = {};
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.goodSourceService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfGoodSource) => {
            this.loading = false;
            this.goodSourceList = result.items;
            this.query.total = result.totalCount;
        })
    }

    /**
 * 导出档级
 */
    exportExcel() {
        this.exportLoading = true;
        this.goodSourceService.exportGoodSourceExcel({ name: this.search.name, scale: this.search.scale, markets: this.search.market }).subscribe(result => {
            if (result.code == 0) {
                //var url = 'http://localhost:21021/files/测试客户经理.xlsx';
                var url = AppConsts.remoteServiceBaseUrl + result.data;
                //alert(url)
                document.getElementById('aGoodSourceExcelUrl').setAttribute('href', url);
                document.getElementById('btnGoodSourceHref').click();
            } else {
                this.notify.error(result.msg);
            }
            this.exportLoading = false;
        });
    }

    beforeExcelUpload = (file: UploadFile): boolean => {
        if (this.uploadLoading) {
            this.notify.info('上次数据导入还未完成');
            return false;
        }
        if (!file.name.includes('.xlsx')) {
            this.notify.error('上传文件必须是Excel文件(*.xlsx)');
            //this.msgService.error('上传文件必须是Excel文件(*.xlsx)');
            return false;
        }
        this.uploadLoading = true;
        return true;
    }

    handleChange = (info: { file: UploadFile }): void => {
        if (info.file.status === 'error') {
            this.notify.error('上传文件异常，请重试');
            this.uploadLoading = false;
        }
        if (info.file.status === 'done') {
            this.uploadLoading = true;
            this.goodSourceService.importGoodSourceExcelAsync().subscribe((res) => {
                if (res && res.code == 0) {
                    this.notify.success('导入成功');
                    this.refreshData(false, true);
                } else {
                    this.notify.error('导入失败');
                }
                this.uploadLoading = false;
            });
        }
    }
}
