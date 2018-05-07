import { Component, Injector } from '@angular/core';
import { SettingsService, MenuService } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
//abp 集成
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'header-langs',
    template: `
    <nz-dropdown>
        <div nz-dropdown>
            <i class="anticon anticon-edit"></i>
            {{ 'language' | translate}}
            <i class="anticon anticon-down"></i>
        </div>
        <ul nz-menu>
            <li nz-menu-item *ngFor="let item of langs"
            [nzSelected]="item.code === settings.layout.lang"
                (click)="change(item.code)">{{item.text}}</li>
        </ul>
    </nz-dropdown>
    `
})
export class HeaderLangsComponent extends AppComponentBase {

    langs: any[];

    constructor(
        injector: Injector,
        private menuService: MenuService,
        public settings: SettingsService,
        public tsServ: I18NService
    ) {
        super(injector);
        this.langs = this.tsServ.getLangs();
        //alert('200' + JSON.stringify(this.langs))
    }

    change(lang: string) {
        //alert('300' + lang)
        this.tsServ.use(lang, false).subscribe(() => {
            this.menuService.resume();
        });
        this.settings.setLayout('lang', lang);
        //集成abp部分
        this.abpchange(lang);
    }

    //集成abp 2018-1-14
    abpchange(lang: string) {
        abp.utils.setCookieValue(
            "Abp.Localization.CultureName",
            lang,
            new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
            abp.appPath
          );
          location.reload();
    }
}
