import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ExtrasModule } from '../_metronic/partials/layout/extras/extras.module';
import {
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
  } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { AsideMenuComponent } from './layout/aside-menu/aside-menu.component';
import { NgxLoadingModule } from "ngx-loading";


@NgModule({
    imports: [
        InlineSVGModule,
        TranslateModule,
        CommonModule,
        FormsModule,
        RouterModule ,
        NgbDropdownModule,
        NgbProgressbarModule,
        ExtrasModule,
        NgxLoadingModule.forRoot({})
    ],
    declarations: [
        MenuComponent,
        FooterComponent,
        AsideMenuComponent
    ],
    exports: [MenuComponent,AsideMenuComponent,
        FooterComponent]
})
export class SharedModule {}