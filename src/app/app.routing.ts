import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ShowComponent } from './show/show.component';

export const appRoutes: Routes = [{
    path: 'setting',
    loadChildren: './setting/setting.module#SettingModule'
}, {
    path: 'show/:token',
    component: ShowComponent
}];


export const routing = RouterModule.forRoot(
    appRoutes,
    { useHash: true },
);

