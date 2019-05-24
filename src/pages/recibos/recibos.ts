import { DetallePedidoPage } from './../detalle-pedido/detalle-pedido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { crudDB } from '../../services/crudDB.service';

/**
 * Generated class for the RecibosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recibos',
  templateUrl: 'recibos.html',
})
export class RecibosPage {
  path: string = "/RECIBOS/";
  recibos: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public crud: crudDB) {
    this.crud.getList(this.path).valueChanges()
      .subscribe((recibosDB) => {
        this.recibos = recibosDB;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecibosPage');
  }

  irDetalleRecibo(recibo){
    this.navCtrl.push(DetallePedidoPage, {pedido: recibo})
  }

}
