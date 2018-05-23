import {Component, Injector, OnInit, ViewEncapsulation} from '@angular/core';
import {AppComponentBase} from '../../../components/app-component-base';
import {JWeiXinService, ToptipsService} from 'ngx-weui';
import {Router} from '@angular/router';
import {ArticleService} from '../../../../services';

@Component({
    selector: 'share-write',
    templateUrl: './share-write.component.html',
    styleUrls: ['./share-write.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShareWriteComponent extends AppComponentBase implements OnInit {
    res: any = {};

    constructor(injector: Injector
        , private wxService: JWeiXinService
        , private router: Router
        , private shareService: ArticleService
        , private srv: ToptipsService) {
        super(injector);
    }

    ngOnInit(): void {
    }

    onSave() {
        if (this.checkData()) {
            const params: any = {
                openId: this.settingsService.openId,
                phone: this.res.phone,
                userName: this.res.userName,
                content: this.res.content,
                title: this.res.title
            };
            this.shareService.CreatWXManuscript(params).subscribe(result => {
                if (result != null && result.code == 0) {
                    this.goSuccess();
                } else {
                    this.srv['warn']('提交失败,请重试');
                }
            });
        }
    }

    goSuccess() {
        this.router.navigate(['shares/share-success']);
    }

    checkData() {
        if (this.res.phone == undefined) {
            this.srv['warn']('请填写手机号');
            return false;
        } else if (this.res.userName == undefined) {
            this.srv['warn']('请填写姓名');
            return false;
        } else if (this.res.title == undefined) {
            this.srv['warn']('请填写标题');
            return false;
        } else if (this.res.content == undefined) {
            this.srv['warn']('请填写分享内容');
            return false;
        } else {
            return true;
        }
    }
}
