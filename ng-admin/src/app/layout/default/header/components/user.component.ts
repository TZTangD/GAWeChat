import { Component, OnInit, Inject, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
//abp集成 2018-1-14
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AppComponentBase } from '@shared/app-component-base';
import { ChangePasswordComponent } from '../../change-password/change-password.component';

@Component({
    selector: 'header-user',
    template: `
    <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
            <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
            {{settings.user.name}}
        </div>
        <div nz-menu class="width-sm">
            <div nz-menu-item (click)="changePassword()"><i class="anticon anticon-setting mr-sm"></i>修改密码</div>
            <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
        </div>
    </nz-dropdown>
    <change-password-modal #changePasswordModal1 (modalSave)="callBack()"></change-password-modal>
    `
})
export class HeaderUserComponent extends AppComponentBase implements OnInit  {

    @ViewChild('changePasswordModal1') changePasswordModal: ChangePasswordComponent;

    constructor(injector: Injector, 
        public settings: SettingsService,
        private router: Router,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private _authService: AppAuthService) {
            super(injector);
        }

    ngOnInit(): void {
        /*this.tokenService.change().subscribe((res: any) => {
            this.settings.setUser(res);
        });
        // mock
        const token = this.tokenService.get() || {
            token: 'nothing',
            name: 'Admin',
            avatar: './assets/img/zorro.svg',
            email: 'cipchk@qq.com'
        };
        this.tokenService.set(token);*/
    }

    logout() {
        //this.tokenService.clear();
        //this.router.navigateByUrl(this.tokenService.login_url);
        this._authService.logout();
    }

    changePassword(){
        this.changePasswordModal.show();
    }
  
    callBack(): void {
  
    }
}
