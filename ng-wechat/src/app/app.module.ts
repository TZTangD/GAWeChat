import { NgModule, LOCALE_ID, Injector, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { WeUiModule } from 'ngx-weui';
//import { NotifyModule } from 'ngx-notify';
//import { AqmModule } from 'angular-qq-maps';

import { SharedModule } from './shared/shared.module';
//import { LayoutModule } from './layout/layout.module';
//import { RoutesModule } from './routes/routes.module';
import { WechatModule } from './wechat/wechat.module';
//import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
//import { JsonpModule } from '@angular/http';
//import { ServiceModule } from './services/service.module';
import { HttpClient, SettingsService, CommonService } from './services';

export function StartupServiceFactory(injector: Injector): Function {
    //return () => settingSer.load();
    return () => {
        let settingSer = injector.get(SettingsService);
        return settingSer.load();
    };
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        //JsonpModule,
        //CoreModule,
        SharedModule,
        //ServiceModule,
        //RoutesModule,
        WechatModule,
        //LayoutModule,
        WeUiModule.forRoot(),
        //NotifyModule.forRoot({
        //    notify: {
        //        progress: false
        //    }
        //})//,
        //AqmModule.forRoot({
        //    apiKey: 'I3TBZ-QTN3J-MWPFI-FERMS-IBOCQ-LBBWY'
        //})
    ],
    providers:[
        HttpClient, 
        SettingsService,
        CommonService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [ Injector ],
            multi: true
        }
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
