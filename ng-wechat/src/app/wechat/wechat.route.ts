import { AppLayoutComponent } from '../layout/default/default.component';

import { HomeComponent } from './home/home.component';

export const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'activities', loadChildren: './activities/activities.module#ActivitiesModule' },
    { path: 'buy', loadChildren: './buy/buy.module#BuyModule' },
    { path: 'center', loadChildren: './personal-center/personal-center.module#PersonalCenterModule' },
    // Not found
    { path: '**', redirectTo: '' }
];
