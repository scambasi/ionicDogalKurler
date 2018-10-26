import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitkiCaylariListPage } from './bitki-caylari-list';

@NgModule({
  declarations: [
    BitkiCaylariListPage,
  ],
  imports: [
    IonicPageModule.forChild(BitkiCaylariListPage),
  ],
})
export class BitkiCaylariListPageModule {}
