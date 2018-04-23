import { Component, OnInit, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { ActivityServiceProxy, PagedResultDtoOfActivity } from "@shared/service-proxies/marketing-service/acticity-service";
import { Activity } from "@shared/service-proxies/entity/acitivity";
import { Parameter } from "@shared/service-proxies/entity";
import { Router } from "@angular/router";
import { ActivityGoodsServiceProxy } from "@shared/service-proxies/marketing-service/activity-goods-service";
import { NzModalService } from "ng-zorro-antd";

@Component({
    moduleId: module.id,
    selector: 'activity-list',
    templateUrl: 'activity-list.component.html',
})
export class ActivityListComponent extends AppComponentBase implements OnInit {

    acticities: Activity[] = [];
    loading = false;
    activityName = '';
    search: any = { startTime: null, endTime: null, status: null, type: null };
    //活动类型下拉数据
    AcTypes = [
        { text: '办事用烟', value: 1 }
    ];
    //活动状态下拉数据
    statuses = [
        { text: '草稿', value: 1 },
        { text: '已发布', value: 2 },
        { text: '已下架', value: 3 }
    ]
    constructor(injector: Injector, private ActivityService: ActivityServiceProxy, private router: Router,
        private ActivityGoodsService: ActivityGoodsServiceProxy,
        private modal: NzModalService,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
    }
    /**
     * 获取活动列表
     * @param reset 是否重置
     */
    refreshData(reset = false,search?:boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search={ startTime: null, endTime: null, status: null, type: null };
        }
        if(search)
        {
            this.query.pageIndex = 1;
        }
        this.query.skipCount()
        this.loading = true;
        this.ActivityService.getAll(this.query.skipCount(), this.query.pageSize, this.getParmeter()).subscribe((result: PagedResultDtoOfActivity) => {
            this.loading = false;
            this.acticities = result.items;
            this.query.total = result.totalCount;
        })
    }
    /**
     * 获取查询条件
     */
    getParmeter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'StartTime', value: this.dateFormat(this.search.startTime) }));
        arry.push(Parameter.fromJS({ key: 'EndTime', value: this.dateFormat(this.search.endTime) }));
        arry.push(Parameter.fromJS({ key: 'Type', value: this.search.type }));
        arry.push(Parameter.fromJS({ key: 'Status', value: this.search.status }));
        return arry;
    }
    /**
     * 创建活动
     */
    createActivity() {
        this.router.navigate(['admin/activity']);
    }
    /**
     * 修改活动
     */
    editActivity(activity: Activity) {
        this.router.navigate(['admin/activity', activity.id]);
    }
    /**
     * 删除活动
     */
    // delete(acticity: Activity, TplContent) {
    //     this.activityName = acticity.name;
    //     this.modal.confirm({
    //         content: TplContent,
    //         okText: '确定',
    //         cancelText: '取消',
    //         onOk: () => {
    //             this.ActivityService.delete(acticity.id).subscribe(() => {
    //                 this.notify.info(this.l('删除成功！'));
    //                 this.refreshData();
    //             });
    //         }
    //     });
    // }
}