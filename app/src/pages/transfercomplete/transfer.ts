import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { ITHoursService } from '../../providers/it-hours-service';
import { User } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-transfer',
    templateUrl: 'transfer.html'
})
export class TransferPage {
  
    constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public itHoursService: ITHoursService,
    public storage: Storage) {

  }
  proceed() {
    this.navCtrl.setRoot('HomePage');
  }
 
}
