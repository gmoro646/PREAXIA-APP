import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { RecentClaimPage } from './recentclaim';

@NgModule({
  declarations: [
    RecentClaimPage,
  ],
  imports: [
    IonicPageModule.forChild(RecentClaimPage),
    TranslateModule.forChild()
  ],
  exports: [
    RecentClaimPage
  ]
})
export class RecentClaimPageModule { }
