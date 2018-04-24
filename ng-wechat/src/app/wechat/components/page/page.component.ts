import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'Page',
    template: `
    <div class="page__hd" *ngIf="showTitle" >
        <h1 class="page__title" [innerHTML]="title"></h1>
        <p class="page__desc" [innerHTML]="subTitle"></p>
    </div>
    <div class="page__bd" [ngClass]="{'page__bd_spacing': spacing}"><ng-content></ng-content></div>
    <div class="page__ft" [ngClass]="{'j_bottom': ftBottom}" *ngIf="!noBottom">
    <div class="weui-footer">
        <p class="weui-footer__links" *ngIf="showBindStaff">
        <a href="javascript:void(0);" class="weui-footer__link">内部员工绑定</a>
        </p>
        <p class="weui-footer__text">广安烟草 | 渠江烟语</p>
    </div>
        <ng-content select="[footer]"></ng-content>
    </div>
    `,
    host: {
        'class': 'page'
    },
    styleUrls: ['./page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PageComponent {
    @Input() title: string;
    @Input() subTitle: string;
    @Input() spacing: boolean = true;
    @Input() ftBottom: boolean = false;
    @Input() noBottom: boolean = false;
    @Input() showTitle: boolean = true;
    @Input() showBindStaff: boolean = false;
}
