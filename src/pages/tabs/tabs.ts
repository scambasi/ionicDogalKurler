import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitkiCaylariListPage } from '../bitki-caylari-list/bitki-caylari-list';
import { AlisverisListPage } from '../alisveris-list/alisveris-list';
import { ResimliBitkiCayiListPage } from '../resimli-bitki-cayi-list/resimli-bitki-cayi-list';
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  bkCaylariPage=BitkiCaylariListPage
  alisverisPage=AlisverisListPage;
  resimliBitkiCayiListPage:any=ResimliBitkiCayiListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
