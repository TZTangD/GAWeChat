import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { AppSessionService } from '@shared/session/app-session.service';
import { ShopServiceProxy } from '@shared/service-proxies/customer-service';
import { HomeInfo } from '@shared/service-proxies/entity';
import { SettingsService } from '@delon/theme';

import { UploadFile } from 'ng-zorro-antd';

@Component({
    selector: 'app-home-index',
    templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

    homeInfo: HomeInfo = new HomeInfo();
    constructor(private http: _HttpClient, public msg: NzMessageService, private _appSessionService: AppSessionService,
        private shopServiceProxy: ShopServiceProxy, private settings: SettingsService) { }

    todoData: any[] = [
        { completed: true, avatar: '1', name: '苏者名', content: `订货流程是什么样的？` },
        { completed: false, avatar: '2', name: '杨太', content: `我想咨询如何订货` },
        { completed: false, avatar: '3', name: '李红', content: `我想咨询如何参加本次活动` },
        { completed: false, avatar: '4', name: '曾开', content: `你们的营销电话是多少` }
    ];

    quickMenu = false;

    webSite: any[] = [];
    salesData: any[] = [];
    offlineChartData: any[] = [];
    roleName: string = '';

    previewImage = '';
    previewVisible = false;

    fileList = [];

    ngOnInit() {
        //近12个月申请单数 (模拟数据)
        const sd = [];
        for (let i = 0; i < 12; i += 1) {
            sd.push({
                x: `${i + 1}月`,
                y: Math.floor(Math.random() * 1000) + 200
            });
        }

        this.salesData = sd;
        //24小时网站访问量和活动申请单笔数 (模拟数据)
        const od = [];
        for (let i = 0; i < 20; i += 1) {
            od.push({
                x: new Date().getTime() + 1000 * 60 * 30 * i,
                y1: Math.floor(Math.random() * 100) + 10,
                y2: Math.floor(Math.random() * 100) + 10
            });
        }

        this.offlineChartData = od;


        let roles = this._appSessionService.roles;
        if (roles.includes('HostAdmin')) {
            this.roleName += '系统管理员';
        }
        if (roles.includes('Admin')) {
            this.roleName += '管理员';
        }

        if (roles.includes('MarketingCenter')) {
            this.roleName += ' 营销中心';
        }

        if (roles.includes('CustomerManager')) {
            this.roleName += ' 客户经理';
        }
        this.getFormInfo();
    }

    getFormInfo() {
        this.shopServiceProxy.getHomeInfo().subscribe((result) => {
            this.homeInfo = result;
        })
    }

    handlePreview = (file: UploadFile) => {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    }
}
