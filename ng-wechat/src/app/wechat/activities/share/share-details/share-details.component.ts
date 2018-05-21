///<reference path="../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
<<<<<<< HEAD
import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '../../../components/app-component-base';
import { ShareService } from '../../../../services/share/share.services';
import { JWeiXinService } from 'ngx-weui/jweixin';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../../services/model';
=======
import {Component, Injector, OnInit, ViewEncapsulation} from '@angular/core';
import {AppComponentBase} from '../../../components/app-component-base';
import {JWeiXinService} from 'ngx-weui/jweixin';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../../../../services/model';
import {ArticleService} from '../../../../services';
>>>>>>> dev

@Component({
    selector: 'share-details',
    templateUrl: './share-details.component.html',
    styleUrls: ['./share-details.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ShareDetailComponent extends AppComponentBase implements OnInit {
    mDetailsOfShare: Article = new Article();

    constructor(injector: Injector
        , private router: Router
        , private shareService: ArticleService
        , private wxService: JWeiXinService
        , private route: ActivatedRoute) {
        super(injector);
    }

    _shareListId: string = this.route.snapshot.params['id'];
    ngOnInit(): void {
        let params: any = {
            id: this._shareListId,
            tenantId: this.settingsService.tenantId
        };
        this.shareService.GetWXExpByIdAsync(params).subscribe(res => {
            this.mDetailsOfShare = res;
        });
        // let params: any = { id: this.id };
        // if (this.settingsService.tenantId) {
        //     params.tenantId = this.settingsService.tenantId;
        // }
        // this.shareService.GetWXExpByIdAsync(params).subscribe(result => {
        //     this.mDetailsOfShare = result;
        // });
    }


}
