import { Icindekiler } from "./icindekiler";

export class BitkiCaylari
{
    constructor(public id:string,public adi:string,public yapilisi:string,
        public suresi:string,public miktari:string,public faydasi:string,
        public icindekiler:Icindekiler[])
    {

    }
    
}