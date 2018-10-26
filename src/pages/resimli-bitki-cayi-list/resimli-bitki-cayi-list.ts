import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitkiCaylariServiceLocalFile } from '../../services/ResimliBtikiCayiServiceStorage';
import { BitkiCayi } from '../../modals/bitkiCayi';
import { ResimliBitkiCayiEklePage } from '../resimli-bitki-cayi-ekle/resimli-bitki-cayi-ekle';
import { ResimliBitkiCayiPage } from '../resimli-bitki-cayi/resimli-bitki-cayi';

@IonicPage()
@Component({
  selector: 'page-resimli-bitki-cayi-list',
  templateUrl: 'resimli-bitki-cayi-list.html',
})
export class ResimliBitkiCayiListPage implements OnInit {
  bitkiCaylari: BitkiCayi[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bitkiCaylariServiceLocalFile:BitkiCaylariServiceLocalFile) {
  }
  ngOnInit() {
    // this.bitkiCaylariServiceLocalFile.fetchBitkiCaylari()
    //   .then(
    //     (bitkiCaylari: BitkiCayi[]) => this.bitkiCaylari = bitkiCaylari
    //   );
      console.log('ngOnInit');
      
  }


  ionViewWillEnter() {
  //  this.bitkiCaylari = this.bitkiCaylariServiceLocalFile.loadBitkiCaylari();
   this.bitkiCaylariServiceLocalFile.fetchBitkiCaylari()
      .then(
        (bitkiCaylari: BitkiCayi[]) => this.bitkiCaylari = bitkiCaylari
      );
      console.log('ionViewWillEnter');

  }

  yeniBitkiCayi() {
    this.navCtrl.push(ResimliBitkiCayiEklePage, {mode: 'Ekle'});
  }

  yukleBitkiCayi(bitkiCayi: BitkiCayi, index: number) {
    this.navCtrl.push(ResimliBitkiCayiPage, {bitkiCayi: bitkiCayi, index: index});
  }
}
