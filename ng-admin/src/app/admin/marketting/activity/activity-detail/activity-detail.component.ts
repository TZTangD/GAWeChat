import { Component, OnInit, Injector, EventEmitter, AfterViewInit, OnDestroy, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleServiceProxy } from '@shared/service-proxies/marketing-service';
import { Article } from '@shared/entity/marketting';
import { ResourceLoader } from '@angular/compiler';
import { NzModalService, UploadFile } from 'ng-zorro-antd';
import { AppConsts } from '@shared/AppConsts';
// import { ConsoleReporter } from 'jasmine';

@Component({
    moduleId: module.id,
    selector: 'activity-detail',
    templateUrl: 'activity-detail.component.html',
    styleUrls: ['activity-detail.component.scss']
})
export class ActivityDetailComponent extends AppComponentBase implements OnInit {
    test: any;
    form: FormGroup;
    id: number;
    article: Article = new Article();
    isConfirmLoading = false;
    //用于按钮是否显示
    isPush = true;
    isDelete = false;
    successMsg = '';
    cardTitle = '';
    radioType: any[] = [{ id: 1, name: '好评', value: 5 }, { id: 2, name: '中评', value: 3 }, { id: 3, name: '差评', value: 1 }];
    linkTypes: any[] = [{ text: '内部链接', value: 1 }, { text: '外部链接', value: 2 }]
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
        this.form = this.fb.group({
            title: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
            author: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            content: [null, Validators.compose([Validators.required])],
            linkAddress: [null, Validators.compose([Validators.required])],
            // coverPhoto: [null, Validators.compose([Validators.required])], 图片能上传时
            coverPhoto: [null],
            // content: [null],
            appType: [null, [Validators.required]],
        });
        this.linkTypes = this.linkTypes[0];
        this.getSingleActivity();
        this.host = AppConsts.remoteServiceBaseUrl;
        this.actionUrl = this.host + '/WeChatFile/MarketingInfoPosts?fileName=activity';
    }

    getSingleActivity() {
        if (this.id) {
            this.activityService.get(this.id).subscribe((result: Article) => {
                this.article = result;
                this.isDelete = true;
                this.isPush = result.pushStatus === 1 ? false : true;
                this.cardTitle = '编辑活动';
                if (result.coverPhoto) {
                    this.article.showCoverPhoto = this.host + this.article.coverPhoto;
                }
            });
        } else {
            //新增
            this.article.pushStatus = 0;
            this.article.pushStatusName = '草稿';
            this.article.type = 1;//类型为活动
            this.cardTitle = '新增活动';
        }
    }

    getFormControl(name: string) {
        return this.form.controls[name];
    }

    saveActivity() {
        //获取body
        // var start = "<body>";
        // var end = "</body>";
        // var s = this.article.content.indexOf(start) + start.length;
        // var e = this.article.content.indexOf(end);
        // this.article.content = this.article.content.substring(s, e);
        this.activityService.update(this.article)
            .finally(() => { this.isConfirmLoading = false; })
            .subscribe((result: Article) => {

                this.article = result;
                if (result.coverPhoto) {
                    this.article.showCoverPhoto = this.host + this.article.coverPhoto;
                }
                this.isDelete = true;
                this.isPush = result.pushStatus === 1 ? false : true;
                this.notify.info(this.l(this.successMsg));
                this.cardTitle = '编辑活动';
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
        this.router.navigate(['admin/marketting/activity']);
    }

    private getBase64(img: File, callback: (img: any) => void) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    //图片上传返回
    handleChange(info: { file: UploadFile }): void {
        console.table(info);

        if (info.file.status === 'error') {
            this.notify.error('上传图片异常，请重试');
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, (img: any) => {
                this.article.showCoverPhoto = img;
            });
            this.article.coverPhoto = info.file.response.result.imageName;
            this.notify.success('上传图片完成');
        }
    }
}
