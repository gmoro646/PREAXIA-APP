import { Injectable, Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {  Platform,AlertController, LoadingController, Events, Loading} from 'ionic-angular';
import { Camera, CameraPopoverOptions } from '@ionic-native/camera';
//import * as moment from 'moment'; // add this 1 of 4
declare let AWS: any;
// import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { APPCONFIG} from './appconfig'
/// <reference path="./typings/bluebird/bluebird.d.ts" />
declare let window: any;
declare let cordova: any;
declare let X2JS: any;
/*
  Generated class for the ITHoursService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class ITHoursService {

    mode ="DEV"
    data: any;
    api: any = {};
    user: any;
    userid: any;

    constructor(public http: Http,
        public alertCtrl: AlertController,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        private camera: Camera,
        public loading: LoadingController,
        public toastCtrl: ToastController, public events: Events) {
        console.log('Hello ITHoursService Provider');
        this.api.setting = APPCONFIG[APPCONFIG.INSTANCE];
        }

    tostMessageShow(msgid: string, pos: string) {
        var item = this.getMessageById(msgid);
        let toast = this.toastCtrl.create({
            message: item,
            duration: 3000,
            position: pos
        });
        toast.present();
    }
    tostMessageBytext(item: string, pos: string) {
        //var item = this.getMessageById(msgid);
        let toast = this.toastCtrl.create({
            message: item,
            duration: 1000,
            position: pos
        });
        toast.present();
    }

    getdefaultimageurl() {
        return "assets/img/loaddefault.jpg";
    }
    isMobileDevice() {
        return this.api.setting.ISMOBILEDEVICE;
    }
    getAPIBaseURL() {
        return this.api.setting.APIBASE;
    }
    getUrl(append: string) {
        return this.getAPIBaseURL() + append;
    }
    getHardCodeCameraImage() {
        return "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"
    }

    isIOSDevice() {
        if (this.platform.is('ios')) {
            return true;
        }
        else
            return false;
    }

    SetUpAWS() {
      var albumBucketName = 'dolphino';
      var bucketRegion = 'us-west-2';
      var IdentityPoolId = 'us-west-2:ff182092-2a76-489c-9d58-45ba742d9e7d'

      AWS.config.update({
          region: 'us-west-2',
          credentials: new AWS.CognitoIdentityCredentials({
              IdentityPoolId: IdentityPoolId
          })
      });

      return new AWS.S3({
          apiVersion: '2006-03-01',
          params: { Bucket: albumBucketName }
      });
  }

    b64toBlob(dataURI) {
      var byteString = atob(dataURI);//.split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/png' });
  }

    GetPictureOption(type){
      var sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
      if (type == 1) {
        sourceType = this.camera.PictureSourceType.CAMERA;
      }
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: sourceType,
            allowEdit: true,
            encodingType: this.camera.EncodingType.PNG,
            targetWidth: 800,
            targetHeight: 800,
            //popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        return options;
    }

    getSharedUrl() {
        return this.getUrl("api/manager");
    }
    getImageBaseUrl() {
        return this.getAPIBaseURL();
    }
    getdefaultaudioimage() {
        return "https://lh5.ggpht.com/ak8KnO9ig-GEu2o2tXw6ePH169VTd02XGzFVh35mnlEuZh0v4_P2DM2DSIvRVfDfRo0=w300";
    }
    getdefaultvideoimage() {
        return "http://gardeniapublicschool.com/images/default-video.png";
    }
    getHeaders() {
        let headers = new Headers();
        headers.append('UserId', '12345');
        headers.append('DeviceId', '12345');
        return headers;
    }
    prepareNodeJSRequestObject(prcId: string, opId: string, data: any) {
        var toSend: any = {
            PRCID: prcId,
            Method: opId
        };
        if (data)
            toSend.Data = data;
        else
            toSend.Data = {};

        return toSend;
    }
    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    execute(inputData, showload: boolean = true) {
        // don't have the data yet
        return new Promise(resolve => {



            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.post(this.getSharedUrl(), inputData)
                .map(res => res.json())
                .subscribe(
                data => {
                    resolve({ isapisuccess: true, apidata: data })
                },
                error => {
                    resolve({ isapisuccess: false, apidata: null })
                }
                );
            //.subscribe(response => {
            //    // we've got back the raw data, now generate the core schedule data
            //    // and save the data for later reference
            //    resolve(response);
            //});
        });
    }

    executeByURL(url:string, inputData, showload: boolean = true) {
      // don't have the data yet
      return new Promise(resolve => {



        // We're using Angular HTTP provider to request the data,
        // then on the response, it'll map the JSON data to a parsed JS object.
        // Next, we process the data and resolve the promise with the new data.
        this.http.post(this.getUrl(url), inputData)
          .map(res => res.json())
          .subscribe(
          data => {
            resolve({ isapisuccess: true, apidata: data })
          },
          error => {
            resolve({ isapisuccess: false, apidata: null })
          }
          );
        //.subscribe(response => {
        //    // we've got back the raw data, now generate the core schedule data
        //    // and save the data for later reference
        //    resolve(response);
        //});
      });
    }

    showAlert(message) {
        let alert = this.alertCtrl.create({
            title: 'Dating App',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
    IsNull(val) {
        if (val == '' || val == null || val === undefined)
            return true;
    }
    generateClientMessageId() {
        var d = new Date();
        return d.getTime();
    }
    getloderstatus() {
      var _self = this;
      if (_self.loadStatus) {
        _self.loader.dismiss();
      }
    }
    loadStatus = false;
    loader: Loading;
    toggleLoading(msg?) {
        var _self = this;
        if (_self.loadStatus) {
            _self.loader.dismiss();
        }
        else {
            //_self.loader = _self.loadingCtrl.create({
            //    content: 'Please wait...'
            //});
            if (msg) {
                _self.loader = _self.loadingCtrl.create({ content: msg });
            } else {
                _self.loader = _self.loadingCtrl.create();
            }
            _self.loader.present();

            //let loading = this.loadingCtrl.create({
            //    content: 'Please wait...'
            //});
            //loading.present();
        }
        _self.loadStatus = !_self.loadStatus;
    }
    showAlert1(message: any) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
    getdefaultusrerimage() {
        return "assets/img/defaultuserimg.png";
    }
    messageList = {
      INVALIDEMAILPASS: "Incorrect Email Id and Password",
      INCORRECTEMAIL: "Incorrect Email Format",
      LOGIN: "You have Successfully Logged In",
      SIGNUPFIELD: "Please fill all details",
      REGISTER: "You have Successfully Registered",
      VALIDATION: "Please enter the valid code",
      VERIFY: "You have Successfully Verified account",
      PASSWORDRESET:"Password Reset Successfully",
      UPDATE: "Details updated successfully",
      ENTERDETAILS: "Please Enter the Details first",
      PASSCODE:"Incorrect Passcode"
    }
    getMessageById(msgId) {
        if (this.messageList[msgId])
            return this.messageList[msgId];
        else
            return "Data has been sync successfully";
    }
}


export enum Keys {
    User,
    Groups,
    Messages,
    Cart,
    Passcode,
    Profile,
}
export enum GroupJoinStatus {
    ACCEPTED,
    INVITED,
    REJECTED,
    LEFT
}
export enum GroupMediaType {
    IMAGE,
    AUDIO,
    VIDEO,
    TEXT
}
export enum Groupmodify {
    IMAGE,
    NAME,
    MEMBER_M,
    DELETE_G,
    BLOCK,
    REMOVE,
    ADMIN,
    UNBLOCK
}
