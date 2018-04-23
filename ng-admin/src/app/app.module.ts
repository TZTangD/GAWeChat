import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DelonModule } from './delon.module';
import { CoreModule } from './core/core.module';
import { AbpModule, ABP_HTTP_PROVIDER } from '@abp/abp.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
//import { RoutesModule } from './routes/routes.module';
//import { HomeModule } from './home/home.module'
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { StartupService } from '@core/startup/startup.service';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { SimpleInterceptor } from '@delon/auth';
// angular i18n
import { registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';
registerLocaleData(localeZhHans);
// i18n
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
//abp 集成
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { AppConsts } from '@shared/AppConsts';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import { AppPreBootstrap } from './AppPreBootstrap';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

//export function StartupServiceFactory(startupService: StartupService): Function {
export function StartupServiceFactory(injector: Injector): Function {//abp 集成
    //return () => startupService.load();
    //abp.multiTenancy.setTenantIdCookie(2);//默认将租户设为宜宾
    return () => {
        return new Promise<boolean>((resolve, reject) => {
          AppPreBootstrap.run(() => {
            var appSessionService: AppSessionService = injector.get(AppSessionService);
            appSessionService.init().then(
              (result) => {
                resolve(result);
              },
              (err) => {
                reject(err);
              }
            );
            var startupService: StartupService = injector.get(StartupService);
            startupService.load();
          });
        });
      }
}

export function getRemoteServiceBaseUrl(): string {
    return AppConsts.remoteServiceBaseUrl;
}

export function getCurrentLanguage(): string {
    alert(abp.localization.currentLanguage.name);
    return abp.localization.currentLanguage.name;
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DelonModule,
        CoreModule,
        AbpModule,  //abp 集成
        ServiceProxyModule, //abp 集成
        SharedModule,
        LayoutModule,
        //RoutesModule,
        //HomeModule,
        AppRoutingModule,
        // i18n
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-CN' },
        //{ provide: LOCALE_ID, useFactory: getCurrentLanguage }, //abp 集成
        { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
        { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
        ABP_HTTP_PROVIDER,//abp 集成
        { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },//abp 集成
        StartupService,
        AppSessionService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [Injector/*StartupService*/],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
