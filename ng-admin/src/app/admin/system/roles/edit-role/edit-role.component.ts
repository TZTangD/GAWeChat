import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { RoleServiceProxy, ListResultDtoOfPermissionDto, CreateRoleDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    moduleId: module.id,
    selector: 'edit-role-modal',
    templateUrl: 'edit-role.component.html',
})
export class EditRoleComponent extends AppComponentBase implements OnInit {
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    loading: boolean = false;
    modalVisible: boolean = false;
    isConfirmLoading = false;
    //form表单
    form: FormGroup;
    //所有权限
    permissions: ListResultDtoOfPermissionDto = null;
    //权限(用于权限数据格式转换)
    permissionsConvert: any[];
    //当前角色
    role: RoleDto = null;
    constructor(injector: Injector, private service: RoleServiceProxy, private fb: FormBuilder,
    ) {
        super(injector);
        // this.role=new CreateRoleDto();
        // this.permissions=new ListResultDtoOfPermissionDto();
    }
    /**
     * 页面初始加载
     */
    ngOnInit(): void {

        this.getPermissionAll();
        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(2)])],
            displayName: [null, Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(2)])],
            description: [null],
            editpermissiongroup: [null]
        }, );
    }
    /**
     * 页面初始显示
     * @param id 角色id
     */
    show(id: number): void {
        this.modalVisible = true;
        this.role = new RoleDto();
        this.role.init({
            isStatic: false
        });
        //角色数据获取
        this.service.get(id)
            .subscribe(
                (result) => {
                    this.role = result;
                    this.permissionsConvert = this.permissions.items.map(i => { return { label: i.displayName, value: i.id, checked: true,name:i.name}; });
                    console.log(this.permissions.items);
                    this.roleInPerssion();
                    this.loading = false;
                });
    }

    /**
     * 将角色存在的权限设为选中
     */
    roleInPerssion() {
        this.permissionsConvert.forEach(permissiond => {
            if (this.role.permissions.indexOf(permissiond.name) !== -1) {
                permissiond.checked = true;
            } else {
                permissiond.checked = false;
            }
        });
        console.log(this.permissions);
    }
    /**
     * 获取权限信息
     */
    getPermissionAll() {
        this.service.getAllPermissions()
            .subscribe((permissions: ListResultDtoOfPermissionDto) => {
                this.permissions = permissions;
                this.permissionsConvert = this.permissions.items.map(i => { return { label: i.displayName, value: i.id, checked: true,name:i.name }; });
            });
    }
    /**
     * 
     * @param name 
     */
    getFormControl(name: string) {
        return this.form.controls[name];
    }

    /**
     * 取消按钮事件
     */
    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;

    }

    /**
     * 取消按钮事件
     * @param e 
     */
    reset(e?): void {
        if (e) {
            e.preventDefault();
        }
        this.form.reset();
        for (const key in this.form.controls) {
            this.form.controls[key].markAsPristine();
        }
    }

    /**
     * 保存角色信息
     */
    save(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        console.log('log', this.form.value);
        if (this.form.valid) {
            var permissions = [];

            this.permissionsConvert.forEach((permission) => {
                if (permission.checked) {
                    permissions.push(permission.name);
                }
            });

            this.role.permissions = permissions;
            this.isConfirmLoading = true;
            this.service.update(this.role)
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
        //this.modal.hide();
    }
}
