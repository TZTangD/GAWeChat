import { Component, OnInit, Injector } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { AppComponentBase } from '@shared/app-component-base';
import { ActivityFormServiceProxy, PagedResultDtoOfPostInfo, ActivityDeliveryInfoServiceProxy } from '@shared/service-proxies/marketing-service';
import { PostInfo, Parameter } from '@shared/service-proxies/entity';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';

@Component({
    moduleId: module.id,
    selector: 'post-info',
    templateUrl: 'post-info.component.html'
})
export class PostInfoComponent extends AppComponentBase implements OnInit {

    postInfos: PostInfo[] = [];
    search: any = { startTime: null, endTime: null, userType: 0, isSend: 0, areaSe: '0' };
    allChecked = false;
    curRows: any[] = [];
    indeterminate = false;
    idList = [];
    loading = false;
    exportLoading = false;
    exportExcelUrl: string;
    userTypeS = [
        { text: '全部', value: 0 },
        { text: '消费者', value: 1 },
        { text: '推荐人', value: 2 }
    ];
    isSends = [
        { text: '全部', value: 0 },
        { text: '是', value: true },
        { text: '否', value: false }
    ];
    areas = [
        { text: '全部', value: '0' },
        { text: '南溪区', value: '南溪区' },
        { text: '宜宾县', value: '宜宾县' },
        { text: '江安县', value: '江安县' },
        { text: '长宁县', value: '长宁县' },
        { text: '高县', value: '高县' },
        { text: '筠连县', value: '筠连县' },
        { text: '珙县', value: '珙县' },
        { text: '兴文县', value: '兴文县' },
        { text: '屏山县', value: '屏山县' },
    ];
    constructor(injector: Injector, private activityFormServie: ActivityFormServiceProxy,
        private activityFormDeliveryService: ActivityDeliveryInfoServiceProxy,
        private modal: NzModalService,
        private _router: Router) {
        super(injector);
    }
    ngOnInit(): void {
        this.refreshData();
    }

    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { startTime: null, endTime: null, userType: 0, isSend: 0, area: '0' };
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.activityFormServie.getAllPostInfo(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfPostInfo) => {
            this.postInfos = result.items.map(i => {
                i.isSendName = i.isSend == false ? '否' : '是';
                i.disabled = i.isSend == true ? true : false;
                // i.checked = false;
                return i;
            });
            this.curRows=result.items;
            this.refreshCheckStatus()
            this.query.total = result.totalCount;
            this.loading = false;
        });
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'FormCode', value: this.search.formCode }));
        arry.push(Parameter.fromJS({ key: 'StartTime', value: this.dateFormat(this.search.startTime) }));
        arry.push(Parameter.fromJS({ key: 'EndTime', value: this.dateFormat(this.search.endTime) }));
        arry.push(Parameter.fromJS({ key: 'ProductSpecification', value: this.search.productSpecification }));
        arry.push(Parameter.fromJS({ key: 'UserType', value: this.search.userType === 0 ? null : this.search.userType }));
        arry.push(Parameter.fromJS({ key: 'Name', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Phone', value: this.search.phone }));
        arry.push(Parameter.fromJS({ key: 'IsSend', value: this.search.isSend === 0 ? null : this.search.isSend }));
        arry.push(Parameter.fromJS({ key: 'AreaSe', value: this.search.areaSe === '0' ? null : this.search.areaSe }));
        return arry;
    }

    // dataChanges(res) {
    //     // console.log('res');
    //     // console.log(res);
    //     this.curRows = res;
    //     this.refreshCheckStatus()
    // }

    refreshCheckStatus() {
        // const allChecked = this.curRows.every(value => value.disabled || value.checked);
        // const allUnChecked = this.curRows.every(value => value.disabled || !value.checked);
        var length = this.curRows.filter(value => !value.disabled).length;
        const allChecked = length > 0 ? this.curRows.filter(value => !value.disabled).every(value => value.checked === true) : false;
        const allUnChecked = this.curRows.filter(value => !value.disabled).every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);

    }
    /**
     * 标记为已邮寄
     */
    markIsSend() {

        //     $("table input[type=checkbox]:checked").map(function (i) {
        //     //    var ss= $(i.target).parents('tr').children("td").eq(i).text()
        //    var ss= $("table tr").eq(i).find("td").eq(1).text();
        //          console.log('checkbox');
        //          console.log(ss);
        //     })
        this.idList = [];
        this.curRows.forEach(i => {
            if (i.checked) {
                this.idList.push(i.id);
            }
        });
        if (this.idList.length > 0) {
            this.activityFormDeliveryService.updateIsSend(this.idList).subscribe(() => {
                this.notify.info(this.l('标记成功！'));
                this.refreshData();
            });
        } else {
            this.notify.warn('请选择需要标记的邮寄信息');
        }
    }

    /**
     * 全选按钮
     * @param value 
     */
    checkAll(value: boolean) {
        // this.postInfos.forEach(i => {
        //     i.isSend = value;
        // });
        this.curRows.forEach(i => {
            if (!i.disabled) {
                i.checked = value;
            }
        });
        this.refreshCheckStatus();
    }
    /**
     * 导出Excel
     */
    exportExcel() {
        this.exportLoading = true;
        let input = JSON.parse(JSON.stringify(this.search));
        if (input.userType === 0) {
            input.userType = null;
        }
        if (input.isSend === 0) {
            input.isSend = null;
        }
        if (input.areaSe === '0') {
            input.areaSe = null;
        }
        this.activityFormServie.exportPostInfoExcel(input).subscribe(result => {
            if (result.code == 0) {
                //var url = 'http://localhost:21021/files/测试客户经理.xlsx';
                var url = AppConsts.remoteServiceBaseUrl + result.data;
                //alert(url)
                document.getElementById('aExcelUrl').setAttribute('href', url);
                document.getElementById('btnHref').click();
            } else {
                this.notify.error(result.msg);
            }
            this.exportLoading = false;
        });
    }

    goDetail(postInfo: PostInfo) {
        this._router.navigate(['admin/activity-form-detail', postInfo.activityFormId]);
    }
}
