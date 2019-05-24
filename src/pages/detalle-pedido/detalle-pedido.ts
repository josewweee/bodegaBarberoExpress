import { ListaProductosPedidoPage } from './../lista-productos-pedido/lista-productos-pedido';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { crudDB } from '../../services/crudDB.service';

/**
 * Generated class for the DetallePedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-pedido',
  templateUrl: 'detalle-pedido.html',
})
export class DetallePedidoPage {
  pedido: any;
  estadoActual: string;
  direccion: string;
  municipio: string;
  telefono: string;
  total: number;
  departamento: string;
  observaciones: string;
  //datos locales
  estadoActual_local: string;
  direccion_local: string;
  municipio_local: string;
  telefono_local: string;
  total_local: number;
  departamento_local: string;
  is_nacional: boolean;
  pedido_id: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public crud: crudDB, public alertCtrl: AlertController) {
    this.pedido = this.navParams.get("pedido");
    this.pedido_id = this.pedido.id;
    this.estadoActual = this.pedido.estado;
    this.total = this.pedido.total;
    this.direccion = this.pedido.direccion;
    this.municipio = this.pedido.municipio;
    this.departamento = this.pedido.departamento;
    this.telefono = this.pedido.usuario.telefono;
    this.observaciones = this.pedido.observaciones;
    console.log("total = " +  this.total);

    var path_pedido = "/PEDIDOS_NACIONALES/" + this.pedido_id;
    this.crud.getList(path_pedido).valueChanges()
          .subscribe((data) => {
            if(data.length > 1){
              this.is_nacional = true;
            }else{
              this.is_nacional = false;
            }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePedidoPage');
  }

  entregado(){
    let alert = this.alertCtrl.create({
      title: 'Confirmar Borrar',
      message: 'Estás seguro de borrar este pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Borrar',
          handler: () => {
            let pathCrear = "/RECIBOS/" + this.pedido.id;
            let pathBorrar = "/PEDIDOS/" + this.pedido.id;
            this.crud.create(pathCrear, this.pedido);
            this.crud.delete(pathBorrar);
            console.log('Borrado');
          }
        }
      ]
    });
    alert.present();
        
  }

 

  editar(num){
      if(num == 1){
      //editar total
      let pathTotal = "/PEDIDOS/" + this.pedido.id + "/total";
      this.crud.edit(pathTotal, this.total);
      //editar direccion
      let pathDireccion = "/PEDIDOS/" + this.pedido.id + "/direccion";
      this.crud.edit(pathDireccion, this.direccion);
        //editar telefono
      let pathTelefono = "/PEDIDOS/" + this.pedido.id + "/usuario/telefono";
      this.crud.edit(pathTelefono, this.telefono);
      //editar total
      let pathMunicipio = "/PEDIDOS/" + this.pedido.id + "/municipio";
      this.crud.edit(pathMunicipio, this.municipio);
      //editar estado
      let path = "/PEDIDOS/" + this.pedido.id + "/estado";
      this.crud.edit(path, this.estadoActual);
      //editar observaciones
      let pathObsrvaciones = "/PEDIDOS/" + this.pedido.id + "/observaciones";
      this.crud.edit(pathObsrvaciones, this.observaciones);
    //Pedidos nacionales
    }else{
      //editar total
      let pathTotal = "/PEDIDOS_NACIONALES/" + this.pedido.id + "/total";
      this.crud.edit(pathTotal, this.total);
      //editar direccion
      let pathDireccion = "/PEDIDOS_NACIONALES/" + this.pedido.id + "/direccion";
      this.crud.edit(pathDireccion, this.direccion);
        //editar telefono
      let pathTelefono = "/PEDIDOS_NACIONALES/" + this.pedido.id + "/usuario/telefono";
      this.crud.edit(pathTelefono, this.telefono);
      //editar total
      let pathMunicipio = "/PEDIDOS_NACIONALES/" + this.pedido.id + "/municipio";
      this.crud.edit(pathMunicipio, this.municipio);
      //editar estado
      let path = "/PEDIDOS_NACIONALES/" + this.pedido.id + "/estado";
      this.crud.edit(path, this.estadoActual); 
        console.log("nacional");
    } 
  }

  volverNacional(){
    let pathCrear = "/PEDIDOS_NACIONALES/" + this.pedido.id;
    let pathBorrar = "/PEDIDOS/" + this.pedido.id;
    this.crud.create(pathCrear, this.pedido);
    this.crud.delete(pathBorrar);
  }

  borrar(){    
      let alert = this.alertCtrl.create({
        title: 'Confirmar Borrar',
        message: 'Estás seguro de borrar este pedido?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log("Cancelado");
            }
          },
          {
            text: 'Borrar',
            handler: () => {
              let pathBorrar = "/PEDIDOS/" + this.pedido.id;
              this.crud.delete(pathBorrar);
              console.log('Borrado');
            }
          }
        ]
      });
      alert.present();
    
    
    
  }
  
  editarPedido(){
    console.log("id = " + this.pedido.id);
    this.navCtrl.push(HomePage, {lista: this.pedido.productos, id: this.pedido.id, pedido:this.pedido})
  }

  verLista(){
    console.log(this.pedido.productos);
    this.navCtrl.push(ListaProductosPedidoPage, {lista: this.pedido.productos, id: this.pedido.id, pedido:this.pedido})
  }
}
