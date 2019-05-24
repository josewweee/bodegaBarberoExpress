import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecibosPage } from './recibos';

@NgModule({
  declarations: [
    RecibosPage,
  ],
  imports: [
    IonicPageModule.forChild(RecibosPage),
  ],
})
export class RecibosPageModule {}
