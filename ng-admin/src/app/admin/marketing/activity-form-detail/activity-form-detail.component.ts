import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';
import { ActivityFormDto, ActivityBanquetDto, ActivityDeliveryInfoDto, ActivityFormStatusDto } from '@shared/service-proxies/entity';
import { ActivityFormServiceProxy } from '@shared/service-proxies/marketing-service/activity-form-service';
import { ActivityBanquetServiceProxy, ActivityDeliveryInfoServiceProxy } from '@shared/service-proxies/marketing-service';
import { ApprovalComponent } from '../approval/approval.component';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { EditDeliveryComponent } from '../edit-delivery/edit-delivery.component';
import { EditExpressComponent } from '../edit-express/edit-express.component';
import { AppComponentBase } from '@shared/app-component-base';
import { EditBanquetComponent } from '../edit-banquet/edit-banquet.component';
import { AppSessionService } from '@shared/session/app-session.service';
import { AppConsts } from '@shared/AppConsts';

@Component({
    selector: 'activity-form-detail',
    templateUrl: './activity-form-detail.component.html',
    styles: [`
  :host ::ng-deep i {
    font-size: 32px;
    color: #999;
  }
  :host ::ng-deep .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  `]
})
export class ActivityFormDetailComponent extends AppComponentBase implements OnInit {

    @ViewChild('approvalModal') approvalModal: ApprovalComponent;
    @ViewChild('editFormModal') editFormModal: EditFormComponent;
    @ViewChild('editDeliveryModal') editDeliveryModal: EditDeliveryComponent;
    @ViewChild('editExpressModal') editExpressModal: EditExpressComponent;
    @ViewChild('editBanquetModal') editBanquetModal: EditBanquetComponent;

    formId: string;
    form: ActivityFormDto;
    formTitle: string;
    banquet: ActivityBanquetDto;
    delivery: ActivityDeliveryInfoDto;//消费者
    rdelivery: ActivityDeliveryInfoDto;//推荐人

    //list: any[] = [];
    loading = false;
    ismcenter = false;//是否是营销中心

    previewImage = '';
    previewVisible = false;

    imgWidth: number = 750;
    photoUrls: string[];

    constructor(injector: Injector,
        public msg: NzMessageService, private http: _HttpClient,
        public route: ActivatedRoute,
        private activityFormService: ActivityFormServiceProxy,
        private activityBanquetService: ActivityBanquetServiceProxy,
        private activityDeliveryService: ActivityDeliveryInfoServiceProxy,
        private appSessionService: AppSessionService
    ) {
        super(injector);
        this.formId = this.route.snapshot.params['id'];
        //alert( this.formId);
    }

    ngOnInit() {
        if(this.appSessionService.roles.includes('MarketingCenter')){
            this.ismcenter = true;
        }

        this.getData();
    }

    handlePreview = (url: string) => {
        this.previewImage = url;
        this.previewVisible = true;
      }

    getData() {
        //表单
        this.getFormData();

        //宴席信息
        this.getBanquetData();

        /*this.loading = true;
        this.http.get('/api/list', { count: 4 }).subscribe((res: any) => {
            this.list = this.list.concat(res).map(item => {
                return item;
            });
            //this.list = [];
            this.loading = false;
        });*/

        //收货信息
        this.getDeliveryData();
    }

    getBanquetData() {
        this.loading = true;
        this.activityBanquetService.getByFormId(this.formId).subscribe(result => {
            this.banquet = result;
            //this.photoUrls = ['./assets/img/bg2.jpg', './assets/img/bg3.jpg', './assets/img/bg4.jpg', './assets/img/bg6.jpg'];
            this.photoUrls = this.banquet.getPhotoUrls();
            this.loading = false;
        });
    }

    getDeliveryData() {
        this.activityDeliveryService.getByFormId(this.formId).subscribe(result => {
            for (let d of result) {
                if (d.type == 1) {
                    this.delivery = d;
                } else if (d.type == 2) {
                    this.rdelivery = d;
                }
            }
        });
    }

    getFormData() {
        this.activityFormService.get(this.formId).subscribe(result => {
            this.form = result;
            this.formTitle = '单号：' + this.form.formCode + ' 状态：' + this.form.statusName;
        });
    }

    //初审
    firstApproval() {
        let formStatus = new ActivityFormStatusDto();
        formStatus.status = 2;
        formStatus.opinion = "初审通过";
        formStatus.id = this.formId;
        this.approvalModal.show(formStatus);
    }
    //取消
    cancel() {
        let formStatus = new ActivityFormStatusDto();
        formStatus.status = 5;
        formStatus.opinion = "取消";
        formStatus.id = this.formId;
        this.approvalModal.show(formStatus);
    }
    //拒绝
    reject() {
        let formStatus = new ActivityFormStatusDto();
        formStatus.status = 3;
        formStatus.opinion = "拒绝";
        formStatus.id = this.formId;
        this.approvalModal.show(formStatus);
    }
    //资料审核
    approval() {
        if (this.banquet.id == null || this.banquet.id == '') {
            this.notify.error('请先回传宴席资料');
            return;
        }
        if (this.rdelivery == null || this.rdelivery == undefined) {
            this.notify.error('请先完善推荐人信息');
            return;
        }
        let formStatus = new ActivityFormStatusDto();
        formStatus.status = 4;
        formStatus.opinion = "审核通过";
        formStatus.id = this.formId;
        this.approvalModal.show(formStatus);
    }
    //营销中心审核
    approvalEnd(){
        let formStatus = new ActivityFormStatusDto();
        formStatus.status = 6;
        formStatus.opinion = "审核通过";
        formStatus.id = this.formId;
        this.approvalModal.show(formStatus);
    }
    //修改商品信息
    editForm() {
        this.editFormModal.show(this.form);
    }
    //修改收货信息
    editDelivery() {
        this.editDeliveryModal.title = '消费者信息';
        if (this.delivery) {
            let d = this.delivery.clone();
            this.editDeliveryModal.show(d);
        } else {
            let del = new ActivityDeliveryInfoDto();
            del.activityFormId = this.formId;
            del.type = 1;
            del.creationTime = new Date();
            this.editDeliveryModal.show(del);
        }
    }

    editRDelivery() {
        this.editDeliveryModal.title = '推荐人信息';
        if (this.rdelivery) {
            let r = this.rdelivery.clone();
            this.editDeliveryModal.show(r);
        } else {
            let del = new ActivityDeliveryInfoDto();
            del.activityFormId = this.formId;
            del.type = 2;
            del.creationTime = new Date();
            this.editDeliveryModal.show(del);
        }
    }

    //修改物流信息
    editExpress() {
        this.editExpressModal.title = '消费者物流信息';
        if (this.delivery) {
            let d = this.delivery.clone();
            this.editExpressModal.show(d);
        } else {
            let del = new ActivityDeliveryInfoDto();
            del.activityFormId = this.formId;
            del.type = 1;
            del.creationTime = new Date();
            this.editExpressModal.show(del);
        }
    }

    editRExpress() {
        this.editExpressModal.title = '推荐人物流信息';
        if (this.rdelivery) {
            let r = this.rdelivery.clone();
            this.editExpressModal.show(r);
        } else {
            let del = new ActivityDeliveryInfoDto();
            del.activityFormId = this.formId;
            del.type = 2;
            del.creationTime = new Date();
            this.editExpressModal.show(del);
        }
    }

    editBanquet(){
        this.banquet.activityFormId = this.formId;
        let b = this.banquet.clone();
        if (b.id == null || b.id == undefined) {
            b.banquetTime = null;
        }
        this.editBanquetModal.show(b);
    }
}
