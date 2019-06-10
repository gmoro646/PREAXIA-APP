import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Keys,ITHoursService } from '../../providers/it-hours-service';
import { User } from '../../providers';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    email:any=null
    password: any = null
    userData: any = null;
    deviceId: any = -1;
    rem: any;
    constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public itHoursService: ITHoursService,
    public storage: Storage) {
 
      this.storage.get('DeviceId').then((deviceID) => {
        if (deviceID) {
          this.deviceId = deviceID;
        }
      });

      this.storage.get('email-pass').then((data) => {
        if (data) {
          this.email = data.email;
          this.password = data.pass;
          this.rem = true;
        }
      });
     
  }
  doLogin() {
    if (this.email && this.password) {

      if (this.rem) {
        this.storage.set('email-pass', { email: this.email, pass: this.password });
      } else {
        this.storage.set('email-pass', {});
      }

      if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
        this.itHoursService.toggleLoading();
        this.itHoursService.executeByURL("api/login", { email: this.email.toLowerCase(), password: this.password }, false).then((response: any) => {
          if (response && response.apidata && response.apidata.Data) {
            this.userData = response.apidata.Data;
            this.storage.set(Keys.User.toString(), response.apidata.Data);

            //var deviceInput = this.itHoursService.prepareNodeJSRequestObject("User",
            //  "ADDDEVICE", {
            //    ID: this.userData._id,
            //    Device: {
            //      Id: this.deviceId,
            //      DTYPE: this.itHoursService.isIOSDevice() ? 'IOS' : 'ANDROID'
            //    }
            //  });
            //this.itHoursService.execute(deviceInput, false).then((response: any) => {});
            
            this.itHoursService.toggleLoading();
            //this.navCtrl.push('HomePage');
            this.navCtrl.push('LockscreenPage', { store: true });
            this.itHoursService.tostMessageShow("LOGIN", 'Top');
          } else {
            this.itHoursService.tostMessageBytext('INVALID USERNAME AND PASSWORD', 'Top');
            this.itHoursService.toggleLoading();
          }
        });
      }
      else {
        this.itHoursService.tostMessageShow("INCORRECTEMAIL", 'Top');
      }
    }
    else {
      this.itHoursService.tostMessageShow("SIGNUPFIELD", 'Top');
    }
  }

}
