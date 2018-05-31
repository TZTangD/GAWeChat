import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from '@shared/entity/marketting';
import { ArticleServiceProxy } from '@shared/service-proxies/marketing-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { AppConsts } from '@shared/AppConsts';

@Component({
    moduleId: module.id,
    selector: 'experience-detail',
    templateUrl: 'experience-detail.component.html',
})
export class ExperienceDetailComponent extends AppComponentBase implements OnInit {
    form: FormGroup;
    id: number;
    article: Article = new Article();
    isConfirmLoading = false;
    //用于按钮是否显示
    isPush = true;
    isDelete = false;
    successMsg = '';
    cardTitle = '';
    host = AppConsts.remoteServiceBaseUrl;
    actionUrl = this.host + '/WeChatFile/MarketingInfoPosts?fileName=activity';
    config_classic: any = {
        height: 550,
        plugins: [
            'advlist autolink autosave link image lists charmap print preview hr anchor pagebreak',
            'table searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking code',
            'contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern'
        ],
        toolbar1: 'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect',
        toolbar2: 'bullist numlist | outdent indent blockquote | undo redo | image | insertdatetime preview | forecolor backcolor',
        toolbar3: 'code | table hr removeformat | charmap | ltr rtl | visualchars visualblocks template pagebreak restoredraft',
        language: 'zh_CN',
        menubar: false,
        toolbar_items_size: 'small',
        init_instance_callback: function () {
        },
        images_upload_handler: function (blobInfo, success, failure) {
            var xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            var uploadImageUrl = AppConsts.remoteServiceBaseUrl + '/WeChatFile/MarketingHTMLContentPosts';
            xhr.open('POST', uploadImageUrl);
            xhr.onload = function () {
                var json;
                if (xhr.status != 200) {
                    failure('HTTP Error: ' + xhr.status);
                    return;
                }
                json = JSON.parse(xhr.responseText);

                if (!json || typeof json.result.location != 'string') {
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                }
                success(AppConsts.remoteServiceBaseUrl + json.result.location);
            };
            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            xhr.send(formData);
        }
    };
    constructor(injector: Injector, private fb: FormBuilder, private actRouter: ActivatedRoute,
        private activityService: ArticleServiceProxy, private router: Router, private modal: NzModalService) {
        super(injector);
        this.id = this.actRouter.snapshot.params['id'];
    }
    ngOnInit(): void {
        alert(AppConsts.remoteServiceBaseUrl);

        this.form = this.fb.group({
            title: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
            author: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            content: [null],
        });
        this.getSingleActivity();
    }
    getSingleActivity() {
        if (this.id) {
            this.activityService.get(this.id).subscribe((result: Article) => {
                this.article = result;
                this.isDelete = true;
                this.isPush = result.pushStatus === 1 ? false : true;
                this.cardTitle = '编辑经验分享';
            });
        } else {
            //新增
            this.article.pushStatus = 0;
            this.article.pushStatusName = '草稿';
            this.article.type = 2;//类型为经验分享
            this.cardTitle = '新增经验分享';
        }
    }

    getFormControl(name: string) {
        return this.form.controls[name];
    }
    saveActivity() {
        //获取body
        var start = "<body>";
        var end = "</body>";
        var s = this.article.content.indexOf(start) + start.length;
        var e = this.article.content.indexOf(end);
        this.article.content = this.article.content.substring(s, e);
        this.activityService.update(this.article)
            .finally(() => { this.isConfirmLoading = false; })
            .subscribe((result: Article) => {
                console.log('保存返回');
                console.log(result);
                this.article = result;
                this.isDelete = true;
                this.isPush = result.pushStatus === 1 ? false : true;
                this.notify.info(this.l(this.successMsg));
                this.cardTitle = '编辑经验分享';
            });
    }


    save(isPulish = false) {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this.isConfirmLoading = true;
            this.successMsg = isPulish === false ? '保存成功！' : '发布成功！';
            this.saveActivity();
        }
    }
    push() {
        //发布
        this.article.pushStatus = 1;
        this.article.pushTime = this.dateFormat(new Date());
        this.save(true);
    }
    delete(TplContent) {
        this.modal.confirm({
            content: TplContent,
            cancelText: '否',
            okText: '是',
            onOk: () => {
                this.activityService.delete(this.article.id).subscribe(() => {
                    this.notify.info(this.l('删除成功！'));
                    this.return();
                });
            }
        })
    }
    return() {
        this.router.navigate(['admin/marketting/experience-share']);
    }
}
