import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { StatementPage } from './statement';

@NgModule({
  declarations: [
    StatementPage,
  ],
  imports: [
    IonicPageModule.forChild(StatementPage),
    TranslateModule.forChild()
  ],
  exports: [
    StatementPage
  ]
})
export class StatementPageModule { }
