import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController,AlertController } from 'ionic-angular';
import { Keys, ITHoursService } from '../../providers/it-hours-service';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData: any = null
  show: any = false
  policies: any = []
  policyNo: any = null
  policyType: any = null

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public alertController: AlertController,
    public storage: Storage, public itHoursService: ITHoursService) {
    this.storage.get(Keys.User.toString()).then((Response) => {
      this.userData = Response
      this.getpolicies()
      this.show=true
    });
  }

  ionViewDidLoad() {
  }
  openSubmit() {
    this.navCtrl.push('ClaimPage')
  }
  openRecentClaim() {
    this.navCtrl.push('RecentClaimPage')
  }
  openStatement() {
    this.navCtrl.push('StatementPage')
  }
  openContactUs() {
    this.navCtrl.push('ContactUsPage')
  }
  logout() {
    let temp: any;
  let alert = this.alertController.create({
    title: "Logout",
    subTitle: "Are you sure?",
    buttons: [
      {
        text: "Yes",
        handler: data => {
          this.storage.get('email-pass').then((data) => {
            temp = data
            this.storage.clear().then(() => {
              this.navCtrl.setRoot('LoginPage')
              console.log('all keys cleared');
            });
            this.storage.set('email-pass', temp);
          });
        }
      },
      {
        text: "Cancel",
        handler: data => {
          console.log("Cancel Clicked");
        }
      }
    ]
  });
  alert.present();

 }

 getpolicies() {
   var input = this.itHoursService.prepareNodeJSRequestObject("Claim", "GETPOLICYBYID", { id: this.userData.UserId, AccountId: this.userData.AccountId});
   this.itHoursService.execute(input, false).then((response: any) => {
     if (response && response.apidata.Data) {
       let data = response.apidata.Data
       for (let i = 0; i < data.length; i++) {

         var index = _.findIndex(
           this.policies,
           g => g.no === data[i].policy_number
         );
         if (index == -1) {
           this.policies.push({ no: data[i].policy_number, type: data[i].policy_type })
         }
       }
       this.policyNo = this.policies[0].no
       this.policyType = this.policies[0].type
     } else {
       this.show = true
     }
   });
 }

 showPolicy() {

   let alert = this.alertController.create();
   alert.setTitle('Contribution Plan ');

   for (let i = 0; i < this.policies.length; i++) {
     if (this.policies[i].no == this.policyNo) {
       alert.addInput({
         type: 'radio',
         label: this.policies[i].type + " " + this.policies[i].no,
         value: this.policies[i].no,
         checked: true
       });
     } else {
       alert.addInput({
         type: 'radio',
         label: this.policies[i].type + " " + this.policies[i].no,
         value: this.policies[i].no,
         checked: false
       });
     }
   }

   alert.addButton('Cancel');
   alert.addButton({
     text: 'OK',
     handler: data => {
       console.log(data);
       let j = _.findIndex(this.policies, function (t) {
         return t.no == data
       })
       this.policyNo = data
       this.policyType = this.policies[j].type
     }
   });
   alert.present();
 }
}
