import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { BitkiCaylariListPage } from '../pages/bitki-caylari-list/bitki-caylari-list';
import { BitkiCaylariEditPage } from '../pages/bitki-caylari-edit/bitki-caylari-edit';
import { BitkiCaylariPage } from '../pages/bitki-caylari/bitki-caylari';
import { BitkiCaylariService } from '../services/bitkicaylariservice';
import { AlisverisListPage } from '../pages/alisveris-list/alisveris-list';
import { AlisVerisListService } from '../services/alisverisService';
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import { Camera } from '@ionic-native/camera';
import { ResimliBitkiCayiEklePage } from '../pages/resimli-bitki-cayi-ekle/resimli-bitki-cayi-ekle';
import { File } from '@ionic-native/file';
import { BitkiCaylariServiceLocalFile } from '../services/ResimliBtikiCayiServiceStorage';
import { ResimliBitkiCayiListPage } from '../pages/resimli-bitki-cayi-list/resimli-bitki-cayi-list';
import { ResimliBitkiCayiPage } from '../pages/resimli-bitki-cayi/resimli-bitki-cayi';
import { IonicStorageModule } from '@ionic/storage';

import { Media} from '@ionic-native/media';
import { MediaCapture } from '@ionic-native/media-capture';
import { SesliBitkiCayiEklePage } from '../pages/sesli-bitki-cayi-ekle/sesli-bitki-cayi-ekle';
import { SesliBitkiCayiListPage } from '../pages/sesli-bitki-cayi-list/sesli-bitki-cayi-list';
import { SesliBitkiCayiPage } from '../pages/sesli-bitki-cayi/sesli-bitki-cayi';
//import { NativeStorage } from '@ionic-native/native-storage';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BitkiCaylariListPage
    ,BitkiCaylariEditPage
    ,BitkiCaylariPage
    ,AlisverisListPage, SearchPipe,
    SortPipe,ResimliBitkiCayiEklePage,ResimliBitkiCayiListPage,ResimliBitkiCayiPage,
    SesliBitkiCayiEklePage,SesliBitkiCayiListPage,SesliBitkiCayiPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
    ,BitkiCaylariListPage
    ,BitkiCaylariEditPage
    ,BitkiCaylariPage
    ,AlisverisListPage,ResimliBitkiCayiEklePage,
    ResimliBitkiCayiListPage,ResimliBitkiCayiPage,
    SesliBitkiCayiEklePage,SesliBitkiCayiListPage,SesliBitkiCayiPage
  ],
  providers: [
    StatusBar,
    SplashScreen,BitkiCaylariService,AlisVerisListService,
    BitkiCaylariServiceLocalFile,Camera,Media,MediaCapture, File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
