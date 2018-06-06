import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { AppSessionService } from '@shared/session/app-session.service';
import { ShopServiceProxy } from '@shared/service-proxies/customer-service';
import { HomeInfo, Parameter } from '@shared/service-proxies/entity';
import { SettingsService } from '@delon/theme';

import { UploadFile } from 'ng-zorro-antd';
import { AdviseService, PagedResultDtoOfAdvise } from '@shared/service-proxies/consumer-service/advise-service';
import { Advise } from '@shared/entity/consumer';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-index',
    templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
    adviseList: Advise[] = [];
    homeInfo: HomeInfo = new HomeInfo();
    constructor(private _adviseService: AdviseService, private http: _HttpClient, public msg: NzMessageService, private _appSessionService: AppSessionService,
        private shopServiceProxy: ShopServiceProxy, private settings: SettingsService, private _router: Router) { }

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
        this.getAdvise();
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

    /**
     * 获取最新五条意见反馈
     */
    getAdvise() {
        this._adviseService.getAll(0, 5, this.getParameter()).subscribe((result: PagedResultDtoOfAdvise) => {
            this.adviseList = result.items;
        })
    }
    getParameter(): Parameter[] {
        let parray = [];
        parray.push(Parameter.fromJS({}));
        return parray;
    }

    /**
     * 反馈详情
     * @param advise 
     */
    adviseDetail(advise: Advise) {
        this._router.navigate(['admin/consumer/advise-detail', advise.id]);
    }
}
