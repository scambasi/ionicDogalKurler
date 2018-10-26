import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BitkiCaylariServiceLocalFile } from '../../services/ResimliBtikiCayiServiceStorage';
import { SesliBitkiCayiListPage } from '../sesli-bitki-cayi-list/sesli-bitki-cayi-list';


@IonicPage()
@Component({
  selector: 'page-sesli-bitki-cayi-ekle',
  templateUrl: 'sesli-bitki-cayi-ekle.html',
})
export class SesliBitkiCayiEklePage implements OnInit{
  audio: MediaObject;
  audioList: any[] = [];
  recording: boolean = false;
  filePath: string;
  fileName: string;
  bitkiCayiForm: FormGroup;
  mode = 'Ekle';
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage:Storage,private media:Media,private file:File,
    public platform: Platform,private bitkiCaylariServiceLocalFile:BitkiCaylariServiceLocalFile,
    private toastCtrl: ToastController) {
  }

  ionViewWillEnter() { 
    if(!(this.mode == 'Ekle')){
      this.mode = this.navParams.get('mode');
    }

    this.audioList=[];
    this.startRecord();
   // this.getAudioList();
  }
  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }
  startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'kayit'+new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()+'-'+new Date().getHours()+'-'+new Date().getMinutes()+'-'+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'kayit'+new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()+'-'+new Date().getHours()+'-'+new Date().getMinutes()+'-'+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  } 
  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }
  playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }
  onSubmit() {
    const value = this.bitkiCayiForm.value;
    
    this.bitkiCaylariServiceLocalFile.addBitkiCayi(new Date().getUTCMilliseconds(), 
    value.adi,value.aciklama,[],[],[]);
    this.mesaj('Sesli Bitki Çayı Eklendi');
    this.bitkiCayiForm.reset();
    this.navCtrl.push(SesliBitkiCayiListPage);

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
  private initializeForm() {
    let adi = null;
    let aciklama = null;
    this.bitkiCayiForm = new FormGroup({
      'adi': new FormControl(adi, Validators.required),
      'aciklama': new FormControl(aciklama, Validators.required)
     
    });
  }
  ngOnInit()
  {
    this.initializeForm();
  }
}
