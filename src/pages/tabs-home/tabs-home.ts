import { UsersPage } from './../users/users';
import { HomePage } from './../home/home';
import { ContabilidadPage } from './../contabilidad/contabilidad';
import { PedidosPage } from './../pedidos/pedidos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecibosPage } from '../recibos/recibos';

/**
 * Generated class for the TabsHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-home',
  templateUrl: 'tabs-home.html',
})
export class TabsHomePage {
  tabListaGeneralProductos = HomePage;
  tabPedidos = PedidosPage;
  tabRecibos = RecibosPage;
  tabContabilidad = ContabilidadPage;
  tabUsers = UsersPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsHomePage');
  }

}
