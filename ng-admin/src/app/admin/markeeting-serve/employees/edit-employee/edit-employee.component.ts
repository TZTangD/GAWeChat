import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { EmployeeServiceProxy } from '@shared/service-proxies/marketing-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateEmployee, Employee } from '@shared/service-proxies/entity/employee';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'edit-employee-modal',
    templateUrl: 'edit-employee.component.html',
})
export class EditEmployeeComponent extends AppComponentBase implements OnInit {
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    employeee: Employee;
    emodalVisible = false;
    iseConfirmLoading = false;
    forme: FormGroup;
    positions = [
        { text: '客户经理', value: 2 },
        { text: '营销人员', value: 3 },
    ];
    isCodeEValid: boolean = false;
    constructor(injector: Injector, private employeeService: EmployeeServiceProxy, private fb: FormBuilder,
        private modal: NzModalService
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.forme = this.fb.group({
            code: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            name: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            position: [null, [Validators.required]],
            phone: [null, Validators.compose([Validators.pattern('^1[3|4|5|7|8|9][0-9]{9}$')])],
            company: [null, Validators.compose([Validators.maxLength(200)])],
            department: [null, Validators.compose([Validators.maxLength(200)])],
            isactive: [true],
        });
    }

    /**
     * 显示模态框（进入新增页）
     * @param id 员工id
     */
    show(id: string) {
        this.emodalVisible = true;
        this.employeee = new Employee();
        this.getEmployeeById(id);
    }

    /**
     * 根据员工id
     * @param id 
     */
    getEmployeeById(id: string) {
        this.employeeService.get(id).subscribe((result: Employee) => {
            this.employeee = result;
        });

    }
    /**
     * 
     * @param name 
     */
    getFormControl(name: string) {
        return this.forme.controls[name];
    }

    /**
     * 取消按钮事件
     */
    ehandleCancel = (e) => {
        this.emodalVisible = false;
        this.iseConfirmLoading = false;
        this.reset();
    }
    reset(e?): void {
        if (e) {
            e.preventDefault();
        }
        this.forme.reset();
        for (const key in this.forme.controls) {
            this.forme.controls[key].markAsPristine();
        }

    }
    /**
     * 保存员工信息
     */
    savee() {
        //检查form验证
        for (const i in this.forme.controls) {
            this.forme.controls[i].markAsDirty();
        }
        if (this.forme.valid) {
            this.iseConfirmLoading = true;
            this.employeeService.CheckCode(this.employeee.code, this.employeee.id).subscribe((isCode: boolean) => {
                if (isCode) {
                    this.employeeService.update(this.employeee)
                        .finally(() => {
                            this.iseConfirmLoading = false;
                        })
                        .subscribe(() => {
                            this.notify.info(this.l('保存成功！'));
                            this.emodalVisible = false;
                            this.modalSave.emit(null);
                        });
                } else {
                    this.iseConfirmLoading = false;
                    // this.isCodeEValid = true;
                    this.notify.error('员工编码已存在');
                }
            });
        }
    }
}
