import { Component, OnInit } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform ,NavParams,Events} from 'ionic-angular';
import { Keys, ITHoursService } from '../../providers/it-hours-service';
import { Storage } from '@ionic/storage';
export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-lockscreen',
  templateUrl: 'lockscreen.html'
})
export class LockscreenPage implements OnInit {

  _showLockScreen:boolean;
  ACDelbuttons:boolean;
  passcodeWrong:boolean;
  touchId:boolean;
  

  passcodeAttempts:number = 0;

  enteredPasscode:string = '';
  passcode:string;
  passcodeLabel:string;
  touchLabel:string;

  onCorrect:any;
  onWrong:any;
  selected: any;
  store: boolean = false;
  constructor(
    public events:Events,
    private navCtrl:NavController,
    private navParams: NavParams,
    public storage: Storage,
    public itHoursService:ITHoursService
 
  ){
    this._showLockScreen   = true;
    //this.touchId           = navParams.data.touchId || false;
    //this.ACDelbuttons      = navParams.data.ACDelbuttons || false;
    //this.passcode          = navParams.data.code;
    //this.onCorrect         = navParams.data.onCorrect || null;
    //this.onWrong           = navParams.data.onWrong || null;
    this.store = navParams.data.store;
    if (this.store) {
      this.passcodeLabel = 'Enter Passcode';
    } else {
      this.passcodeLabel = 'Verify Passcode';
    }
  
    //this.touchLabel        = navParams.data.passcodeLabel || 'Verify Passcode';

  }

  ngOnInit() {
      // setTimeout(()=>{
      //   if (this.touchId) {
      //     TouchID.isAvailable().then(
      //       res => {
      //         TouchID.verifyFingerprint(this.passcodeLabel).then(
      //           res => {
      //             this._showLockScreen = false;
      //             this.onCorrect && this.onCorrect();
      //             this.navCtrl.pop();
      //           },
      //           err => {
      //             console.log("Unable to unlock the device with this fingerprint.");
      //           }
      //         )
      //       },
      //       err => {
      //         console.log("Touch ID is not available.");
      //       }
      //     )
      //   }
      // }, 50);
  }

  forgot() {
    this.enteredPasscode = "";
    this.navCtrl.push('LoginPage');
  }

  remove():void {
    this.enteredPasscode = this.enteredPasscode.slice(0, -1);
  }

  digit(digit: any): void {
    this.selected = +digit;
    //if (this.passcodeWrong) {
    //  return;
    //}
    if (this.enteredPasscode.length < 4) {
      this.enteredPasscode += '' + digit;

      if (this.enteredPasscode.length == 4) {
       
        if (this.store) {
          this.storage.set(Keys.Passcode.toString(), this.enteredPasscode);
          this.navCtrl.setRoot('HomePage');
        } else {
          var self = this
          this.storage.get(Keys.Passcode.toString()).then(function (passcode) {
            
            if (passcode == self.enteredPasscode) {
              self.navCtrl.setRoot('HomePage');
            } else {
              //show error
              self.enteredPasscode = "";
              self.itHoursService.tostMessageShow("PASSCODE", 'Top');
            }
          });
        }
         //if(this.enteredPasscode === '' + this.passcode) {
         //  this.enteredPasscode = '';
         //  this.passcodeAttempts= 0;
         //  this.onCorrect && this.onCorrect();
         //  this._showLockScreen = false;
         //  this.navCtrl.pop();
         //} else {
         //  this.passcodeWrong = true;
         //  this.passcodeAttempts++;
         //  this.onWrong && this.onWrong(this.passcodeAttempts);
         //  setTimeout(()=>{
         //    this.enteredPasscode = '';
         //    this.passcodeWrong = false;
         //  }, 800);
         //}
      }
    }
  }


}
