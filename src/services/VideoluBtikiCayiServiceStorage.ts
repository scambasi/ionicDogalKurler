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
    console.log("videolubitkicayi"+bitkiCayi.adi+bitkiCayi.aciklama);
    this.storage.set('videolubitkiCaylari', this.bitkiCaylari)
      .then()
      .catch(
        err => {
          this.bitkiCaylari.splice(this.bitkiCaylari.indexOf(bitkiCayi), 1);
        }
      );
  }

  loadBitkiCaylari() {
    return this.bitkiCaylari.slice();
  }

  fetchBitkiCaylari() {
    return this.storage.get('videolubitkiCaylari')
      .then(
        (bitkiCaylari: BitkiCayi[]) => {
          this.bitkiCaylari = bitkiCaylari != null ? bitkiCaylari : [];
          return this.bitkiCaylari;
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  deleteBitkiCayi(index: number) {
    const bitkiCayi = this.bitkiCaylari[index];
    this.bitkiCaylari.splice(index, 1);
    this.storage.set('videolubitkiCaylari', this.bitkiCaylari)
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