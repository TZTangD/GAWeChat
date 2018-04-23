import { Component, Injector, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
//集成abp 2018-1-14
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent extends AppComponentBase {
  constructor(injector: Injector, public settings: SettingsService, public msgSrv: NzMessageService, private _authService: AppAuthService) {
    super(injector);
    //alert(JSON.stringify(settings.user))
  }

  @ViewChild('changePasswordModal') changePasswordModal: ChangePasswordComponent;

  logout(): void {
    this._authService.logout();
  }

  changePassword(): void {
    this.changePasswordModal.show();
  }

  callBack(): void {

  }
}
