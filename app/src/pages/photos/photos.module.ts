import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotosPage } from './photos';

@NgModule({
  declarations: [
    PhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotosPage),
    TranslateModule.forChild()
  ],
  exports: [
    PhotosPage
  ]
})
export class PhotosPageModule { }
