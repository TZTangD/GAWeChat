import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { EmployeesServiceProxy, PagedResultDtoOfEmployee } from '@shared/service-proxies/service-proxies';
import { Employee } from '@shared/service-proxies/entity/employee';
import { NzModalService } from 'ng-zorro-antd';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeServiceProxy } from '@shared/service-proxies/marketing-service';
import { Parameter } from '@shared/service-proxies/entity';

@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'employees.component.html',
})
export class EmployeesComponent extends AppComponentBase implements OnInit {

    @ViewChild('editEmployeeModal') editEmployeeModal: EditEmployeeComponent;
    @ViewChild('createEmployeeModal') createEmployeeModal: CreateEmployeeComponent;

    loading = false;
    status = [
        { text: '启用', value: false, type: 'success' },
        { text: '禁用', value: false, type: 'default' },
    ];
    positions = [
        { text: '客户经理', value: 2 },
        { text: '营销人员', value: 3 },
    ];
    employees: Employee[] = [];
    //用于删除框的员工名称显示
    employeeName: string = ''
    search: any = { position: null, name: '' }
    constructor(injector: Injector, private employeeService: EmployeesServiceProxy, private modal: NzModalService) {
        super(injector);
    }

    /**
     * 
     */
    ngOnInit(): void {
        this.refreshData();
    }

    /**
     * 分页获取员工信息
     * @param reset 是否刷新页面
     */
    refreshData(reset = false, search?: boolean) {
        if (reset) {
            this.query.pageIndex = 1;
            this.search = { position: null, name: '' }
        }
        if (search) {
            this.query.pageIndex = 1;
        }
        this.loading = true;
        this.employeeService.getAll(this.query.skipCount(), this.query.pageSize, this.getParameter()).subscribe((result: PagedResultDtoOfEmployee) => {
            this.loading = false;
            let status = 0;
            this.employees = result.items.map(i => {
                if (i.isAction) {
                    status = 0;
                } else {
                    status = 1;
                }
                const statusItem = this.status[status];
                i.activeText = statusItem.text;
                i.activeType = statusItem.type;
                return i;
            });
            this.query.total = result.totalCount;
        });
    }

    /**
     * 删除单个员工
     * @param employee 员工实体
     * @param contentTpl 弹框id
     */
    delete(employee: Employee, contentTpl): void {
        this.employeeName = employee.name;
        this.modal.confirm({
            content: contentTpl,
            okText: '是',
            cancelText: '否',
            onOk: () => {
                this.employeeService.delete(employee.id).subscribe(() => {
                    this.notify.info(this.l('删除成功！'));
                    this.refreshData();
                })
            }
        })

    }
    /**
     * 打开新建员工模态框
     */
    createEmployee() {
        this.createEmployeeModal.show();
    }
    /**
     * 打开编辑员工模态框
     */
    editEmployee(employee: Employee) {
        this.editEmployeeModal.show(employee.id);
    }

    getParameter(): Parameter[] {
        var arry = [];
        arry.push(Parameter.fromJS({ key: 'Filter', value: this.search.name }));
        arry.push(Parameter.fromJS({ key: 'Position', value: this.search.position }));
        return arry;
    }
}
