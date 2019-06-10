import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { Keys , ITHoursService} from '../providers/it-hours-service';
import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import { Storage } from '@ionic/storage';
//import { IntercomOriginal } from '@ionic-native/intercom';
@Component({
  template: `<ion-menu [content]="content" hidden>
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Home', component: 'HomePage' }
  //  { title: 'Camera', component: 'CameraPage' }
   // { title: 'Photos', component: 'PhotosPage'},
 //   { title: 'Transfer', component: 'TransferPage'},
   // { title: 'ClaimHome', component: 'ClaimHomePage'}

  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config,
    private statusBar: StatusBar, public storage: Storage,
    private splashScreen: SplashScreen, public itHoursService: ITHoursService) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.gotoLandingPage()
    });
   // intercom.registerIdentifiedUser({ email: "prakhar.gautam@ithours.com", userId: "123456" })
    this.initTranslate();
  }

  initTranslate() {
   
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  gotoLandingPage() {
    this.storage.get(Keys.User.toString()).then((data) => {
      if (data) {
        this.nav.setRoot('LockscreenPage');
      } else {
        this.nav.setRoot('TutorialPage');
      }
    });
  }

 
}
