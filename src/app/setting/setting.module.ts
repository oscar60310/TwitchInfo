import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewUserComponent } from './new-user/new-user.component';
import { SettingRouteing } from './setting.routing';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SettingRouteing,
    ],
    declarations: [
        NewUserComponent,
    ],
    providers: []
})
export class SettingModule { }

