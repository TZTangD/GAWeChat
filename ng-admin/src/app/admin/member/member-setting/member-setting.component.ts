import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MemberConfigs } from '@shared/entity/member/memberconfig';
import { Router } from '@angular/router';
import { MemberConfigsServiceProxy, PagedResultDtoOfMemberConfigs } from '@shared/service-proxies/member/memberconfigs-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { ConfigCode } from '@shared/entity/member/configcode';
import { MessageEmployeeModalComponent } from './message-employee-modal/message-employee-modal.component';
import { WechatUser, WechatUserDto } from '@shared/entity/wechat';
import { EllipsisComponent } from '@delon/abc';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    moduleId: module.id,
    selector: 'member-setting',
    templateUrl: 'member-setting.component.html',
})
export class MemberSettingComponent extends AppComponentBase implements OnInit {
    @ViewChild('selectsEmployeeModal') selectsEmployeeModal: MessageEmployeeModalComponent;
    modalVisible = false;
    isDisablec = false;
    employeeOpenId: string[] = [];
    stringOpenId: string = '';
    stringName: string = '';
    employeeIds: string[] = [];
    loading = false;
    form: FormGroup;
    config: MemberConfigs[] = [];
    configCode: ConfigCode = new ConfigCode();
    infoConfig: ConfigCode = new ConfigCode();
    users: WechatUser[] = [];
    usersDto: WechatUserDto[] = [];
    wxloading = false;
    constructor(injector: Injector, private fb: FormBuilder,
        private modal: NzModalService, private memberconfigsService: MemberConfigsServiceProxy) {
        super(injector);
    }
    ngOnInit(): void {
        this.configCode.init({ rcCode: 3, cCode: 1, eCode: 2, fCode: 5 });
        this.infoConfig.init({ userCode: 4 });
        this.form = this.fb.group({
            cValue: [null, [Validators.compose([Validators.required, Validators.pattern(/^([1-9]\d*|0)(\.\d*[1-9])?$/)])]],
            rcValue: [null, [Validators.compose([Validators.required, Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/)])]],
            eValue: [null, [Validators.compose([Validators.required, Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/), Validators.min(0)])]],
            fValue: [null, [Validators.compose([Validators.required, Validators.pattern(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/), Validators.min(0)])]]
        });
        this.getMemberConfigsByTenantId();
        this.getWXInfoConfigsByTenantId();
    }
    getFormControl(id: string) {
        return this.form.controls[id];
    }

    /**
     * 通过租户id获取积分配置
     */
    getMemberConfigsByTenantId() {
        this.memberconfigsService.getMemberConfigs().subscribe((result: PagedResultDtoOfMemberConfigs) => {
            this.config = result.items;
            this.config.map(i => {
                if (i.code == 5) {
                    this.configCode.fValue = i.value;
                    this.configCode.fId = i.id;
                }
                if (i.code == 3) {
                    this.configCode.rcValue = i.value;
                    this.configCode.rcId = i.id;
                }
                if (i.code == 2) {
                    this.configCode.eValue = i.value;
                    this.configCode.eId = i.id;
                }
                if (i.code == 1) {
                    this.configCode.cValue = i.value;
                    this.configCode.cId = i.id;
                }
            });
        });
    }

    // getWXInfoConfigsByTenantId() {
    //     this.memberconfigsService.getMemberConfigs().subscribe((result: PagedResultDtoOfMemberConfigs) => {
    //         this.config = result.items;
    //         this.config.forEach(i => {
    //             if (i.code == 4) {       
    //                 if (i.desc != null) {
    //                     this.employeeIds = i.desc.split(',');
    //                     this.employeeOpenId = i.value.split(',');
    //                 } else {
    //                     this.employeeIds = [];
    //                     this.employeeOpenId = [];
    //                 }
    //                 this.infoConfig.userValue = i.value;
    //                 this.infoConfig.userId = i.id;
    //                 this.infoConfig.desc = i.desc;
    //             }
    //         })
    //     });
    // }

    getWXInfoConfigsByTenantId() {
        this.memberconfigsService.getMemberConfigs().subscribe((result: PagedResultDtoOfMemberConfigs) => {
            this.config = result.items;
            this.usersDto = [];
            let splOpenId = [];
            let splName = [];
            this.config.forEach(i => {
                if (i.code == 4) {
                    if (i.desc != null && i.value.length != 0) {
                        splOpenId = i.value.split(',');
                        splName = i.desc.split(',');
                    }
                    this.infoConfig.userValue = i.value;
                    this.infoConfig.userId = i.id;
                    this.infoConfig.desc = i.desc;
                    splOpenId.forEach((v, index) => {
                        this.usersDto.push({
                            openId: splOpenId[index],
                            userName: splName[index]
                        })
                    })
                }
            })
        });
    }

    /**
     * 保存微信用户
     */
    saveWXInfo() {
        // this.infoConfig.userValue = this.employeeOpenId.join(',');
        // this.infoConfig.desc = this.employeeIds.join(',');
        // this.memberconfigsService.updateWXinfo(this.infoConfig).subscribe(() => {
        //     this.notify.info(this.l('保存成功！'));
        //     this.getWXInfoConfigsByTenantId();
        // });
        this.stringName = '';
        this.stringOpenId = '';
        // this.users.forEach(v => {
        //     this.stringOpenId += v.openId + ',';
        // });
        // this.users.forEach(v => {
        //     this.stringName += v.userName + ',';
        // });
        this.usersDto.forEach(v => {
            this.stringOpenId += v.openId + ',';
        });
        this.usersDto.forEach(v => {
            this.stringName += v.userName + ',';
        });
        if (this.stringOpenId != null || this.stringOpenId.length >= 0) {
            this.infoConfig.userValue = this.stringOpenId.substring(0, this.stringOpenId.length - 1);
        }
        if (this.stringName != null || this.stringName.length != 0) {
            this.infoConfig.desc = this.stringName.substring(0, this.stringName.length - 1);
        }
        this.wxloading = true;
        this.memberconfigsService.updateWXinfo(this.infoConfig).subscribe(() => {
            this.notify.info(this.l('保存成功！'));
            this.getWXInfoConfigsByTenantId();
            this.wxloading = false;
        });
    }

    /**
     * 保存配置信息
     */
    save() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this.loading = true;
            this.memberconfigsService.update(this.configCode).subscribe(() => {
                this.notify.info(this.l('保存成功！'));
                this.getMemberConfigsByTenantId();
                this.loading = false;
            });
        }
        abp.multiTenancy.setTenantIdCookie();
    }

    /**
 * 显示员工列表模态框
 */
    employee(): void {
        this.selectsEmployeeModal.show();
    }

    cancel() {
        this.usersDto = [];
        this.users = [];
        this.stringName = '';
        this.stringOpenId = '';
    }

    // cancel() {
    //     this.employeeIds.splice(0, this.employeeIds.length);
    //     this.employeeIds = [];
    //     this.employeeOpenId.splice(0, this.employeeOpenId.length);
    //     this.employeeOpenId = [];
    // }
    /**
     * 模态框返回
     */
    // getSelectData = (employee?: WechatUser[]) => {
    //     // var employeeIds = employee.map(v => {
    //     //     if (v)
    //     //         return v;
    //     //     else
    //     //         return null;
    //     // });
    //     // var refIds = employeeIds.map(v => v.openId)
    //     for (var i = 0; i < employee.length; i++) {
    //         // alert('这是已经存在的id' + this.employeeOpenId.toString());
    //         if (this.employeeOpenId.toString().indexOf(employee[i].openId.toString()) == -1) {
    //             // alert('相等吗?' + this.employeeOpenId.toString().indexOf(employee[i].openId.toString()));
    //             // this.employeeOpenId = this.employeeOpenId.concat(employeeIds.map(v => v.openId));
    //             // this.employeeIds = this.employeeIds.concat(employeeIds.map(v => v.userName));
    //             this.employeeOpenId = this.employeeOpenId.concat(employee[i].openId);
    //             this.employeeIds = this.employeeIds.concat(employee[i].userName);
    //         }
    //         // alert('这是for出来的id' + employee[i].openId);
    //     }
    //     this.configCode.userId = this.employeeOpenId.join();
    //     this.configCode.desc = this.employeeIds.join();
    //     // alert('相等吗?' + this.employeeOpenId.toString().indexOf(refIds.toString()));
    //     // if (this.employeeOpenId.toString().indexOf(refIds.toString()) == -1) {
    //     //     this.employeeOpenId = this.employeeOpenId.concat(employeeIds.map(v => v.openId));
    //     //     this.employeeIds = this.employeeIds.concat(employeeIds.map(v => v.userName));
    //     // }
    // }

    /**
     * 排重
     */
    // existsEmployee(openId: string): boolean {
    //     let bo = false;
    //     this.users.forEach(element => {
    //         if (element.openId == openId) {
    //             bo = true;
    //             return;
    //         }
    //     });
    //     return bo;
    // }
    existsEmployee(openId: string): boolean {
        let bo = false;
        this.usersDto.forEach(element => {
            if (element.openId == openId) {
                bo = true;
                return;
            }
        });
        return bo;
    }

    // getSelectData = (employees?: WechatUser[]) => {
    //     if (this.users.length != 0) {
    //         employees.forEach(element => {
    //             if (!this.existsEmployee(element.openId)) {
    //                 this.users.push(element);
    //             }
    //         });
    //     }
    //     else {
    //         this.users.push(...employees);
    //     }
    // }
    getSelectData = (employees?: WechatUser[]) => {
        employees.forEach(element => {
            if (!this.existsEmployee(element.openId)) {
                this.usersDto.push({ openId: element.openId, userName: element.userName });
            }
        });
    }

    // onClose(event: Event, openId: string): void {
    //     let i = 0;
    //     this.users.forEach(element => {
    //         if (element.openId == openId) {
    //             this.users.splice(i, 1);
    //             return;
    //         }
    //         i++;
    //     });
    //     console.table(this.users);
    // }
    onClose(event: Event, openId: string): void {
        let i = 0;
        this.usersDto.forEach(element => {
            if (element.openId == openId) {
                this.usersDto.splice(i, 1);
                return;
            }
            i++;
        });
    }
}