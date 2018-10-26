import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import Parse from 'parse';
import { ResimliBitkiCayiEklePage } from '../pages/resimli-bitki-cayi-ekle/resimli-bitki-cayi-ekle';
import { ResimliBitkiCayiListPage } from '../pages/resimli-bitki-cayi-list/resimli-bitki-cayi-list';
import { SesliBitkiCayiEklePage } from '../pages/sesli-bitki-cayi-ekle/sesli-bitki-cayi-ekle';
import { SesliBitkiCayiListPage } from '../pages/sesli-bitki-cayi-list/sesli-bitki-cayi-list';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
   resimliBitkiCayiEklePage: any = ResimliBitkiCayiEklePage;
   resimliBitkiCayiListPage:any=ResimliBitkiCayiListPage;
   sesliBitkiCayiEklePage:any=SesliBitkiCayiEklePage;
   sesliBitkiCayiListPage:any=SesliBitkiCayiListPage;

  @ViewChild('nav') nav: NavController;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
     private menuCtrl: MenuController) {
    platform.ready().then(() => {
      console.log('parseserver.initialize');
      statusBar.styleDefault();
      splashScreen.hide();
      Parse.serverURL = 'https://parseapi.back4app.com/';
      Parse.initialize("1PDfxOZaIcldS56Ue0tagvjq98GGyaRK7ptOtbZN", "4sRePMpTCmRs2cxOPf1WsOeIyHUVsXBzF7RdnQNu");
    });
  }
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

}

