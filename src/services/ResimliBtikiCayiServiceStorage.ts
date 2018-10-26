import { Injectable } from "@angular/core";
import { BitkiCayi } from "../modals/bitkiCayi";
import { Video } from "../modals/video";
import { Storage } from "@ionic/storage";


@Injectable()
export class BitkiCaylariServiceLocalFile
{
  private bitkiCaylari: BitkiCayi[] = [];

  constructor(private storage: Storage) {}

  addBitkiCayi(id:number,adi:string,aciklama:string,resim:any,ses:any,video:Video[]) 
  {
    const bitkiCayi=new BitkiCayi(id,adi,aciklama,resim,ses,video);
    this.bitkiCaylari.push(bitkiCayi);
    console.log("bitkicayi"+bitkiCayi.adi+bitkiCayi.aciklama);
    this.storage.set('resimlibitkiCaylari',JSON.stringify(this.bitkiCaylari));
  }

  loadBitkiCaylari() {
    console.log(this.bitkiCaylari);
    return this.bitkiCaylari.slice();
  }

  fetchBitkiCaylari() {
    return this.storage.get('resimlibitkiCaylari').then((secilenler) => {
      let bitkiCaylariObject = JSON.parse(secilenler);
      this.bitkiCaylari=bitkiCaylariObject;
      return this.bitkiCaylari;
    
      });
  }

  deleteBitkiCayi(index: number) {
    const bitkiCayi = this.bitkiCaylari[index];
    this.bitkiCaylari.splice(index, 1);
    this.storage.set('resimlibitkiCaylari', this.bitkiCaylari)
      .then(
        () => {
          this.removeFile(bitkiCayi);
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  private removeFile(bitkiCayi: BitkiCayi) {
    // for (let index = 0; index < bitkiCayi.resimler.length; index++) {
    //   const resim = bitkiCayi.resimler[index];
    //   const currentName = resim.binary.replace(/^.*[\\\/]/, '');
    //   // File.(cordova.file.dataDirectory, currentName)
    //   //   .then(
    //   //     () => console.log('Removed File')
    //   //   )
    //   //   .catch(
    //   //     () => {
    //   //       console.log('Error while removing File');
    //   //       this.addPlace(place.title, place.description, place.location, place.imageUrl);
    //   //     }
    //   //   );
  
    // }
  
  }
    

}