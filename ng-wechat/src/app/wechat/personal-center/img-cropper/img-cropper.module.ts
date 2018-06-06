import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ImageCropperModule } from 'ngx-img-cropper';
import { ImgCropperComponent } from './img-cropper.component';


// region: components

const COMPONENTS = [ImgCropperComponent];

const routes: Routes = [
    { path: 'cropper', component: ImgCropperComponent }
];
// endregion

@NgModule({
    imports: [
        SharedModule,
        ImageCropperModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ...COMPONENTS
    ],
    providers: []
})
export class ImgCropperModule {

}
