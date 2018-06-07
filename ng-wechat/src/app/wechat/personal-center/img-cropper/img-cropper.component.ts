import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds, CropPosition } from 'ngx-img-cropper';

import { UploaderOptions, FileItem, Uploader, UploaderHeaders } from 'ngx-weui';
import { AppConsts, ShopService } from '../../../services';

@Component({
    selector: 'wechat-img-cropper',
    templateUrl: './img-cropper.component.html',
    styleUrls: ['./img-cropper.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImgCropperComponent {

    @ViewChild('cropper4', undefined)
    public cropper4: ImageCropperComponent;

    public onChange: Function;
    public updateCropPosition: Function;
    public resetCroppers: Function;


    //Cropper 4 data
    public cropperSettings4: CropperSettings;

    public data4: any;
    public getImage: any;

    fileName: string;
    /*
    uploader: Uploader = new Uploader(<UploaderOptions>{
        url: AppConsts.remoteServiceBaseUrl + '/WeChatFile/FilesPosts?folder=shop',
        //auto: true,
        limit: 1,
        //size: 153600,
        onUploadStart: ((file: FileItem) => {
            console.table(file._file);
            console.table(file.file);              
            //if (file.file.size > 153600) {
            //    console.log('文件必须小于等于150KB');
            //    file.cancel();
            //}
        }),
        onUploadSuccess: ((file: FileItem, response: string) => {
            console.log('onUploadSuccess-' + response);
            let data = JSON.parse(response);
            if (data && data.success == true) {
                console.log(data.result);
            }
        }),
        onError: (() => {
            console.log('检查文件大小是否超过限制');
        }),
        onUploadComplete: function (file: FileItem, response: string) {
            console.log('onUploadComplete-' + response, arguments);
        }
    });*/

    constructor(private shopService: ShopService) {
        //Cropper settings 4
        this.cropperSettings4 = new CropperSettings();
        this.cropperSettings4.width = 200;
        this.cropperSettings4.height = 200;

        this.cropperSettings4.croppedWidth = 200;
        this.cropperSettings4.croppedHeight = 200;

        this.cropperSettings4.canvasWidth = 500;
        this.cropperSettings4.canvasHeight = 300;

        this.cropperSettings4.minWidth = 100;
        this.cropperSettings4.minHeight = 100;

        this.cropperSettings4.rounded = false;

        this.cropperSettings4.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings4.cropperDrawSettings.strokeWidth = 2;

        this.cropperSettings4.keepAspect = true;
        this.cropperSettings4.preserveSize = true;
        this.cropperSettings4.cropOnResize = false;
        this.cropperSettings4.noFileInput = true;

        this.data4 = {};

        this.getImage = () => {
            //alert(111)
            this.data4.image = this.cropper4.cropper.getCroppedImage(true).src;
            console.log(this.fileName);
            this.shopService.FilesPostsBase64({fileName: this.fileName, imageBase64: this.data4.image}).subscribe((res) => {
                console.table(res);
            });
            //console.log(this.data4.image);
            //alert(this.data4.image)

            //let data = this.data4.image;
            //console.log(data.split(',')[0]);

            //data=data.split(',')[1];
            //data=window.atob(data);
            //var ia = new Uint8Array(data.length);
            //for (var i = 0; i < data.length; i++) {
            //    ia[i] = data.charCodeAt(i);
            //};

            //var b = new Blob([data], {type:"image/jpeg"});
            //var b = new Blob([ia], {type:"image/jpeg"});
            //var bs = [];
            //bs.push(b);
            //let newFile = new FileItem(this.uploader, new File(bs,'files'), this.uploader.options);
            //let files = [];
            //files.push(newFile);
            //this.uploader.addToQueue(files);
            //this.uploader.uploadAll();
            //alert(222)
        }

        this.resetCroppers = () => {
            this.cropper4.reset();
        }
    }

    fileChange($event) {
        const image: any = new Image();
        const file: File = $event.target.files[0];
        this.fileName = file.name;
        const myReader: FileReader = new FileReader();
        myReader.onloadend = (loadEvent: any) => {
            image.src = loadEvent.target.result;
            this.cropper4.setImage(image);
        };
        myReader.readAsDataURL(file);
    }
}
