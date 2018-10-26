import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams, AlertController, ToastController, DateTime } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { BitkiCaylariServiceLocalFile } from '../../services/ResimliBtikiCayiServiceStorage';
import { ResimliBitkiCayiListPage } from '../resimli-bitki-cayi-list/resimli-bitki-cayi-list';
import { Resim } from '../../modals/resim';
@IonicPage()
@Component({
  selector: 'page-resimli-bitki-cayi-ekle',
  templateUrl: 'resimli-bitki-cayi-ekle.html',
})
export class ResimliBitkiCayiEklePage implements OnInit{

  mode = 'Ekle';
  bitkiCayiForm: FormGroup;
  public photos:any;
  public base64Image:string ;
  public imageUrl = '';
  constructor(public navParams: NavParams,public navCtrl: NavController,private camera: Camera,
    public alertCtrl: AlertController,private file:File,
     private toastCtrl: ToastController,private localStorage:Storage,
     private bitkiCaylariServiceLocalFile:BitkiCaylariServiceLocalFile) {

  }

  onSubmit() {
    const value = this.bitkiCayiForm.value;
    
    this.bitkiCaylariServiceLocalFile.addBitkiCayi(new Date().getUTCMilliseconds(), 
    value.adi,value.aciklama,this.photos,[],[]);
    this.mesaj('Bitki çayı eklendi');
    this.bitkiCayiForm.reset();
    this.navCtrl.push(ResimliBitkiCayiListPage);

  }
  mesaj(uyari:string)
  {
    const toast = this.toastCtrl.create({
      message: uyari,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }
  ngOnInit()
  {
    this.photos=[];
    if(!(this.mode == 'Ekle')){
      this.mode = this.navParams.get('mode');
    }
    this.initializeForm();
    this.photos=[];
    this.takePhoto();
  }
  
  takePhoto()
  {
    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 100,
    //  allowEdit: true,
      correctOrientation: false,
    //  saveToPhotoAlbum: true,
      // mediaType: 0
    };
    this.camera.getPicture(options)
    .then((imageData)=>{
      this.base64Image = "data:image/jpeg;base64," + imageData;

      this.photos.push(this.base64Image)
     
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );

    })
    .catch(err=>{
      console.log(err);
    });
  }
  deletePhoto(index)
  {
    const alert = this.alertCtrl.create({
      title: 'Fotoğraf Sil!',
      subTitle: 'Silmek istiyormusun',
      buttons: [
        { text:'Evet',
          handler:()=>{
            this.photos.splice(index,1);
          }}
       
      ]
    });
    alert.present();
  }
  private initializeForm() {
    let adi = null;
    let aciklama = null;
    this.bitkiCayiForm = new FormGroup({
      'adi': new FormControl(adi, Validators.required),
      'aciklama': new FormControl(aciklama, Validators.required)
     
    });
  }

}
