import { AppLayoutComponent } from '../layout/default/default.component';

import { HomeComponent } from './home/home.component';

export const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'activities', loadChildren: './activities/activities.module#ActivitiesModule' },
    // { path: 'buy', loadChildren: './buy/buy.module#BuyModule' },
    // { path: 'center', loadChildren: './personal-center/personal-center.module#PersonalCenterModule' },
    {path: 'shares', loadChildren: './activities/share/share.module#ShareModule'},
    { path: 'members', loadChildren: './personal-center/member-card/member-card.module#MemberCardModule' },
    { path: 'personals', loadChildren: './personal-center/personal/personal.module#PersonalModule' },
    { path: 'shops', loadChildren: './personal-center/shop/shop.module#ShopModule' },
    { path: 'scans', loadChildren: './personal-center/scan/scan.module#ScanModule' },
    { path: 'nearbies', loadChildren: './buy/nearby-shop/nearby-shop.module#NearbyShopModule' },
    { path: 'feedbacks', loadChildren: './personal-center/feedback/feedback.module#FeedbackModule' },
    { path: 'goodses', loadChildren: './buy/goods/goods.module#GoodsModule' },
    { path: 'integrals', loadChildren: './personal-center/integral/integral.module#IntegralModule' },
    { path: 'purchaserecords', loadChildren: './personal-center/purchaserecord/purchaserecord.module#PurchaserecordModule' },
    { path: 'customer-searchs', loadChildren: './personal-center/customer-search/customer-search.module#CustomerSearchModule' },
    { path: 'account-levels', loadChildren: './personal-center/account-level/account-level.module#AccountLevelModule' },

    // Not found
    { path: '**', redirectTo: '' }
];
