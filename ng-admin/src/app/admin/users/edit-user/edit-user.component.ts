import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { UserServiceProxy, UserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import * as _ from "lodash";
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { Employee } from '@shared/service-proxies/entity/employee';

@Component({
    selector: 'edit-user-modal',
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent extends AppComponentBase implements OnInit {

    @ViewChild('selecteEmployeeModal') selecteEmployeeModal: EmployeeModalComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    modalVisible: boolean = false;
    user: UserDto = null;
    userRoles: RoleDto[] = null;
    roles: any = [];
    isConfirmLoading = false;
    eform: FormGroup;
    loading = false;
    isDisable = false;
    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {

        this.user = new UserDto();
        this.user.init({ isActive: true });
        this.eform = this.fb.group({
            email: [null, [Validators.email]],
            username: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
            name: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
            //surname: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
            isactive: [null],
            editrolegroup: [null]
        }, );
    }

    userInRole(role: RoleDto, user: UserDto): boolean {
        if (user.roleNames.indexOf(role.normalizedName) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }

    userInRoles() {
        this.roles.forEach(role => {
            if (this.user.roleNames.indexOf(role.value) !== -1) {
                role.checked = true;
            }
            else {
                role.checked = false;
            }
        });
    }

    getRoles() {
        this._userService.getRoles()
            .subscribe((result) => {
                this.userRoles = result.items;
                this.roles = this.userRoles.map(i => { return { label: i.name, value: i.normalizedName, checked: true }; });
            });
    }

    show(id: number): void {
        this.getRoles();
        this.modalVisible = true;
        this.loading = true;
        //用户
        this._userService.get(id)
            .subscribe(
                (result) => {
                    this.user = result;
                    //角色
                    //this.roles = this.userRoles.map(i => { return { label: i.name, value: i.normalizedName, checked: this.userInRole(i, this.user) }; });
                    this.roles = this.userRoles.map(i => { return { label: i.name, value: i.normalizedName, checked: true }; });
                    this.userInRoles();
                    this.loading = false;
                    //对isDisable做初始化
                    this.isDisable = false;
                    if (this.user.employeeId) {
                        this.isDisable = true;
                    }
                });

    }

    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.reset(e);
    }

    esave(): void {
        for (const i in this.eform.controls) {
            this.eform.controls[i].markAsDirty();
        }
        console.log('log', this.eform.value);
        if (this.eform.valid) {
            this.isConfirmLoading = true;

            var roles = [];

            this.roles.forEach((role) => {
                if (role.checked) {
                    roles.push(role.value);
                }
            });

            this.user.roleNames = roles;
            this.user.surname = this.user.userName;
            this._userService.update(this.user)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('保存成功！'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }

    close(): void {
        this.modalVisible = false;
    }

    getFormControl(name: string) {
        return this.eform.controls[name];
    }

    reset(e): void {
        if (e) {
            e.preventDefault();
        }
        this.eform.reset();
        for (const key in this.eform.controls) {
            this.eform.controls[key].markAsPristine();
        }
    }
    /**
     * 显示选择员工弹框
     */
    employees() {
        this.selecteEmployeeModal.show();
    }
    /**
     * 选择员工弹框回传数据
     */
    getSelectData = (employee: Employee) => {
        //对isDisable做初始化
        this.isDisable = false;
        if (employee) {
            if (employee.id) {
                this.isDisable = true;
            }
            this.user.name = employee.name;
            this.user.employeeId = employee.id;
        }
        for (const key in this.eform.controls) {
            if (!this.user[key]) {
                this.eform.controls[key].markAsPristine();
            }
        }
    }
}
