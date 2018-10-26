import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitkiCaylariEditPage } from '../bitki-caylari-edit/bitki-caylari-edit';
import { BitkiCaylari } from '../../modals/bitkicaylari';
import { BitkiCaylariPage } from '../bitki-caylari/bitki-caylari';
import { BitkiCaylariService } from '../../services/bitkicaylariservice';

@IonicPage()
@Component({
  selector: 'page-bitki-caylari-list',
  templateUrl: 'bitki-caylari-list.html',
})
export class BitkiCaylariListPage implements OnInit{
  descending: boolean = false;
  order: number;
  column: string = 'adi';
  bitkiCaylari:BitkiCaylari[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bitkicaylariservice:BitkiCaylariService ) {
    
     console.log('constructor:ListPage');
     this.getBitkiCaylari(null);
  }
  ngOnInit()
  {
    console.log('ngOnInit:ListPage');
    
  }
  ionViewWillEnter()
  {
    console.log('ionViewWillEnter:ListPage');
    this.getBitkiCaylari(null);
  }
  ionViewDidLoad() {
    console.log('ionViewWillEnter:ListPage');

  }
  onNewTarif()
  {
    this.navCtrl.push(BitkiCaylariEditPage,{mode:'Ekle'});
  }
  onLoadTarif(bitkiCaylari:BitkiCaylari,index:number)
  {
    this.navCtrl.push(BitkiCaylariPage,{bitkiCaylari:bitkiCaylari,index:index});
  } 
  getBitkiCaylari(refresher)
  {
    this.bitkiCaylari=this.bitkicaylariservice.getBitkiCaylari();
    if(refresher!=null)
    {
      setTimeout(() => {
        console.log('ion-Refresher Çalıştı');
        refresher.complete();
      }, 100);
    }

  }
  getItems(ev: any) {
    // Reset items back to all of the item
    this.getBitkiCaylari(null);
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.bitkiCaylari = this.bitkiCaylari.filter((item) => {
        return this.bitkiCaylari;
      })
    }
  }
  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }
}
