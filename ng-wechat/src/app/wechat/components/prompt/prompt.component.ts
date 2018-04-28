import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'Prompt',
    template: `
    <div class="icon-box" *ngIf="type === 'success'">
        <i class="weui-icon-success weui-icon_msg"></i>
        <div class="icon-box__ctn">
            <h3 class="icon-box__title">{{title}}</h3>
            <p class="icon-box__desc">{{subTitle}}</p>
        </div>
    </div>
    <div class="icon-box" *ngIf="type === 'info'">
        <i class="weui-icon-info weui-icon_msg"></i>
        <div class="icon-box__ctn">
            <h3 class="icon-box__title">{{title}}</h3>
            <p class="icon-box__desc">{{subTitle}}</p>
        </div>
    </div>
    <div class="icon-box" *ngIf="type === 'warn-primary'">
        <i class="weui-icon-warn weui-icon_msg-primary"></i>
        <div class="icon-box__ctn">
            <h3 class="icon-box__title">{{title}}</h3>
            <p class="icon-box__desc">{{subTitle}}</p>
        </div>
    </div>
    <div class="icon-box" *ngIf="type === 'warn-msg'">
        <i class="weui-icon-warn weui-icon_msg"></i>
        <div class="icon-box__ctn">
            <h3 class="icon-box__title">{{title}}</h3>
            <p class="icon-box__desc">{{subTitle}}</p>
        </div>
    </div>
    <div class="icon-box" *ngIf="type === 'waiting'">
        <i class="weui-icon-waiting weui-icon_msg"></i>
        <div class="icon-box__ctn">
            <h3 class="icon-box__title">{{title}}</h3>
            <p class="icon-box__desc">{{subTitle}}</p>
        </div>
    </div>
    `,
    host: {
        'class': 'page'
    },
    styleUrls: ['./prompt.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PromptComponent {
    @Input() title: string;
    @Input() subTitle: string;
    @Input() type: string;
}
