import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { FeedBack, WechatUser } from '../../../services/model';
import { ToptipsService } from 'ngx-weui';
import { Router } from '@angular/router';
import { SettingsService, FeedBackService } from '../../../services';

@Component({
    moduleId: module.id,
    selector: 'feedback',
    templateUrl: 'feedback.component.html',
    styleUrls: ['feedback.component.scss']
})
export class FeedbackComponent extends AppComponentBase implements OnInit {

    feedback: FeedBack = new FeedBack();
    user: WechatUser = new WechatUser();
    loading = false;
    constructor(injector: Injector, private feedbackService: FeedBackService,
        private srv: ToptipsService, private router: Router) {
        super(injector);
    }

    ngOnInit(): void {
        this.getCurrentUser();
    }

    /**
     * 获取当前登录人信息
     */
    getCurrentUser() {
        this.settingsService.getUser().subscribe(result => {
            this.user = result;
            this.feedback.userTypeName = result.userTypeName;
            this.feedback.phone = result.phone;
            this.feedback.openId = this.user.openId;
        });
    }

    /**
     * 保存
     */
    save() {
        this.loading = true;
        this.feedbackService.createOrUpdateFeedBack(this.feedback).subscribe(data => {
            this.loading = false;
            if (data && data.code === 0) {
                // this.srv['success']('提交成功');
                this.router.navigate(['/feedbacks/feedback-success']);
            } else {
                this.srv['warn']('提交失败，请重试');
            }
        });
    }
}
