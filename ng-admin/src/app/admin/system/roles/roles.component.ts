import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from "@shared/paged-listing-component-base";
import { RoleServiceProxy, RoleDto, PagedResultDtoOfRoleDto } from "@shared/service-proxies/service-proxies";
//import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateRoleComponent } from "../roles/create-role/create-role.component";
import { EditRoleComponent } from './edit-role/edit-role.component';
import { AppComponentBase } from '@shared/app-component-base';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
	templateUrl: './roles.component.html'//,
	//animations: [appModuleAnimation()]
})
export class RolesComponent extends AppComponentBase implements OnInit {


	@ViewChild('createRoleModal') createRoleModal: CreateRoleComponent;
	@ViewChild('editRoleModal') editRoleModal: EditRoleComponent;
	q: any = {
		pi: 1,
		ps: 10,
		total: 0,
		sorter: '',
		status: -1,
		statusList: []
	};
	loading = false;
	roles: RoleDto[] = [];
	//用于显示删除文本角色名
	roleName: string = '';
	constructor(
		private injector: Injector,
		private rolesService: RoleServiceProxy,
		private modal: NzModalService,
		private msg: NzMessageService
	) {
		super(injector);
	}
	/**
	 * 页面初始加载
	 */
	ngOnInit(): void {
		this.refreshData();
	}
	// list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
	// 	this.rolesService.getAll(request.skipCount, request.maxResultCount)
	// 		.finally(() => {
	// 			finishedCallback();
	// 		})
	// 		.subscribe((result: PagedResultDtoOfRoleDto) => {
	// 			this.roles = result.items;
	// 			this.showPaging(result, pageNumber);
	// 		});
	// }

	/**
	 * 分页获取角色信息
	 * @param reset 是否刷新页面
	 */
	refreshData(reset = false) {
		if (reset) {
			this.q.pi = 1;
		}
		this.loading = true;
		this.rolesService.getAll((this.q.pi - 1) * this.q.ps, this.q.ps).subscribe((result: PagedResultDtoOfRoleDto) => {
			this.loading = false;
			let status = 0;
			this.roles = result.items;
			this.q.total = result.totalCount;
		});
	}
	/**
	 * 删除单个角色
	 * @param role 角色信息
	 * @param contentTpl 删除框id
	 */
	delete(role: RoleDto, contentTpl): void {
		this.roleName = role.displayName;
		this.modal.confirm({
			content: contentTpl,
			okText: '是',
			cancelText: '否',
			onOk: () => {
				this.rolesService.delete(role.id)
					.subscribe(() => {
						this.notify.info(this.l('删除成功！'));
						this.refreshData();
					})
			},
			onCancel: () => {
			}
		});
	}

	// delete(role: RoleDto): void {
	// 	abp.message.confirm(
	// 		"Remove Users from Role and delete Role '" + role.displayName + "'?",
	// 		"Permanently delete this Role",
	// 		(result: boolean) => {
	// 			if (result) {
	// 				this.rolesService.delete(role.id)
	// 					.finally(() => {
	// 						abp.notify.info("Deleted Role: " + role.displayName);
	// 						this.refresh();
	// 					})
	// 					.subscribe(() => { });
	// 			}
	// 		}
	// 	);
	// }

	/**
	 * 显示新增Modal
	 */
	createRole(): void {
		this.createRoleModal.show();
	}
	/**
	 * 显示编辑Modal
	 * @param role 角色实体
	 */
	editRole(role: RoleDto): void {
		this.editRoleModal.show(role.id);
	}
}
