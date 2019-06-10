import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { ITHoursService } from '../../providers/it-hours-service';
import { User } from '../../providers';

@IonicPage()
@Component({
    selector: 'page-photos',
    templateUrl: 'photos.html'
})
export class PhotosPage {

    constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public itHoursService: ITHoursService) {

  }
 
}
