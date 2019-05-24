import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { crudDB } from '../../services/crudDB.service';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  query: string;
  productos: any = [];
  pathProductos: string = "/PRODUCTOS/";
  catego: string;
  tipos: any = [];
  items: any = [];
  listaMod: any = [];
  idMod: any;
  modTIme: any;
  totalMod:any;
  constructor(public navCtrl: NavController, public crud: crudDB, public alertCtrl: AlertController, public navParams: NavParams, private toastCtrl: ToastController) {
    try {
      this.listaMod = this.navParams.get("lista");
      this.idMod = this.navParams.get("id");
      this.totalMod = this.navParams.get("total");
      if(this.listaMod == undefined){
        this.listaMod = [];
      }
      if(this.totalMod != undefined && this.totalMod > 0){
        let pathTotalPedido = "/PEDIDOS/" + this.idMod+ "/total";
        this.crud.get(pathTotalPedido).valueChanges()
          .subscribe((totalDB) => {
            this.totalMod = Number(totalDB);
          });
      }else{

      }
      if(this.idMod == undefined){
        this.idMod = null;
      }
    } catch (error) {
      this.listaMod = null;
      this.idMod = null;
      this.totalMod = null;
    }
   
    this.crud.getList(this.pathProductos).valueChanges()
          .subscribe((productosDB) => {
            this.productos = productosDB;
            this.items = this.productos.slice(0,20);
    });
    let pathTipos = "/TIPOS/";
    this.crud.getList(pathTipos).valueChanges()
      .subscribe((tiposDB) => {
        this.tipos = tiposDB;
      });
  }

  irAVistaDeDetalleProducto(producto){
    this.navCtrl.push(DetalleProductoPage, {producto: producto})
  }

  crearProducto(){
    let producto = {
      nombre: "",
      marca: "",
      precio: "",
      tipo: "",
      recomendado: "",
      descripcion: "",
      foto: "",
      gif: "",
      id: Date.now(),
      numCompras: ""      
    }
    this.navCtrl.push(DetalleProductoPage, {producto: producto});
  }

  getBorder(){
    switch (this.idMod) {
      case null:
        this.modTIme = false;
        return '15px solid white';
      default:
        this.modTIme = true;
        return '25px solid red';
    }
  }

  agregar_borrar(producto){
    if(this.modTIme == true){
      var productoFinal = {
        nombre: producto.nombre,
        marca: producto.marca,
        precio: producto.precio,
        tipo: producto.tipo,
        foto: producto.foto,
        id: producto.id,        
        cantidad: 1,
        subtotal: producto.precio
      }
      let pathLista = "/PEDIDOS/" + this.idMod + "/productos";
      this.listaMod.push(productoFinal);
      this.crud.edit(pathLista, this.listaMod);

      let pathTotal = "/PEDIDOS/" + this.idMod + "/total";
      this.totalMod = Number(this.totalMod) + Number(producto.precio);
      this.crud.edit(pathTotal, this.totalMod);

      let toast = this.toastCtrl.create({
        message: `${productoFinal.cantidad} ` + `${productoFinal.nombre} ` + `agregados al carrito correctamente`,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }else{
      let alert = this.alertCtrl.create({
        title: 'Confirmar Borrar',
        message: '¿Estás seguro de borrar este producto?',
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
              let path = "PRODUCTOS/" + producto.id;
              this.crud.delete(path);
              console.log('Borrado');
            }
          },
        ]
      });
      alert.present();
    }
    
  }

  cambioLista(evento){
    if(evento.length > 0){
      this.items = this.productos;
    }else{
      this.items = this.productos.slice(0,20);
    }
  }

  cambioTipo(evento){
    if(evento != "TODOS LOS PRODUCTOS"){
      this.items = this.productos;
    }else{
      this.items = this.productos.slice(0,20);
    }
  }
  loadData(infiniteScroll) {
    var k = this.items.length;
    setTimeout(() => {
      this.items = this.items.concat(this.productos.slice(k, k+10));
      infiniteScroll.complete();
    }, 100);
  }


  borrar(producto){    
    let alert = this.alertCtrl.create({
      title: 'Confirmar Borrar',
      message: '¿Estás seguro de borrar este producto?',
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
            let path = "PRODUCTOS/" + producto.id;
            this.crud.delete(path);
            console.log('Borrado');
          }
        },
      ]
    });
    alert.present();
  
  
  
}
}
