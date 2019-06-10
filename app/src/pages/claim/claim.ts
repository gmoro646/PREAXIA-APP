import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ModalController, AlertController  } from 'ionic-angular';
import { Keys,ITHoursService } from '../../providers/it-hours-service';
import { User } from '../../providers';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar'
import * as moment from 'moment';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-claim',
  templateUrl: 'claim.html'
})
export class ClaimPage {
  claimand:any=null
  description: any = null
  serviceDate: any = null
  amount: any = null
  imgToUpload: any = null
  image: any = []
  userData: any = null;
  date: Date = new Date();
  imgs: any = [];
  dependent: any = null;
  show: any = false;
  dependantId: any = null
  provider: any = null;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public itHoursService: ITHoursService,
    public camera: Camera,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl:ModalController) {
     this.storage.get(Keys.User.toString()).then((Response) => {
       this.userData = Response
       this.getdependent();
     });
     
  }

  getdependent() {
    var input = this.itHoursService.prepareNodeJSRequestObject("Claim", "GETDEPENDENT", { id: this.userData.UserId, AccountId: this.userData.AccountId });
    this.itHoursService.execute(input, false).then((response: any) => {
      if (response && response.apidata.Data) {
        this.dependent = response.apidata.Data
        this.show = true
      }
    })
  }

  openCalendar() {
    var d = new Date();
    //var year = d.getFullYear();
    //var month = d.getMonth();
    //var day = d.getDate();
    const options: CalendarModalOptions = {
      title: 'DATE',
      from: new Date(this.userData.RegistrationDate),
      defaultDate: this.date,
      defaultScrollTo: this.date,
      closeIcon: true,
      doneIcon: true

    };

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss((date, type) => {
      if (type === 'done') {
        this.date = date.dateObj;
        this.serviceDate = moment(this.date).format('DD/MM/YYYY');
      }
      console.log(date);
      console.log('type', type);
    })
  }
  saveClaim() {
     
    var obj: any = {
      accountId: this.userData.AccountId,
      submissionUserId: this.userData.UserId,
        claimant: this.claimand,
        serviceDescription:this.description,
        date: this.date,
        amount:Number(this.amount),
        status: "SentForReimbursement",
        submissionIpAddress: this.userData.RegistrationIpAddress,
        employeeId: this.userData.EmployeeId,
        dependantId: this.dependantId,
        files: this.imgs,
        provider: this.provider
      }
   
    if (this.claimand && this.description && this.serviceDate && this.amount) {
      this.itHoursService.toggleLoading();
          var input = this.itHoursService.prepareNodeJSRequestObject("Claim", "ADDNEWCLAIM", obj);
          this.itHoursService.execute(input, false).then((response: any) => {
            if (response && response.apidata.Data) {
              this.itHoursService.toggleLoading();
              this.navCtrl.push('TransferPage');
            } else {
              this.itHoursService.tostMessageBytext('Something went wrong', 'Top');
              this.itHoursService.toggleLoading();
            }
          });
        }
        else {
      //this.itHoursService.toggleLoading();
      this.itHoursService.tostMessageBytext("All fields are mandatory", 'Top');
        }

  }
  cancel() {
    this.navCtrl.pop();
  }
  
  openCamera(type) {
    var self = this;
    if (this.itHoursService.isMobileDevice()) {
      var options = this.itHoursService.GetPictureOption(type);
      self.camera.getPicture(options).then(function (imageData) {
        self.imgToUpload = imageData;
        self.imgs.push("data:image/png;base64," + self.imgToUpload);
      }, function (err) {
        console.log(err)
      });
    }
    else {
      self.imgToUpload = this.itHoursService.getHardCodeCameraImage();
      self.imgs.push("data:image/png;base64," + self.imgToUpload);
      console.log(self.imgs)
    }
  }

  showClaimand() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Dependent');

    if (this.claimand == 'self') {
      alert.addInput({
        type: 'radio',
        label: 'Self',
        value: 'self',
        checked: true
      });
    } else {
      alert.addInput({
        type: 'radio',
        label: 'Self',
        value: 'self',
        checked: false
      });
    }

    for (let i = 0; i < this.dependent.length; i++) {
      if (this.dependantId == this.dependent[i].DependantId) {
        alert.addInput({
          type: 'radio',
          label: this.dependent[i].Relationship,
          value: this.dependent[i].DependantId,
          checked: true
        });
      } else {
        alert.addInput({
          type: 'radio',
          label: this.dependent[i].Relationship,
          value: this.dependent[i].DependantId,
          checked: false
        });
      }
    }


    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data)
        if (data == 'self') {
          this.claimand = 'self';
          this.dependantId = null
        } else {
          let rl = _.find(this.dependent, function (t) { return t.DependantId == data })
          this.claimand = rl.Relationship
          this.dependantId = data
        }
      }
    });
    alert.present();
  }

    //uploadImageToServer(imgToUpload1) {
  //  return new Promise((resolve) => {
  //    var self = this;
  //    var blob: any = this.itHoursService.b64toBlob(imgToUpload1);
  //    blob.lastModifiedDate = new Date();
  //    blob.name = this.itHoursService.generateUUID() + ".png";
  //    var file = new window.File([blob], blob.name);

  //    var photoKey = blob.name;
  //    photoKey = 'PreAxia/' + photoKey;
  //    this.itHoursService.SetUpAWS().upload({
  //      Key: photoKey,
  //      Body: blob,
  //      ACL: 'public-read'
  //    }, function (err, data) {
  //      if (err) {
  //        resolve({ issuccess: false, image: null })
  //      } else {
  //        resolve({ issuccess: true, image: data.Location })
  //      }
  //    });
  //  })
  //}
}
