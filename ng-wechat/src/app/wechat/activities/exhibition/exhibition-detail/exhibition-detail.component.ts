import { Component, ViewEncapsulation, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../components/app-component-base';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService, AppConsts } from '../../../../services';
import { ExhibitionShop, Exhibition, VoteLog } from '../../../../services/model';
import { ToptipsService, ToastComponent, ToastService, DialogComponent, DialogService, DialogConfig, SkinType } from 'ngx-weui';
import { DialogModule } from 'ngx-weui';

@Component({
    moduleId: module.id,
    selector: 'exhibition-detail',
    templateUrl: 'exhibition-detail.component.html',
    styleUrls: ['exhibition-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ExhibitionDetailComponent extends AppComponentBase implements OnInit {
    exhibitionShop: ExhibitionShop = new ExhibitionShop();
    picIds: string[] = [];
    voteLog: VoteLog = new VoteLog();
    total: number = 0;
    shopTotal: number = 0;
    hostUrl: string = AppConsts.remoteServiceBaseUrl;
    id: string = this.route.snapshot.params['id'];
    currentDayVote: number = this.route.snapshot.params['currentDayVote'];
    frequency: number = this.route.snapshot.params['frequency'];
    voteTotal: number = this.route.snapshot.params['voteTotal'];
    shopId: string = this.route.snapshot.params['shopId'];
    shopQrUrl: string = null;
    shareConfig: DialogConfig = {};
    content = '';
    share: any;
    // private DEFCONFIG: DialogConfig = <DialogConfig>{
    //     confirm: '注册会员',
    // };
    DEFCONFIG: DialogConfig = <DialogConfig>{
    };
    config: DialogConfig = {};
    @ViewChild('success') successToast: ToastComponent;
    @ViewChild('ios') iosAS: DialogComponent;
    constructor(injector: Injector, private router: Router,
        private route: ActivatedRoute, private articleService: ArticleService,
        private srv: ToptipsService, private srvt: ToastService, private dia: DialogService
    ) {
        super(injector);
    }
    ngOnInit() {
        this.getExhibitionShopDetail(this.id);
        this.getShopQrUrl();
    }

    getExhibitionShopDetail(id: string) {
        this.articleService.GetWXExhibitionShopsByIdAsync(id).subscribe((result: ExhibitionShop) => {
            this.exhibitionShop = result;
            if (result.picPath != '') {
                this.picIds = this.exhibitionShop.picPath.split(',');
            }
        });
    }
    onShowBySrv(type: SkinType, backdrop: boolean = true) {
        this.DEFCONFIG = {
            confirm: '注册会员',
        };
        this.config = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
            skin: type,
            backdrop: backdrop,
            content: '您今天已经超过投票限制了。温馨提示:注册会员，买烟积分，享更多活动机会。赶快去注册吧!'
        });
        this.dia.show(this.config).subscribe((res: any) => {
            if (res.value == true) {
                this.router.navigate(["/personals/bind-member"]);
            }
        });
        return false;
    }
    voteAdd(id: string, type: 'success' | 'loading', forceHide: boolean = false) {
        if (this.settingsService.openId) {
            if (this.currentDayVote < this.frequency) {
                this.exhibitionShop.votes++;
                this.voteTotal++;
                this.currentDayVote++;
                this.voteLog.openId = this.settingsService.openId;
                this.voteLog.exhibitionId = id;
                this.articleService.AddVoteLogAsync(this.voteLog).subscribe(data => {
                    if (data && data.code === 0) {
                    } else if (data && data.code === 999) {
                        this.voteTotal--;
                        this.exhibitionShop.votes--;
                        this.currentDayVote--;
                        // this.srv['warn']('活动已过期');
                        this.srvt['loading']('活动已过期', 0);
                    } else if (data && data.code === 888) {
                        this.voteTotal--;
                        this.exhibitionShop.votes--;
                        this.currentDayVote--;
                        // this.srv['warn']('活动尚未开始');
                        this.srvt['loading']('活动尚未开始哦', 0);
                    }
                    else {
                        this.voteTotal--;
                        this.exhibitionShop.votes--;
                        this.currentDayVote--;
                        this.srvt['loading']('请重试');
                    }
                });
            } else {
                // this.srvt[type]('您今天已经超过投票限制了哦', 0);
                this.onShowBySrv('ios', false);
            }
        }
        else {
            this.DEFCONFIG = <DialogConfig>{
                skin: 'auto',
                backdrop: true,
                cancel: null,
                confirm: null,
            };
            this.content = '<div class="mdiv"><p>' + this.exhibitionShop.shopName + '</p><div><img class="qrcode" src="' + AppConsts.remoteServiceBaseUrl + this.shopQrUrl + '"></div><p>长按识别二维码</br>关注公众号后方可投票</p></div>';
            this.shareConfig = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
                content: this.content,
            });
            this.dia.show(this.shareConfig).subscribe((res: any) => {
            });
        }
    }

    getShopQrUrl() {
        this.articleService.GetQRUrlByShopId(this.shopId).subscribe(result => {
            this.shopQrUrl = result;
        });
    }

    alertShare() {
        this.DEFCONFIG = <DialogConfig>{
            skin: 'auto',
            backdrop: true,
            cancel: null,
            confirm: null,
        };
        this.content = '<p class="textFir">请点击右上角↗</p><p class="textSec">通过【发送给朋友】</p><p class="textThi">选择想要邀请的朋友吧！</p>';
        this.shareConfig = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
            content: this.content,
        });
        this.dia.show(this.shareConfig).subscribe((res: any) => {
        });
    }
    goBack() {
        this.router.navigate(["/exhibitions/exhibition"]);
    }
}
