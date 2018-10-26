import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitkiCaylariServiceLocalFile } from '../../services/ResimliBtikiCayiServiceStorage';
import { BitkiCayi } from '../../modals/bitkiCayi';
import { SesliBitkiCayiPage } from '../sesli-bitki-cayi/sesli-bitki-cayi';

@IonicPage()
@Component({
  selector: 'page-sesli-bitki-cayi-list',
  templateUrl: 'sesli-bitki-cayi-list.html',
})
export class SesliBitkiCayiListPage implements OnInit{

  bitkiCaylari: BitkiCayi[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bitkiCaylariServiceLocalFile:BitkiCaylariServiceLocalFile) {
  }
  ngOnInit() {
    this.bitkiCaylariServiceLocalFile.fetchBitkiCaylari()
      .then(
        (bitkiCaylari: BitkiCayi[]) => this.bitkiCaylari = bitkiCaylari
      );
  }


  ionViewWillEnter() {
    this.bitkiCaylari = this.bitkiCaylariServiceLocalFile.loadBitkiCaylari();
  }

  yeniBitkiCayi() {
    this.navCtrl.push(SesliBitkiCayiPage, {mode: 'Ekle'});
  }

  yukleBitkiCayi(bitkiCayi: BitkiCayi, index: number) {
    this.navCtrl.push(SesliBitkiCayiPage, {bitkiCayi: bitkiCayi, index: index});
  }

}
