import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { crudDB } from '../../services/crudDB.service';
import { PedidosPage } from '../pedidos/pedidos';

/**
 * Generated class for the ListaProductosPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-productos-pedido',
  templateUrl: 'lista-productos-pedido.html',
})
export class ListaProductosPedidoPage {
  lista: any = [];
  id: any;
  pedido:any;
  total: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public crud: crudDB, private toastCtrl: ToastController) {
    this.lista = this.navParams.get("lista");
    this.id = this.navParams.get("id");
    this.pedido = this.navParams.get("pedido");

    let pathTotalPedido = "/PEDIDOS/" + this.pedido.id + "/total";
    this.crud.get(pathTotalPedido).valueChanges()
      .subscribe((total) => {
        this.total = Number(total);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaProductosPedidoPage');
  }

  borrarProducto(producto){
    var productoEncontrado = false;
    var indexProducto = 0;
    for (var i = 0; i < this.lista.length && productoEncontrado == false; i++){
      if(this.lista[i].id == producto.id){
        indexProducto = i;
        productoEncontrado = true;
      }
    }

    let pathListaPedidos = "/PEDIDOS/" + this.pedido.id + "/productos/"; 
    this.lista.splice(indexProducto,1);
    this.crud.edit(pathListaPedidos, this.lista);
    let pathTotal = "/PEDIDOS/" + this.pedido.id + "/total";
    this.total = Number(this.total) - (Number(producto.precio) * Number(producto.cantidad));
    this.pedido.total = Number(this.pedido.total) - (Number(producto.precio) * Number(producto.cantidad));
    this.crud.edit(pathTotal, this.total);

    let toast = this.toastCtrl.create({
      message: `Producto Borrado Exitosamente`,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  agregarProductos(){
    this.navCtrl.push(HomePage, {lista: this.pedido.productos, id: this.pedido.id, total:this.pedido.total})
  }

  sumarUno(producto){
   var productoEncontrado = false;
    var indexProducto = 0;
    for (var i = 0; i < this.lista.length && productoEncontrado == false; i++){
      if(this.lista[i].id == producto.id){
        indexProducto = i;
        productoEncontrado = true;
      }
    }
    
    let pathPedido = "/PEDIDOS/" + this.pedido.id + "/productos/" + indexProducto + "/cantidad";
    producto.cantidad = producto.cantidad + 1;
    this.crud.edit(pathPedido, producto.cantidad);

    let pathTotal = "/PEDIDOS/" + this.pedido.id + "/total";
    console.log("viejo total = " +  this.total);
    this.total = Number(this.total) + Number(producto.precio);
    this.pedido.total =  Number(this.pedido.total) + Number(producto.precio);
    this.crud.edit(pathTotal, this.total);
  }
  restarUno(producto){
    if(producto.cantidad > 1){
      var productoEncontrado = false;
    var indexProducto = 0;
    for (var i = 0; i < this.lista.length && productoEncontrado == false; i++){
      if(this.lista[i].id == producto.id){
        indexProducto = i;
        productoEncontrado = true;
      }
    }
    let pathPedido = "/PEDIDOS/" + this.pedido.id + "/productos/" + indexProducto + "/cantidad";
    producto.cantidad = producto.cantidad - 1;
    this.crud.edit(pathPedido, producto.cantidad);

    let pathTotal = "/PEDIDOS/" + this.pedido.id + "/total";
    this.total = Number(this.total) - Number(producto.precio);
    this.pedido.total =  Number(this.pedido.total) - Number(producto.precio);
    this.crud.edit(pathTotal, this.total);
    }else{
      this.borrarProducto(producto);
    }
    
  }

}
