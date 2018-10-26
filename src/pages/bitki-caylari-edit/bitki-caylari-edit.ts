import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { BitkiCaylari } from '../../modals/bitkicaylari';
import { BitkiCaylariService } from '../../services/bitkicaylariservice';
import { Camera} from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-bitki-caylari-edit',
  templateUrl: 'bitki-caylari-edit.html',
})
export class BitkiCaylariEditPage implements OnInit{

  /**
   * resim işlemleri
   */
  public photos:any;
  public base64Image:string ;
  public imageUrl = '';
  /**
   * resim işlemleri sonu
   */
  mode='Ekle';
  bitkiCaylariForm:FormGroup;
  index:number;
  bitkiCaylari:BitkiCaylari;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetCtrl:ActionSheetController,private alertCtrl:AlertController,
    private toastCtrl:ToastController,private bitkiCaylariService:BitkiCaylariService,
    private camera: Camera,private nativeStorage: NativeStorage) 
    {
    }
  onSubmit()
  {
    const value=this.bitkiCaylariForm.value;
    let ingredients=[];
    if(value.icindekiler.length>0)
    {
      ingredients=value.icindekiler.map(adi=>{
        return {adi:adi};
      })

    }
    if(this.mode=='Güncelle')
    {
      this.bitkiCaylariService.updateBitkiCayi(this.index.toString(), value.adi,value.yapilisi,
        value.miktari,value.suresi,value.faydasi,ingredients);
    }else{
     this.bitkiCaylariService.ekleBitkiCayi(value.adi,value.yapilisi,
       value.miktari,value.suresi,value.faydasi,ingredients);
    }
      this.bitkiCaylariForm.reset();
      this.navCtrl.popToRoot();
  }
  ngOnInit()
  {
    this.mode=this.navParams.get('mode');
    if(this.mode=='Güncelle')
    {
      this.bitkiCaylari=this.navParams.get('bitkiCaylari');
      this.index=this.navParams.get('index');
    }

    this.initializeForm();
  }
  onManageIngredients()
  {
    const actionSheet=this.actionSheetCtrl.create({
      title:'Ne Yapmak İstersin',
      buttons:[
        {
          text:'Bitki Ekle',
          handler:()=>{
            this.createNewIngredientAlert().present();
          }
        },
        {
            text:'Tüm Bitkileri Sil?',
            role:'descructive',
            handler:()=>{
              const fArray:FormArray=<FormArray>this.bitkiCaylariForm.get('icindekiler');
              const len=fArray.length;
              if(len>0)
              {
                for(let i=len-1;i>=0;i--)
                {
                  fArray.removeAt(i);
                }
                const toast=this.toastCtrl.create({
                  message:'Tüm Bitkiler Silindi?',
                  duration:1000,
                  position:'bottom'
  
                });
                toast.present();
              }
            }
        },
        {
          text:'İptal',
          role:'iptal'

        }
      ]
    });
    actionSheet.present();
  }
  private createNewIngredientAlert()
  {
   return this.alertCtrl.create({
      title:'Bitki Ekle',
      inputs:[
        {
          name:'adi',
          placeholder:'Bitki adi ve miktarı'
        }
      ],
      buttons:[
        {
          text:'iptal',
          role:'cancel'
        },
        {
          text:'Ekle',
          handler:data=>{
            if(data.adi.trim()=='' || data.adi==null)
            {
              const toast=this.toastCtrl.create({
                message:'lütfen Doğru Bilgi Giriniz',
                duration:1000,
                position:'bottom'

              });
              toast.present();
              return;
            }
            console.log(this.bitkiCaylariForm);
            (<FormArray>this.bitkiCaylariForm.get('icindekiler'))
            .push(new FormControl(data.adi,Validators.required));
            const toast=this.toastCtrl.create({
              message:'Yeni Bitki Eklendi',
              duration:1000,
              position:'bottom'

            });
            toast.present();
          }
          
        }
      ]
    });
  }
  private initializeForm()
  {
    let adi=null;
    let yapilisi=null;
    let sure=null;
    let miktar=null;
    let fayda=null;
    let icindekilerList=[];
    if(this.mode=='Güncelle')
    {
      adi=this.bitkiCaylari.adi;
      yapilisi=this.bitkiCaylari.yapilisi;
      sure=this.bitkiCaylari.suresi;
      miktar=this.bitkiCaylari.miktari;
      fayda=this.bitkiCaylari.faydasi;
      for(let icindekiler of this.bitkiCaylari.icindekiler)
      {
        icindekilerList.push(new FormControl(icindekiler.adi,Validators.required));
      }
    } 
    this.bitkiCaylariForm=new FormGroup({
      'adi':new FormControl(adi,Validators.required),
      'yapilisi':new FormControl(yapilisi,Validators.required),
      'suresi':new FormControl(sure,Validators.required),
      'miktari':new FormControl(miktar,Validators.required),
      'faydasi':new FormControl(fayda,Validators.required),
      'icindekiler':new FormArray(icindekilerList)
    });
  }
  onManageEkler()
  {
    const actionSheet=this.actionSheetCtrl.create({
      title:'Ne Yapmak İstersin',
      buttons:[
        {
          text:'Resim Ekle',
          handler:()=>{
         //   this.createNewIngredientAlert().present();
          }
        },
        {
            text:'Video Ekle',
            handler:()=>{
            }
        },
        {
          text:'Ses Ekle',
          handler:()=>{
          }
      },
        {
          text:'İptal',
          role:'iptal'
        }
      ]
    });
    actionSheet.present();
  }
  takePhoto()
  {
    let options = 
    {
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

      this.photos.push(this.base64Image);
     this.photos.reverse();
     this.nativeStorage.setItem('myitem', this.photos)
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );

    })
    .catch(err=>{
      console.log(err);
    });
  }
}
