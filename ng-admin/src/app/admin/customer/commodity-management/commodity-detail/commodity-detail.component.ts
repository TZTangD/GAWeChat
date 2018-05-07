import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsServiceProxy } from '@shared/service-proxies/customer-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '@shared/entity/customer';
import { UploadFile } from 'ng-zorro-antd';
import { AppConsts } from '@shared/AppConsts';

@Component({
    moduleId: module.id,
    selector: 'commodity-detail',
    templateUrl: 'commodity-detail.component.html',
    styleUrls: ['commodity-detail.component.scss']
})
export class CommodityDetailComponent extends AppComponentBase implements OnInit {
    form: FormGroup;
    id: number;
    product: Products = new Products();
    isConfirmLoading = false;

    types = [
        { text: '卷烟类', value: 1 },
        { text: '特产类', value: 2 },
    ]
    isRares = [
        { text: '是', value: true },
        { text: '否', value: false },
    ];
    //图片放大
    previewImage = '';
    previewVisible = false;

    host: string;
    photo: string;
    actionUrl:string;
    constructor(injector: Injector, private fb: FormBuilder, private productService: ProductsServiceProxy, private actRouter: ActivatedRoute,
        private router: Router) {
        super(injector);
        this.id = this.actRouter.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            specification: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
            type: [null],
            price: [null],
            isRare: [null],
            packageCode: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
            barCode: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
            isAction: [true],
            photoUrl: [null, Validators.compose([Validators.maxLength(500)])],
        });
        this.getSingleProdct();
        this.host = AppConsts.remoteServiceBaseUrl;
    }

    getSingleProdct() {
        this.productService.get(this.id).subscribe((result: Products) => {
            this.product = result;
           
            if (result.photoUrl) {
                // this.photo = this.host + result.photoUrl;
                this.product.showPhotoUrl = this.host + result.photoUrl;
                
            } else {
                this.photo = '';
            }

            if (!this.product.id) {
                this.product.init({ isAction: true });
                this.actionUrl=this.host + '/WeChatFile/MarketingInfoPosts';
            }else{
                this.actionUrl=this.host + '/WeChatFile/MarketingInfoPosts?fileName='+this.product.id;
            }
        });
    }

    getFormControl(name: string) {
        return this.form.controls[name];
    }

    save() {
        //检查form验证
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.valid) {
            this.isConfirmLoading = true;
            this.productService.update(this.product)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('保存成功！'));
                })
        }
    }
    /**
     * 返回
     */
    Return() {
        this.router.navigate(['admin/customer/commodity-management']);
    }


    //图片放大
    handlePreview = (file: UploadFile) => {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    }
    private getBase64(img: File, callback: (img: any) => void) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange(info: { file: UploadFile }): void {
        console.table(info);

        if (info.file.status === 'error') {
            this.notify.error('上传图片异常，请重试');
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, (img: any) => {
                // this.loading = false;
                // this.photo = img;
                this.product.showPhotoUrl=img;
            });
            this.product.photoUrl = info.file.response.result.imageName;
            console.log('photoUrl')
            console.log(this.product.photoUrl);
            console.log('imageName')
            console.log(info.file.response.result.imageName);
            this.notify.success('上传图片完成');
        }
    }
}
