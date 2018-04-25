import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from '@shared/service-proxies/entity/employee';
import { EmployeeServiceProxy, PagedResultDtoOfEmployee } from '@shared/service-proxies/marketing-service/employee-service';
import { EmployeesServiceProxy } from '@shared/service-proxies/service-proxies';
import { Parameter } from '@shared/service-proxies/entity';

@Component({
    moduleId: module.id,
    selector: 'employee-modal',
    templateUrl: 'employee-modal.component.html',
})
export class EmployeeModalComponent implements OnInit {
    @Output() modalSelect: EventEmitter<any> = new EventEmitter<any>();

    q: any = {
        pi: 1,
        ps: 10,
        total: 0,
        sorter: '',
        status: -1,
        statusList: [],
        no: ''
    };
    eloading = false;
    emodalVisible = false;
    employee: Employee[] = [];
    status = [
        { text: '启用', value: false, type: 'success' },
        { text: '禁用', value: false, type: 'default' }
    ];
    positions = [
        { text: '零售客户', value: 1 },
        { text: '客户经理', value: 2 },
        { text: '营销人员', value: 3 },
        { text: '消费者', value: 4 },
        { text: '取消关注', value: 5 },
    ];
    isManger=false;
    constructor(private employeeService: EmployeeServiceProxy, private service: EmployeesServiceProxy) {

    }
    ngOnInit(): void {

    }
    //isManger用判断模态框是否只显示经理级的员工
    show(isManger=false) {
        this.isManger=isManger
        this.employee = new Array<Employee>();
        // this.employee=[];
        this.emodalVisible = true;
        this.refreshData();
    }

    /**
     * 获取
     */
    refreshData() {
        this.eloading = true;
        this.service.getAllModal(this.getParameter()).subscribe((result: PagedResultDtoOfEmployee) => {
            this.eloading = false;
            let status = 5;
            this.employee = result.items;
            this.q.total = result.totalCount;
        });
    }
    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Filter', value: this.q.no }));
        arry.push(Parameter.fromJS({ key: 'IsManger', value: this.isManger }));
        return arry;
    }

    /**
     * 取消按钮事件
     */
    handleeCancel = (e) => {
        this.emodalVisible = false;
        // this.isConfirmLoading = false;
        // this.reset(e);
        this.modalSelect.emit(null);
        this.q.no = '';
    }
    /**
     * 
     * @param employee 选择事件（对选择的数据进行回传）
     */
    SelectEmployee(employee: Employee): void {
        this.q.no = '';
        this.modalSelect.emit(employee);
        this.emodalVisible = false;
    }

}
