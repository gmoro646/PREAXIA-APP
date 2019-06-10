import { Component } from '@angular/core';
import { Keys, ITHoursService } from '../../providers/it-hours-service';
import { Storage } from '@ionic/storage';
import { IonicPage, ModalController, NavController, AlertController } from 'ionic-angular';
declare var $: any;
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-recentclaim',
    templateUrl: 'recentclaim.html'
})
export class RecentClaimPage {
  claimData: any = null;
 // declinedata: any = null;
//  pending: any = null;
  data: any = [];
  show:any=false
  selectedItem: any = null;
  userData: any = null;
  policies: any = [];
  policyNo: any = null;
  selectedType: any = null;
  policyType: any = null;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storage: Storage, public alertCtrl: AlertController,
    public itHoursService: ITHoursService) {
      this.storage.get(Keys.User.toString()).then((Response) => {
        this.userData = Response
        this.getpolicies();
        this.getUserClaimData();
      });
  }
  
  getpolicies() {
    var input = this.itHoursService.prepareNodeJSRequestObject("Claim", "GETPOLICYBYID", { id: this.userData.UserId, AccountId: this.userData.AccountId });
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

 
  ionViewDidLoad() {
  }
  getUserClaimData() {
    var self = this;
    var input = this.itHoursService.prepareNodeJSRequestObject("Claim", "GETCLAIMBYID", { id: this.userData.UserId, AccountId: this.userData.AccountId});
    this.itHoursService.execute(input, false).then((response: any) => {
      if (response && response.apidata.Data && response.apidata.Data.length > 0) {
        this.claimData = response.apidata.Data
        //for (let i = 0; i < this.claimData.length; i++) {
          
        //  var index = _.findIndex(
        //    this.policies,
        //    g => g.no === self.claimData[i].policy_number
        //  );
        //  if (index == -1) {
        //    this.policies.push({ no: this.claimData[i].policy_number, type: this.claimData[i].policy_type})
        //  }
        //}
        this.policyNo = this.policies[0].no
        this.policyType = this.policies[0].type
        this.selectedType = 'Approved'
        this.filterClaimData("Reimbursed", null,)
      } else {
        this.show = true
      }
    });
  }
  approvedClaim() {
    this.selectedType = 'Approved'
    $('#card2').addClass('card-block-unactive');
    $('#card3').addClass('card-block-unactive');
    $('#card1').removeClass('card-block-unactive');
    $('#card1').addClass('card-block-active');
    this.filterClaimData("Reimbursed", null);
  }

  pendingClaim() {
    this.selectedType = 'Pending'
    $('#card1').addClass('card-block-unactive');
    $('#card3').addClass('card-block-unactive');
    $('#card2').removeClass('card-block-unactive');
    $('#card2').addClass('card-block-active');
    this.filterClaimData("Submitted", "SentForReimbursement");
  }

  declinedClaim() {
    this.selectedType = 'Declined'
    $('#card1').addClass('card-block-unactive');
    $('#card2').addClass('card-block-unactive');
    $('#card3').removeClass('card-block-unactive');
    $('#card3').addClass('card-block-active');
    this.filterClaimData("Adjudicated", null);
  }
  

  filterClaimData(type, type2) {
    var self = this
    this.data = []
    if (this.claimData && this.claimData.length > 0) {
      for (var i = 0; i < this.claimData.length; i++) {
        if (self.claimData[i].Status == type || self.claimData[i].Status == type2) {
          self.data.push(self.claimData[i])
        }
      }
      this.show = true
    } else {
      this.show = true
    }
  }

  showPolicy() {
    
      let alert = this.alertCtrl.create();
      alert.setTitle('Contribution Plan');

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

          this.policyType = this.policies[j].type
          this.policyNo = Number(data);
        }
      });
      alert.present();
    }
 
}
