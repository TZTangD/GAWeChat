import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { RetailCustomerServiceProxy } from '@shared/service-proxies/customer-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RetailCustomer, Employee } from '@shared/service-proxies/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModalComponent } from '../../users/employee-modal/employee-modal.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'retail-customer-detail',
    templateUrl: 'retail-customer-detail.component.html',
})
export class RetailCustomerDetailComponent extends AppComponentBase implements OnInit {
    @ViewChild('selectEmployeeModal') selectEmployeeModal: EmployeeModalComponent;

    id: number;
    retailCustomerd: RetailCustomer = new RetailCustomer();
    form: FormGroup;
    // 市场类型
    marketTypes = [
        { text: '乡村', value: 1 },
        { text: '城镇', value: 2 },
    ]
    // 经营规模
    scales = [
        { text: '小', value: 1 },
        { text: '中', value: 2 },
        { text: '大', value: 3 },
    ]
    // 终端
    terminalTypes = [
        { text: '无', value: 0 },
        { text: '建议终端', value: 1 },
        { text: '普通终端', value: 2 },
        { text: '现代终端', value: 3 },
    ]
    // 订货方式
    orderModes = [
        { text: '无', value: 0 },
        { text: '网上订货', value: 1 },
        { text: '电话订货', value: 2 },
        { text: '手机', value: 3 },
    ]
    isConfirmLoading = false;
    //经理不可编辑
    isDisablec = true;
    constructor(injector: Injector, private retailService: RetailCustomerServiceProxy, private ActRouter: ActivatedRoute,
        private fb: FormBuilder, private router: Router, private modal: NzModalService) {
        super(injector);
        this.id = this.ActRouter.snapshot.params['id'];
        console.log('id:');
        console.log(this.id);
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            code: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            name: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            businessAddress: [null, Validators.compose([Validators.maxLength(500)])],
            archivalLevel: [null, Validators.compose([Validators.maxLength(100)])],
            orderCycle: [null, [Validators.maxLength(100)]],
            storeType: [null, Validators.compose([Validators.maxLength(100)])],
            telephone: [null, Validators.compose([Validators.maxLength(100)])],
            isAction: [null, Validators.compose([Validators.required])],
            branchCompany: [null, Validators.compose([Validators.maxLength(200)])],
            department: [null, Validators.compose([Validators.maxLength(100)])],
            manager: [null, Validators.compose([Validators.maxLength(50)])],
            orderMode: [null],
            terminalType: [null],
            businessType: [null, Validators.compose([Validators.maxLength(100)])],
            scale: [null],
            marketType: [null],
            deliveryLine: [null, Validators.compose([Validators.maxLength(500)])],
            licenseKey: [null, Validators.compose([Validators.maxLength(50)])],
        });
        this.getSingleRetailCustomer();
    }
    /**
     * 获取单个零售户信息
     */
    getSingleRetailCustomer() {
        this.retailService.get(this.id).subscribe((result: RetailCustomer) => {
            this.retailCustomerd = result;
            if (this.retailCustomerd.id) {

            } else {
                this.retailCustomerd.init({ isAction: true });
            }
        });
    }

    /**
     * 
     * @param name 
     */
    getFormControl(name: string) {
        return this.form.controls[name];
    }

    employee() {
        this.selectEmployeeModal.show(true);
    }
    /**
     * 模态框返回
     */
    getSelectData = (employee?: Employee) => {
        if (employee) {
            this.retailCustomerd.manager = employee.name;
            this.retailCustomerd.employeeId = employee.id;
        }
    }
    saveSub() {
        //检查form验证
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this.isConfirmLoading = true;
            this.retailService.CheckCode(this.retailCustomerd.code,this.retailCustomerd.id).subscribe((isCode: boolean) => {
                if (isCode) {
                    this.retailService.update(this.retailCustomerd)
                        .finally(() => { this.isConfirmLoading = false; })
                        .subscribe(() => {
                            this.notify.info(this.l('保存成功！'));
                        });
                } else {
                    this.isConfirmLoading = false;
                    this.modal.warning({
                        title: '改客户编码已存在！'
                    });
                }
            })
        }
    }
    /**
     * 返回
     */
    Return() {
        this.router.navigate(['admin/retail-customer']);
    }
}
