import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
//import { CallNumberOriginal } from '@ionic-native/call-number';
declare let window: any;
@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html'
})
export class ContactUsPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }


  ionViewDidLoad() {
  }
  launchDialer(number) {
    window.open('tel:' + number, '_system')
  }
  mailTo(email) {
    window.open('mailto:'+ email, '_system');
  }

}
