import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationModule } from '../i18n/translation.module';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../share.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ExtrasModule } from '../../_metronic/partials/layout/extras/extras.module';

import { NgxLoadingModule } from "ngx-loading";
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UserProfileComponent
  ],
  imports: [
    InlineSVGModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslationModule,
    RouterModule,
    CommonModule,
    ExtrasModule,
    AdminRoutingModule,
    SharedModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class AdminModule { }
