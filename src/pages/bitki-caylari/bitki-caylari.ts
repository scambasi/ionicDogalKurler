import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitkiCaylari } from '../../modals/bitkicaylari';
import { BitkiCaylariEditPage } from '../bitki-caylari-edit/bitki-caylari-edit';
import { BitkiCaylariService } from '../../services/bitkicaylariservice';
import { AlisVerisListService } from '../../services/alisverisService';

@IonicPage()
@Component({
  selector: 'page-bitki-caylari',
  templateUrl: 'bitki-caylari.html',
})
export class BitkiCaylariPage implements OnInit {

  bitkiCayi:BitkiCaylari;
  index:number;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,private bitkiCaylariService:BitkiCaylariService,
    private alService:AlisVerisListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BitkiCaylariPage');
  }
  ngOnInit()
  {
   this.bitkiCayi=this.navParams.get('bitkiCaylari');
   this.index=this.navParams.get('index'); 
   console.log('ngOnInit'+this.navParams.get('bitkiCaylari'));
  }
  onEditTarif()
  {
    this.navCtrl.push(BitkiCaylariEditPage,{mode:'Güncelle',bitkiCaylari:this.bitkiCayi,index:this.index}); 
    
  }
  onAddIcindekiler()
  {
    this.alService.addItems(this.bitkiCayi.icindekiler);

  }
  onDeleteTarif()
  {
    this.bitkiCaylariService.deleteBitkiCayi(this.index);
    this.navCtrl.popToRoot();
  }

}
