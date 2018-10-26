import { Injectable } from "@angular/core";
import { Icindekiler } from "../modals/icindekiler";
import Parse from 'parse';
import { BitkiCaylari } from "../modals/bitkicaylari";

@Injectable()
export class BitkiCaylariService
{
    bitkiCaylariList:BitkiCaylari[]=[];
    bitkiCaylari:BitkiCaylari;
    ekleBitkiCayi(adi:string,yapilisi:string,miktari:string,suresi:string,faydasi:string, icindekiler:Icindekiler[])
    {
        console.log('BitkiCaylariService:ekleBitkiCayi');
        console.log('icindekiler'+icindekiler);
        const BitkiCaylari = Parse.Object.extend('BitkiCaylari');
        let bitkiCayi = new BitkiCaylari();
        bitkiCayi.set('adi',adi);
        bitkiCayi.set('yapilisi',yapilisi);
        bitkiCayi.set('miktari',miktari);
        bitkiCayi.set('suresi',suresi);
        bitkiCayi.set('faydasi',faydasi);
        bitkiCayi.set('icindekiler',icindekiler);
        bitkiCayi.save(null, {
        success: function (f) {
            console.log('kaydetme başarılı');
            return true;         
        },
        error: function (error) {
            console.log(error);
            return false;
        }
        });
    }
    public getBitkiCaylari()
    {
        console.log('BitkiCaylariService:getBitkiCaylari');
        this.bitkiCaylariList=[];
        Parse.serverURL = 'https://parseapi.back4app.com/';
        Parse.initialize("1PDfxOZaIcldS56Ue0tagvjq98GGyaRK7ptOtbZN", "4sRePMpTCmRs2cxOPf1WsOeIyHUVsXBzF7RdnQNu");
     
        const BitkiCaylarim= Parse.Object.extend('BitkiCaylari');
        let query = new Parse.Query(BitkiCaylarim);
        query.find().then((sonuc) => {
            for (var i = 0; i < sonuc.length; i++) {
                        var object = sonuc[i];
                       this.bitkiCaylariList.push(new BitkiCaylari(object.id, object.get('adi'),
                       object.get('yapilisi'),object.get('miktari'),object.get('suresi'),
                       object.get('faydasi'),object.get('icindekiler')));
                       }
              
          }, (error) => {
              return error;
          });
        return this.bitkiCaylariList;
    }
    updateBitkiCayi(id:string,adi:string,yapilisi:string,
        suresi:string,miktari:string,faydasi:string,icindekiler:Icindekiler[])
    {
        console.log('BitkiCaylariService:updateBitkiCayi');
        const BitkiCaylari= Parse.Object.extend('BitkiCaylari');
         let query = new Parse.Query(BitkiCaylari);
        query.get(id).then(
            function(obj) {
                let bitkiCayi =obj;
                bitkiCayi.set('adi',adi);
                bitkiCayi.set('yapilisi',yapilisi);
                bitkiCayi.set('miktari',miktari);
                bitkiCayi.set('suresi',suresi);
                bitkiCayi.set('faydasi',faydasi);
                bitkiCayi.set('icindekiler',icindekiler);
                bitkiCayi.save().then(
                    function(obj){
                        console.log("updated SAVE"+obj.get('adi')); 
                        return true;         
                    },
                    function(error){
                        console.log(error);
                    }

                );
            },
            function(error)
            {
                console.log("*****"+error);
            }
        );
    
            
    }
          
          
    deleteBitkiCayi(id:number)
    {
        console.log('BitkiCaylariService:deleteBitkiCayi');
        const BitkiCaylari= Parse.Object.extend('BitkiCaylari');
        let query = new Parse.Query(BitkiCaylari);
        query.get(id).then(
           function(obj) {
               let bitkiCayi =obj;
               bitkiCayi.destroy().then(
                   function(obj){
                       console.log("DELETED SAVE"+obj.get('adi')); 
                       return true;
                   },
                   function(error){
                       console.log(error);
                   }

               );
           },
           function(error)
           {
               console.log("*****"+error);
           }
       );
    }
}