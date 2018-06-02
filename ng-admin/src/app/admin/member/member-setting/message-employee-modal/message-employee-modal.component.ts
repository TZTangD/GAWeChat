import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeServiceProxy, PagedResultDtoOfEmployee } from '@shared/service-proxies/marketing-service/employee-service';
import { EmployeesServiceProxy } from '@shared/service-proxies/service-proxies';
import { Parameter } from '@shared/service-proxies/entity';
import { WechatUser } from '@shared/entity/wechat';
import { WechatUserServiceProxy, PagedResultDtoOfWeChatUser } from '@shared/service-proxies/wechat-service';
import { FormBuilder } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'message-employee-modal',
    templateUrl: 'message-employee-modal.component.html',
})
export class MessageEmployeeModalComponent implements OnInit {
    @Output() modalSelect: EventEmitter<any> = new EventEmitter<any>();

    q: any = {
        pi: 0,
        ps: 10,
        total: 0,
        sorter: 'OpenId',
        status: -1,
        statusList: [],
        no: ''
    };
    eloading = false;
    emodalVisible = false;
    employee: WechatUser[] = [];
    status = [
        { text: '启用', value: false, type: 'success' },
        { text: '禁用', value: false, type: 'default' }
    ];
    isManger = false;
    constructor(private wechatUserService: WechatUserServiceProxy) {
    }

    ngOnInit(): void {
    }
    //isManger用判断模态框是否只显示经理级的员工
    show(isManger = false) {
        this.isManger = isManger
        this.employee = new Array<WechatUser>();
        this.emodalVisible = true;
        // this.refreshData();
    }

    /**
     * 获取
     */
    refreshData() {
        this.eloading = true;
        this.wechatUserService.getAll(this.q.pi, this.q.ps, this.getParameter()).subscribe((result: PagedResultDtoOfWeChatUser) => {
            this.eloading = false;
            // let status = 5;
            this.employee = result.items;
            this.q.total = result.totalCount;
        });
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'UserName', value: this.q.no }));
        arry.push(Parameter.fromJS({ key: 'Sorting', value: this.q.sorter }));
        arry.push(Parameter.fromJS({ key: 'UserType', value: 2 }));
        return arry;
    }

    /**
     * 取消按钮事件
     */
    handleeCancel = (e) => {
        this.emodalVisible = false;
        this.eloading = false;
        this.q.no = '';
    }
    /**
     * 
     * @param employee 选择事件（对选择的数据进行回传）
     */
    SelectEmployee() {
        this.q.no = '';
        var employeeId = this.employee.filter(v => v.selected);
        // var employeeIds = employeeId.map(v => {
        //     return v.userName;
        // }).join(',');
        this.modalSelect.emit(employeeId);
        this.emodalVisible = false;
    }

}
