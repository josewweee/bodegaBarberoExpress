import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaProductosPedidoPage } from './lista-productos-pedido';

@NgModule({
  declarations: [
    ListaProductosPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaProductosPedidoPage),
  ],
})
export class ListaProductosPedidoPageModule {}
