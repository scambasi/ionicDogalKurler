import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AlisVerisListService } from '../../services/alisverisService';
import { Icindekiler } from '../../modals/icindekiler';

@IonicPage()
@Component({
  selector: 'page-alisveris-list',
  templateUrl: 'alisveris-list.html',
})
export class AlisverisListPage
 {
  listItems:Icindekiler[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alService:AlisVerisListService) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlisverisListPage');
  }
  onAddItem(form:NgForm)
  {
    this.alService.addItem(form.value.malzemeler,form.value.miktar);
    form.reset();
    this.loadItems();
  }
  private onCheckItem(index:number)
  {
    this.alService.removeItem(index);
    this.loadItems();
  }
  private loadItems()
  {
    this.listItems=this.alService.getItems();
  } 
  
  // onShowOptions(event: MouseEvent) {
  //   const loading = this.loadingCtrl.create({
  //     content: 'Lütfen Bekleyiniz...'
  //   });
  //   const popover = this.popoverCtrl.create(DatabaseOptionsPage);
  //   popover.present({ev: event});
  //   popover.onDidDismiss(
  //     data => {
  //       if (!data) {
  //         return;
  //       }
  //       if (data.action == 'load') {
  //         loading.present();
  //         let offset = this.listItems.length;
  //         let limit = 10;
  //         return this.slService.getAlisverisListesi(offset, limit).then((result) => {
  //           for (let i = 0; i < result.length; i++) {
  //             let object = result[i];
  //             console.log('adi:'+object.get('adi'));
           
  //             this.listItems.push(new Ingredient(object.get('adi'),object.get('miktari')));
              
  //           }
  //           console.log(result);
  //           loading.dismiss();
  //         }, (error) => {
  //           console.log(error);
  //           this.handleError(error.message);
  //     });
  //       } else if (data.action == 'store') {
  //         loading.present();
  //         this.slService.addAlisverisListesi().then((alisverisList) => {
  //         this.listItems.push(alisverisList);
  //         loading.dismiss();
  //       }, (error) => {
  //         console.log(error);
  //         this.handleError(error.message);
  //       });
  //       }
  //     }
  //   );
  // }
  // private handleError(errorMessage:string)
  // {
  //   const alert=this.alertCtrl.create(
  //     {
  //       title:'Hata !',
  //       message:errorMessage,
  //       buttons:['OK']
  //     }
  //   );
  //   alert.present();
  // }

}
