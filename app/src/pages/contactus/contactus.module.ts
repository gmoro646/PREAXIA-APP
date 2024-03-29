import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ContactUsPage } from './contactus';

@NgModule({
  declarations: [
    ContactUsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactUsPage),
    TranslateModule.forChild()
  ],
  exports: [
    ContactUsPage
  ]
})
export class ContactUsPageModule { }
