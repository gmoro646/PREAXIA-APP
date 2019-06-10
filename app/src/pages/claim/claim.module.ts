import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ClaimPage } from './claim';

@NgModule({
  declarations: [
    ClaimPage,
  ],
  imports: [
    IonicPageModule.forChild(ClaimPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClaimPage
  ]
})
export class ClaimPageModule { }
