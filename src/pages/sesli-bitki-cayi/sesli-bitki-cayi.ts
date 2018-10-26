import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { BitkiCayi } from '../../modals/bitkiCayi';
import { BitkiCaylariServiceLocalFile } from '../../services/ResimliBtikiCayiServiceStorage';
import { SesliBitkiCayiEklePage } from '../sesli-bitki-cayi-ekle/sesli-bitki-cayi-ekle';

@IonicPage()
@Component({
  selector: 'page-sesli-bitki-cayi',
  templateUrl: 'sesli-bitki-cayi.html',
})
export class SesliBitkiCayiPage {

  bitkicayi: BitkiCayi;
  index: number;

  constructor(public navParams: NavParams,public navCtrl: NavController,
              private viewCtrl: ViewController,public alertCtrl: AlertController,
              private bitkiCaylariServiceLocalFile:BitkiCaylariServiceLocalFile) {
          
    this.bitkicayi = this.navParams.get('bitkiCayi');
    this.index = this.navParams.get('index');
    console.log(this.bitkicayi);
  }

  bitkiCayiEkraniKapat() {
    this.viewCtrl.dismiss();
  }

  bitkiCayiSil() {
    const alert = this.alertCtrl.create({
      title: 'Bitki Çayını Sil!',
      subTitle: 'Silmek istiyormusun',
      buttons: [
        { text:'Evet',
          handler:()=>{
            this.bitkiCaylariServiceLocalFile.deleteBitkiCayi(this.index);
          }}
       
      ]
    });
    alert.present();
    
    this.bitkiCayiEkraniKapat();
  }
  bitkiCayiYeni() {
    this.navCtrl.push(SesliBitkiCayiEklePage, {mode: 'Ekle'});
  }
 
}
