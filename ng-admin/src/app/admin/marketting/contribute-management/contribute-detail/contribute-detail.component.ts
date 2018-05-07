import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManuscriptServiceProxy } from '@shared/service-proxies/marketing-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Manuscript } from '@shared/entity/marketting';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    moduleId: module.id,
    selector: 'contribute-detail',
    templateUrl: 'contribute-detail.component.html',
})
export class ContributeDetailComponent extends AppComponentBase implements OnInit {
    form: FormGroup;
    id: number;
    manuscript: Manuscript = new Manuscript();
    isConfirmLoading = false;
    //用于按钮是否显示
    isHandle = true;
    isDelete = false;
    successMsg = '';
    isShowTime = false;
    constructor(injector: Injector, private fb: FormBuilder, private actRouter: ActivatedRoute,
        private manuscriptService: ManuscriptServiceProxy, private router: Router, private modal: NzModalService) {
        super(injector);
        this.id = this.actRouter.snapshot.params['id'];
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            title: [null],
            author: [null],
            coverPhoto: [null],
            content: [null],
        });
        this.getSingleManuscript();
    }

    getSingleManuscript() {
        this.manuscriptService.get(this.id).subscribe((result: Manuscript) => {
            this.manuscript = result;
            this.isHandle = result.status === 1 ? false : true;
            if (result.dealWithTime) {
                this.isShowTime = true;
            }
        });
    }

    getFormControl(name: string) {
        return this.form.controls[name];
    }

    saveManuscript() {
        this.manuscriptService.update(this.manuscript)
            .finally(() => { this.isConfirmLoading = false; })
            .subscribe((result: Manuscript) => {
                this.manuscript = result;
                this.isHandle = result.status === 1 ? false : true;
                if (result.dealWithTime) {
                    this.isShowTime = true;
                }
                this.notify.info(this.l('处理成功！'));
            });
    }

    save(TplContent) {
        this.modal.confirm({
            content: TplContent,
            cancelText: '否',
            okText: '是',
            onOk: () => {
                this.manuscript.status = 1;
                this.manuscript.dealWithTime = this.dateFormat(new Date);
                this.saveManuscript();
            }
        });
    }

    return() {
        this.router.navigate(['admin/marketting/contribute-management']);
    }
}
