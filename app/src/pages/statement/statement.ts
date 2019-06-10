import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keys, ITHoursService } from '../../providers/it-hours-service';
import * as _ from 'lodash';
import * as moment from 'moment'
@IonicPage()
@Component({
    selector: 'page-statement',
    templateUrl: 'statement.html'
})
export class StatementPage {
  userData: any = null;
  statementData: any = null;
  claimAmount: any = 0;
  show: any = false;
  totalBalance
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public storage: Storage,
    public ithoursServeice: ITHoursService) {
    this.storage.get(Keys.User.toString()).then((Response) => {
      this.userData = Response;
      this.getStatement();
      this.getBalance();
    });
   
  }

 
  ionViewDidLoad() {
  }

  getBalance() {
    var input = this.ithoursServeice.prepareNodeJSRequestObject("Claim", "GETBALANCEBYID", { id: this.userData.UserId, AccountId: this.userData.AccountId})
    this.ithoursServeice.execute(input, false).then((response: any) => {
      if (response && response.apidata.Data) {
        this.totalBalance = response.apidata.Data.balance
      }
      })
  }


  getStatement() {
    var input = this.ithoursServeice.prepareNodeJSRequestObject("Claim", "GETSTATEMENTBYID", { id: this.userData.UserId, AccountId: this.userData.AccountId})
    this.ithoursServeice.execute(input, false).then((response: any) => {
      if (response && response.apidata.Data) {
        //   this.statementData = response.apidata.Data
        // this.statementData = _.sortBy(this.statementData, function (num) { return num.created_time; });
        // this.statementData.reverse();
        var data = response.apidata.Data

        data.sort(function (a, b) {
          var frst: any = new Date(b.SubmissionDate)
          var second: any = new Date(a.SubmissionDate)
          return frst - second;
        });

        //calculate claim amounts 
        for (var i = 0; i < data.length; i++) {
          if (moment(data[i].SubmissionDate).format('LL') == moment().format('LL')) {
            data[i].created_time = 'TODAY'
          } else {
            data[i].created_time = moment(data[i].SubmissionDate).format('LL')
          }
          this.claimAmount = this.claimAmount + data[i].Amount;
        }
        this.show = true


        var groups = [];
        for (var j = 0; j < data.length; j++) {
          var index = _.findIndex(
            groups,
            g => g.created_time === data[j].created_time
          );

          let status = null;
          if (data[j].Status === 'SentForReimbursement') {
            status = 'Refunded'
          } else {
            status = 'Deposited'
          }

          if (index >= 0) {
            groups[index].areas = groups[index].areas || [];
            groups[index].areas.push({ description: data[j].ServiceDescription, status: status, amount: data[j].Amount });
          } else {
            var group = {
              created_time: data[j].created_time,
              areas: [{ description: data[j].ServiceDescription, status: status, amount: data[j].Amount }]
            };
            groups.push(group);
          }
        }

        this.statementData = groups
          //_.sortBy(groups, function (num) { return num.created_time; }).reverse();
        

      } else {
        this.show = true
      }
    });
  }
 

}
