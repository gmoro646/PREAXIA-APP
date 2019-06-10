import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LockscreenPage } from './lockscreen';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LockscreenPage,
  ],
  imports: [
    IonicPageModule.forChild(LockscreenPage),
    TranslateModule.forChild()
  ],
  exports: [
    LockscreenPage
  ]
})
export class LockscreenPageModule { }
