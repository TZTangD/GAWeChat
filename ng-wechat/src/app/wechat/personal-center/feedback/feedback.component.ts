import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';
import { FeedBack, WechatUser } from '../../../services/model';
import { ToptipsService, Uploader, UploaderOptions, FileItem } from 'ngx-weui';
import { Router } from '@angular/router';
import { SettingsService, FeedBackService, AppConsts } from '../../../services';

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
    photos: any = [];
    //图片上传
    img: any;
    imgShow: boolean = false;

    uploader: Uploader = new Uploader(<UploaderOptions>{
        url: AppConsts.remoteServiceBaseUrl + '/WeChatFile/FilesPosts?folder=feedback',
        auto: true,
        limit: 4,
        size: -1,
        // onUploadStart: ((file: FileItem) => {
        //     if (file.file.size > 153600) {
        //         this.srv['warn']('文件必须小于等于150KB');
        //         file.cancel();
        //     }
        // }),
        onUploadSuccess: ((file: FileItem, response: string) => {
            //console.log('onUploadSuccess-' + response);
            let data = JSON.parse(response);

            if (data && data.success == true) {
                this.photos.push({ url: data.result, img: file._file.name });

            }
        }),
        onError: (() => {
            this.srv['warn']('检查文件大小是否超过限制');
        }),
    });
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
        this.feedback.photoUrl = '';
        this.photos.forEach(element => {
            this.feedback.photoUrl += element.url + ',';
        });
        this.feedback.photoUrl = this.feedback.photoUrl.substring(0, this.feedback.photoUrl.length - 1);
        this.feedbackService.createOrUpdateFeedBack(this.feedback).subscribe(data => {
            this.loading = false;
            if (data && data.code === 0) {
                // this.srv['success']('提交成功');
                this.router.navigate(['/feedbacks/feedback-success', { successType: 'feedback' }]);
            } else {
                this.srv['warn']('提交失败，请重试');
            }
        });


    }

    onGallery(item: any) {
        this.img = [{ file: item._file, item: item }];
        this.imgShow = true;
    }
    onDel(item: any) {
        if (item) {
            this.uploader.removeFromQueue(item.item);
            for (var i = 0; i < this.photos.length; i++) {
                if (this.photos[i].img === item.file.name) {
                    this.photos.splice(i, 1);
                    return;
                }
            }
        }
    }
}
