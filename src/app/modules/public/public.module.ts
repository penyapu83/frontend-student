import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationModule } from '../i18n/translation.module';
import { RouterModule } from '@angular/router';

import { ExtrasModule } from '../../_metronic/partials/layout/extras/extras.module';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PublicComponent } from './components/public/public.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../share.module';

@NgModule({
  declarations: [
    HomeComponent,
    PublicComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    PublicRoutingModule,
    ExtrasModule,
    SharedModule
  ]
})
export class PublicModule { }
