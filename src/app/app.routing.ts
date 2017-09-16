import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [{
    path: 'setting',
    loadChildren: './setting/setting.module#SettingModule'
}];


export const routing = RouterModule.forRoot(
    appRoutes,
    { useHash: true },
);

