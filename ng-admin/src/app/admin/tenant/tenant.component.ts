import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PagedRequestDto, PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { TenantServiceProxy, TenantDto, PagedResultDtoOfTenantDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTenantComponent } from './create-tenant/create-tenant.component';
import { EditTenantComponent } from './edit-tenant/edit-tenant.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'tenant',
    templateUrl: 'tenant.component.html',
})
export class TenantComponent extends AppComponentBase implements OnInit {

    @ViewChild('createTenantModal') createTenantModal: CreateTenantComponent;
    @ViewChild('editTenantModal') editTenantModal: EditTenantComponent;
    q: any = {
        pi: 1,
        ps: 10,
        total: 0,
        sorter: '',
        status: -1,
        statusList: []
    };
    loading = false;
    status = [
        { text: '启用', value: false, type: 'success' },
        { text: '禁用', value: false, type: 'default' },
    ]
    tenants: TenantDto[] = [];
    //用于删除框租户名显示
    TenantName: string;

    constructor(injector: Injector, private _tenantService: TenantServiceProxy, private modal: NzModalService) {
        super(injector);
    }
    /**
     * 页面初始加载
     */
    ngOnInit(): void {
        this.refreshData();
    }
    // list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    //     this._tenantService.getAll(request.skipCount, request.maxResultCount)
    //         .finally(() => {
    //             finishedCallback();
    //         })
    //         .subscribe((result: PagedResultDtoOfTenantDto) => {
    //             this.tenants = result.items;
    //             // this.showPaging(result, pageNumber);
    //         });
    // }

    /**
     * 分页获取租户信息
     * @param reset 是否刷新页面
     */
    refreshData(reset = false) {
        if (reset) {
            this.q.pi = 1;
        }
        this.loading = true;
        this._tenantService.getAll((this.q.pi - 1) * this.q.ps, this.q.ps).subscribe((result: PagedResultDtoOfTenantDto) => {
            this.loading = false;
            let status = 0;
            this.tenants = result.items.map(i => {
                if (i.isActive) {
                    status = 0;
                } else {
                    status = 1
                }
                const statusItem = this.status[status];
                i.activeText = statusItem.text;
                i.activeType = statusItem.type;
                return i;
            });
            this.q.total = result.totalCount;
        });

    }


    /**
     * 删除单个租户
     * @param tenant 租户信息
     * @param contenTpl 弹框
     */
    delete(tenant: TenantDto, contenTpl): void {
        this.TenantName=tenant.name;
        this.modal.confirm({
            content: contenTpl,
            okText: '是',
            cancelText: '否',
            onOk: () => {
                this._tenantService.delete(tenant.id)
                    .subscribe(() => {
                        this.notify.info(this.l('删除成功'));
                        this.refreshData();
                    });
            }
        })
    }

    /**
     * 新增租户
     */
    createTenant(): void {
        this.createTenantModal.show();
    }
    /**
     * 更新租户
     * @param tenant 租户id
     */
    editTenant(tenant: TenantDto): void {
        this.editTenantModal.show(tenant.id);
    }
}
