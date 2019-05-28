import { DetallePedidoPage } from './../detalle-pedido/detalle-pedido';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { crudDB } from '../../services/crudDB.service';
import { CallNumber } from '@ionic-native/call-number';
import { throwError } from 'rxjs';


/**
 * Generated class for the PedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
  styles: [`mycolor:{background-color : red}`],
  
  
})
export class PedidosPage {

  @Input() index: number;
  path: string = "/PEDIDOS/"
  pathNacionales: string = "/PEDIDOS_NACIONALES/";
  pedidos: any = [];
  verdes: any = [];
  pedidosNacionales: any = [];
  cantidadPedidos: number;
  totalSantiago: number;
  totalBarbero: number;
  totalDomiciliario1: number;
  totalBarbero1: number;
  totalDomiciliario2: number;
  totalBarbero2: number;
  totalDomiciliario3: number;
  totalBarbero3: number;
  pathDataBarber: string = "/DOMICILIARIOS/USUARIOS/0/TOTAL_DIA/" + "barbero";
  pathPediosListos: string = "/DOMICILIARIOS/PEDIDOS_LISTOS/";
  pathDataDomiciliario:string = "/DOMICILIARIOS/USUARIOS/0/TOTAL_DIA/" + "domiciliario";
  pathDataBarber1: string = "/DOMICILIARIOS/USUARIOS/1/TOTAL_DIA/" + "barbero";
  pathDataDomiciliario1:string = "/DOMICILIARIOS/USUARIOS/1/TOTAL_DIA/" + "domiciliario";
  pathDataBarber2: string = "/DOMICILIARIOS/USUARIOS/2/TOTAL_DIA/" + "barbero";
  pathDataDomiciliario2:string = "/DOMICILIARIOS/USUARIOS/2/TOTAL_DIA/" + "domiciliario";
  pathDataBarber3: string = "/DOMICILIARIOS/USUARIOS/3/TOTAL_DIA/" + "barbero";
  pathDataDomiciliario3:string = "/DOMICILIARIOS/USUARIOS/3/TOTAL_DIA/" + "domiciliario";
  PathEmpresa3:string = "/DOMICILIARIOS/USUARIOS/3/PEDIDOS/";
  PathEmpresa2:string = "/DOMICILIARIOS/USUARIOS/2/PEDIDOS/";
  PathEmpresa1:string = "/DOMICILIARIOS/USUARIOS/1/PEDIDOS/";
  PathEmpresa0:string = "/DOMICILIARIOS/USUARIOS/0/PEDIDOS/";
  pathRecibos: string = "/RECIBOS/";
  pathProductos: string = "/PRODUCTOS/";
  recibos: any = [];
  productos: any = [];
  totalRecibos: number;
  bgcolor:string;
  ListosParaEnviar: any = [];
  cantidadEnviosMensajeros:number;
  cantidadEnviosMensajero3:number;
  cantidadEnviosMensajero2:number;
  cantidadEnviosMensajero1:number;
  cantidadEnviosMensajero0:number;
  ganancia: number;
  costo_domicilio:number;
  mercancia_esperada:number;
  ganancia_esperada:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public crud: crudDB, public alertCtrl: AlertController, private callNumber: CallNumber) {
    //PEDIDOS, RECIBOS Y PRODUCTOS
    this.ganancia = 0;
    this.crud.getList(this.path).valueChanges()
          .subscribe((pedidosDB) => {
            this.pedidos = pedidosDB;
            this.cantidadPedidos = this.pedidos.length;
    });
    this.crud.getList(this.pathNacionales).valueChanges()
          .subscribe((pedidosDB) => {
            this.pedidosNacionales = pedidosDB;            
    });
    this.crud.getList(this.pathProductos).valueChanges()
          .subscribe((productos) => {
            this.productos = productos;
    });
    this.crud.getList(this.pathRecibos).valueChanges()
    .subscribe((data) => {
      this.recibos = data;
      this.totalRecibos = this.recibos.map(this.precio).reduce(this.sum);
});


    //DATOS DOMICILIARIO 0
    this.crud.get(this.pathDataBarber).valueChanges()
          .subscribe((data) => {
            this.totalBarbero = Number(data);
    });
    this.crud.get(this.pathDataDomiciliario).valueChanges()
          .subscribe((data) => {
            this.totalSantiago = Number(data);
    });
    this.crud.getList(this.PathEmpresa0).valueChanges()
    .subscribe((data) => {
      //this.ListosParaEnviar = data;
      this.cantidadEnviosMensajero0 = data.length;
    });


    //DATOS DOMICILIARIO 1
    this.crud.get(this.pathDataBarber1).valueChanges()
          .subscribe((data) => {
            this.totalBarbero1 = Number(data);
    });
    this.crud.get(this.pathDataDomiciliario1).valueChanges()
          .subscribe((data) => {
            this.totalDomiciliario1 = Number(data);
    });
    this.crud.getList(this.PathEmpresa1).valueChanges()
    .subscribe((data) => {
      //this.ListosParaEnviar = data;
      this.cantidadEnviosMensajero1 = data.length;
    });

    //DATOS DOMICILIARIO 2
    this.crud.get(this.pathDataBarber2).valueChanges()
          .subscribe((data) => {
            this.totalBarbero2 = Number(data);
    });
    this.crud.get(this.pathDataDomiciliario2).valueChanges()
          .subscribe((data) => {
            this.totalDomiciliario2 = Number(data);
    });
    this.crud.getList(this.PathEmpresa2).valueChanges()
    .subscribe((data) => {
      //this.ListosParaEnviar = data;
      this.cantidadEnviosMensajero2 = data.length;
    });

    //DATOS DOMICILIARIO 3
    this.crud.get(this.pathDataBarber3).valueChanges()
          .subscribe((data) => {
            this.totalBarbero3 = Number(data);
    });
    this.crud.get(this.pathDataDomiciliario3).valueChanges()
          .subscribe((data) => {
            this.totalDomiciliario3 = Number(data);
    });
    this.crud.getList(this.PathEmpresa3).valueChanges()
    .subscribe((data) => {
      //this.ListosParaEnviar = data;
      this.cantidadEnviosMensajero3 = data.length;
    });

    //TRAEMOS EL VALOR DEL COSTO DEL DOMICILIO
    this.crud.get("/DOMICILIARIOS/COSTO_DOMICILIO").valueChanges()
          .subscribe((data) => {
            this.costo_domicilio = Number(data);
    });

    //TRAEMOS EL ARREGLO DE LOS PEDIDOS LISTOS PARA ENVIAR
    this.crud.getList(this.pathPediosListos).valueChanges()
          .subscribe((data) => {
            this.ListosParaEnviar = data;
            this.cantidadEnviosMensajeros = Number((this.ListosParaEnviar != null)?this.ListosParaEnviar.length:0);
    });

    //DATOS DE CONTABILIDAD
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/ganancia_esperada").valueChanges()
    .subscribe((data) => {
      this.ganancia_esperada = Number(data);
    });
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/mercancia_esperada").valueChanges()
        .subscribe((data) => {
          this.mercancia_esperada = Number(data);
    });
  }

  //FUNCION PARA GENERAR LISTA DE PEDIDOS EN COLOR VERDE
  GenerarLista(){
    var i = 0;
    var texto = "Total pedidos: " +  this.ListosParaEnviar.length  +'\n' +'\n' + "Desde: " +'\n' + "Nombre: cristian franco, poblado, unidad torres de patio bonito" +'\n' + 
    "Teléfono: 305 766 8478" +'\n' + 
    "Dirección: carrera 45#1-191, interior 1512" +'\n' +'\n';
    while(i < this.ListosParaEnviar.length){
        texto += (i+1) +")"+'\n';
        texto += "nombre: "+ this.ListosParaEnviar[i].usuario.nombre+'\n';
        texto += "telefono: "+ this.ListosParaEnviar[i].usuario.telefono+'\n';
        texto += "direccion: "+ this.ListosParaEnviar[i].direccion+'\n';
        texto += "observaciones: "+ this.ListosParaEnviar[i].observaciones+'\n'; 
        texto += "cobrar: $ "+ this.ListosParaEnviar[i].total+'\n';
        texto += '\n';
        i++;
   }
   var texto_alerta = texto.replace(/\n/g,"<br>");
   console.log(texto)
   let alert = this.alertCtrl.create({
      title: "¡Pedidos para hoy!",
      message: texto_alerta,
      buttons: [ 
        {
        text: "copiar",
        handler: () => {
          this.copyText(texto);
        }
      }]
    });
    alert.present();
  }

  //FUNCION PARA PONER COLORES DEPENDIENDO DEL ESTADO DEL PEDIDO
  getBorder(estado){
    var pos1 = estado[0];
    switch (pos1) {
      case 'W':
        return '15px solid green';
      case 'F':
        return '15px solid yellow';
      case 'M':
        return '15px solid red';
      case 'D':
        return '15px solid purple';
      case 'G':
        return '15px solid blue';
      default:
        return '15px solid white';
    }
  }
  //FUNCIONES DE MODIFICAR EL COLOR DEL PEDIDO DEPENDIENDO DEL ESTADO
  okey(pedido){
    let path = "/PEDIDOS/" + pedido.id + "/estado";
    let pathPedido = "/DOMICILIARIOS/PEDIDOS_LISTOS/" + pedido.id;
    if(pedido.estado.slice(0,3) != 'W -'){
      if(pedido.estado.slice(0,3) != 'F -'){
        if(pedido.estado.slice(0,3) != 'M -'){
          if(pedido.estado.slice(0,3) != 'D -'){
            this.crud.edit(path, 'W - ' + pedido.estado);
          }else{
            this.crud.edit(path, 'W - ' + pedido.estado.slice(4));
          }
        }else{
          this.crud.edit(path, 'W - ' + pedido.estado.slice(4));
        }
      }else{
        this.crud.edit(path, 'W - ' + pedido.estado.slice(4));
      }
    }else{
      this.crud.edit(path, 'W - ' + pedido.estado.slice(4));
    }
    this.crud.create(pathPedido, pedido);  
  }

  enProceso(pedido){
    let path = "/PEDIDOS/" + pedido.id + "/estado";
    if(pedido.estado.slice(0,3) != 'F -'){
      if(pedido.estado.slice(0,3) != 'W -'){
        if(pedido.estado.slice(0,3) != 'M -'){
          if(pedido.estado.slice(0,3) != 'D -'){
            this.crud.edit(path, 'F - ' + pedido.estado);
          }else{
            let pathPedido = "/DOMICILIARIOS/PEDIDOS_LISTOS/" + pedido.id;
            try {
              this.crud.delete(pathPedido);
            }catch (error) {
              throw new Error('No hay pedidos');
            }    
            this.crud.edit(path, 'F - ' + pedido.estado.slice(4));
          }
        }else{
          this.crud.edit(path, 'F - ' + pedido.estado.slice(4));
        }
      }else{
        this.crud.edit(path, 'F - ' + pedido.estado.slice(4));
        let pathPedido = "/DOMICILIARIOS/PEDIDOS_LISTOS/" + pedido.id;
        try {
          this.crud.delete(pathPedido);
        }catch (error) {
          throw new Error(error);
        }    
      }
    }else{
      this.crud.edit(path, 'F - ' + pedido.estado.slice(4));
    }
  }

  conProblemas(pedido){
    let path = "/PEDIDOS/" + pedido.id + "/estado";
    if(pedido.estado.slice(0,3) != 'M -'){
      if(pedido.estado.slice(0,3) != 'W -'){
        if(pedido.estado.slice(0,3) != 'F -'){
          if(pedido.estado.slice(0,3) != 'D -'){
            this.crud.edit(path, 'M - ' + pedido.estado);
          }else{
            this.crud.edit(path, 'M - ' + pedido.estado.slice(4));
          }
        }else{
          this.crud.edit(path, 'M - ' + pedido.estado.slice(4));
        }
      }else{
        this.crud.edit(path, 'M - ' + pedido.estado.slice(4));
      }
    }else{
      this.crud.edit(path, 'M - ' + pedido.estado.slice(4));
    }
    let pathPedido = "/DOMICILIARIOS/PEDIDOS_LISTOS/" + pedido.id;
    try {
      this.crud.delete(pathPedido);
    }catch (error) {
      throw new Error('No hay pedidos');
    }    
  }

  despachado(pedido){
    const now = new Date();
    let path = "/PEDIDOS/" + pedido.id + "/estado";
    if(pedido.estado.slice(0,3) != 'D -'){
      if(pedido.estado.slice(0,3) != 'W -'){
        if(pedido.estado.slice(0,3) != 'F -'){
          if(pedido.estado.slice(0,3) != 'M -'){
            this.crud.edit(path, 'D - ' + pedido.estado);
          }else{
            this.crud.edit(path, 'D - ' + pedido.estado.slice(4));
          }
        }else{
          this.crud.edit(path, 'D - ' + pedido.estado.slice(4));
        }
      }else{
        this.crud.edit(path, 'D - ' + pedido.estado.slice(4));
      }
    }else{
      this.crud.edit(path, 'D - ' + pedido.estado.slice(4));
    }
    pedido.fecha =now.getTime();
    let pathTiempoDespachoPedido = "/PEDIDOS/" + pedido.id + "/fecha";
    this.crud.edit(pathTiempoDespachoPedido, pedido.fecha);
    //vemos la ganancia de este pedido
    this.mercancia_esperada += Number(this.dinero_mercancia(pedido));
    this.ganancia_esperada += Number(this.gananciaPedido(pedido));
    this.guardar_ganancias_base_de_datos();
  }

  //FUNCIONES PARA PONER EN MORADO (DESPACHADO) Y ENTREGAR, TODOS LOS PEDIDOS EN LA LISTA DE MENSAJEROS
  despachadosGeneral(){
    this.mercancia_esperada = 0;
    this.ganancia_esperada = 0;
   const now = new Date();
    var i = 0;
    //arreglo de pedidos seleccionados en verde y en la lista de los mensajeros
    while(i < this.ListosParaEnviar.length){
      if(this.ListosParaEnviar[i].estado != undefined){
         try {
          //los ponemos en color morado (estado despachado)
          this.ListosParaEnviar[i].estado = 'D - ' + this.ListosParaEnviar[i].estado.slice(4);
          var path = "/PEDIDOS/" +  this.ListosParaEnviar[i].id + "/estado";
          this.crud.edit(path, this.ListosParaEnviar[i].estado);
          //agregamos la fecha de cuando fue despachado
          this.ListosParaEnviar[i].fecha =now.getTime();
          var pathFecha = "/PEDIDOS/" +  this.ListosParaEnviar[i].id + "/fecha"; 
          this.crud.edit(pathFecha, this.ListosParaEnviar[i].fecha);
  
          //ganancia esperada
          this.mercancia_esperada += Number(this.dinero_mercancia(this.pedidos[i]));
          this.ganancia_esperada += Number(this.gananciaPedido(this.pedidos[i]));
          console.log("mercancia " + this.mercancia_esperada);
          console.log("ganancia " + this.ganancia_esperada);
        } catch (error) {
          throwError(error);
        }
      }
      i++;
    }
    this.guardar_ganancias_base_de_datos();
  }

  gananciaPedido(pedido){
    var costo_domicilio = this.costo_domicilio;
    var ganancias_producto = 0;
    var pago_domicilio_cliente = Number(4500);
    var posicionProducto = 0;
    var total_ganancia_pedido = 0;

    try {
      for(var i = 0; i < pedido.productos.length; i++){
        var idProd = pedido.productos[i].id;
        for(var j = 0; j < this.productos.length; j++){
          var idBodega = this.productos[j].id;
          if(idProd == idBodega){
            posicionProducto = j;
          }
        }
        ganancias_producto = Number(this.productos[posicionProducto].ganancia);
        total_ganancia_pedido += ganancias_producto;
      }
      return(total_ganancia_pedido - (costo_domicilio -pago_domicilio_cliente));
    } catch (error) {
      return 0;
    }
  }

  dinero_mercancia(pedido){
    var costo_mercancia_producto = 0;
    var total_mercancia = 0;
    var posicionProducto = 0;

    try {
      for(var i = 0; i < pedido.productos.length; i++){
        var idProd = pedido.productos[i].id;
        for(var j = 0; j < this.productos.length; j++){
          var idBodega = this.productos[j].id;
          if(idProd == idBodega){
            posicionProducto = j;
          }
        }
        costo_mercancia_producto = Number(this.productos[posicionProducto].costo) * Number(pedido.productos[i].cantidad);
        total_mercancia += costo_mercancia_producto;
      }
      return total_mercancia;
    } catch (error) {
      return 0;
    }
    
  }

  guardar_ganancias_base_de_datos(){
    var pathGanancias = "/TOTAL_DIA/CONTABILIDAD/ganancia_esperada";
    var pathMercancia = "/TOTAL_DIA/CONTABILIDAD/mercancia_esperada";
    this.crud.create(pathGanancias, this.ganancia_esperada);
    this.crud.create(pathMercancia, this.mercancia_esperada);
  }

  entregadosGeneral(){

    let alert = this.alertCtrl.create({
      title: 'Confirmar Entregados',
      message: '¿Estás seguro de borrar estos pedidos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Aceptar',
          handler: () => {            
            var i = 0;
            while(i < this.pedidos.length){
              if(this.pedidos[i].estado.slice(0,3) == "G -"){
                try {
                  //this.generarGanancia(this.pedidos[i]);
                  let pathCrear = "/RECIBOS/" + this.pedidos[i].id;
                  let pathBorrar = "/PEDIDOS/" + this.pedidos[i].id;
                  let pathTotalRecib = "/TOTAL_RECIBOS/";
                  this.pedidos[i].estado = this.pedidos[i].estado + "*>";
                  this.crud.create(pathCrear, this.pedidos[i]);
                  this.crud.delete(pathBorrar);
                  this.crud.create(pathTotalRecib, this.totalRecibos);
              } catch (error) {
                console.log(error);
              }
            }else{

            }
              i++;
            }
            //console.log("Ganancia de hoy = " +  this.ganancia);
          }
        }
      ]
    });
    alert.present();     
  }

  //FUNCIONES PARA CAMBIAR ESTADO DE LOS PEDIDOS NACIONALES (CON OTRO PATH)
   okey_nacionales(pedido){
    let path = "/PEDIDOS_NACIONALES/" + pedido.id + "/estado";
    this.crud.edit(path, 'W - ' + pedido.estado.slice(4));
  }

  enProceso_nacionales(pedido){
    let path = "/PEDIDOS_NACIONALES/" + pedido.id + "/estado";
    this.crud.edit(path, 'F - ' + pedido.estado.slice(4));
  }

  conProblemas_nacionales(pedido){
    let path = "/PEDIDOS_NACIONALES/" + pedido.id + "/estado";
    this.crud.edit(path, 'M - ' + pedido.estado.slice(4));
  } 

  //FUNCIONES PARA EL REDUCE MAP QUE SE HACE EN EL CONTRUCTOR
  precio(item) {
    return parseInt(item.total);
  }

  sum(prev, next) {
    return parseInt(prev) + parseInt(next);
  }

  add(a, b) {
    return a + b;
  }

  //SE EJECUTA SIEMPRE QUE CARGUE LA PAGINA
  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosPage');
  }

  irDetallePedido(pedido){
    this.navCtrl.push(DetallePedidoPage, {pedido: pedido});
  }

  llamar(telefono: string) {
    this.callNumber.callNumber(telefono, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  asignarSantiago(pedido) {    
    let pathPedido = "/DOMICILIARIOS/USUARIOS/" + 0 + "/PEDIDOS/" + pedido.id;    
    this.crud.create(pathPedido, pedido);        
  }

  asignarOtro(pedido) {
    let pathPedido = "/DOMICILIARIOS/USUARIOS/" + 1 + "/PEDIDOS/" + pedido.id;    
    this.crud.create(pathPedido, pedido);        
  }

  asignarTres(pedido) {
    let pathPedido = "/DOMICILIARIOS/USUARIOS/" + 2 + "/PEDIDOS/" + pedido.id;    
    this.crud.create(pathPedido, pedido);        
  }

  asignarAlejandro(pedido) {
    let pathPedido = "/DOMICILIARIOS/USUARIOS/" + 3 + "/PEDIDOS/" + pedido.id;    
    this.crud.create(pathPedido, pedido);        
  }

  entregado(pedido){
    pedido.fecha = Date().toLocaleString();
    let alert = this.alertCtrl.create({
      title: 'Confirmar entrega',
      message: '¿Estás seguro de que este pedido ha sido entregado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            let pathRecibos = "/RECIBOS/" + pedido.id;
            let pathPedidos = "/PEDIDOS/" + pedido.id;
            let pathTotalRecib = "/TOTAL_RECIBOS/";
            pedido.estado = pedido.estado + "*>";
            this.crud.create(pathRecibos, pedido);
            this.crud.delete(pathPedidos);
            this.crud.create(pathTotalRecib, this.totalRecibos);
          }
        }
      ]
    });
    alert.present();
        
  }




  entregadoNacional(pedido){
    pedido.fecha = Date().toLocaleString();
    let alert = this.alertCtrl.create({
      title: 'Confirmar entrega',
      message: '¿Estás seguro de que este pedido ha sido entregado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            let pathCrear = "/RECIBOS/" + pedido.id;
            let pathBorrar = "/PEDIDOS_NACIONALES/" + pedido.id;
            let pathTotalRecib = "/TOTAL_RECIBOS/";
            this.crud.create(pathCrear, pedido);
            this.crud.delete(pathBorrar);
            this.crud.create(pathTotalRecib, this.totalRecibos);
            console.log('Borrado');
          }
        }
      ]
    });
    alert.present();
        
  }

  borrar(pedido){    
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
            let pathBorrar = "/PEDIDOS/" + pedido.id;
            this.crud.delete(pathBorrar);
            let pathTotalRecib = "/TOTAL_RECIBOS/";
            this.crud.create(pathTotalRecib, this.totalRecibos);
            console.log('Borrado');
          }
        }
      ]
    });
    alert.present();  
  }

  borrarNacional(pedido){    
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
            let pathBorrar = "/PEDIDOS_NACIONALES/" + pedido.id;
            this.crud.delete(pathBorrar);
            let pathTotalRecib = "/TOTAL_RECIBOS/";
            this.crud.create(pathTotalRecib, this.totalRecibos);
            console.log('Borrado');
          }
        }
      ]
    });
    alert.present();  
  }

  sumarDosmil1(totalBarbero, totalDomiciliario){
    let alert = this.alertCtrl.create({
      title: 'Confirmar sumar 2.000',
      message: 'Estás seguro de sumar 2.000?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Sumar',
          handler: () => {
            this.totalBarbero1 -= 2000;
            this.totalDomiciliario1 += 2000;
            this.crud.edit(this.pathDataDomiciliario1, this.totalDomiciliario1);
            this.crud.edit(this.pathDataBarber1,this.totalBarbero1);
          }
        }
      ]
    });
    alert.present();      
  }
  sumarDosmil2(totalBarbero, totalDomiciliario){
    let alert = this.alertCtrl.create({
      title: 'Confirmar sumar 2.000',
      message: 'Estás seguro de sumar 2.000?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Sumar',
          handler: () => {
            this.totalBarbero2 -= 2000;
            this.totalDomiciliario2 += 2000;
            this.crud.edit(this.pathDataDomiciliario2, this.totalDomiciliario2);
            this.crud.edit(this.pathDataBarber2,this.totalBarbero2);
          }
        }
      ]
    });
    alert.present(); 
    
  }
  sumarDosmil3(totalBarbero, totalDomiciliario){
    let alert = this.alertCtrl.create({
      title: 'Confirmar sumar 2.000',
      message: 'Estás seguro de sumar 2.000?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Sumar',
          handler: () => {
            this.totalBarbero3 -= 2000;
            this.totalDomiciliario3 += 2000;
            this.crud.edit(this.pathDataDomiciliario3, this.totalDomiciliario3);
            this.crud.edit(this.pathDataBarber3,this.totalBarbero3);
          }
        }
      ]
    });
    alert.present();      
  }

  sumarCuatromilquinientos1(totalBarbero, totalDomiciliario){
    let alert = this.alertCtrl.create({
      title: 'Confirmar sumar 4.500',
      message: 'Estás seguro de sumar 4.500?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Sumar',
          handler: () => {
            this.totalBarbero1 -= 4500;
            this.totalDomiciliario1 += 4500;
            this.crud.edit(this.pathDataDomiciliario1, this.totalDomiciliario1);
            this.crud.edit(this.pathDataBarber1,this.totalBarbero1);
          }
        }
      ]
    });
    alert.present();     
  }
  sumarCuatromilquinientos2(totalBarbero, totalDomiciliario){
    let alert = this.alertCtrl.create({
      title: 'Confirmar sumar 4.500',
      message: 'Estás seguro de sumar 4.500?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Sumar',
          handler: () => {            
            this.totalBarbero2 -= 4500;
            this.totalDomiciliario2 += 4500;
            this.crud.edit(this.pathDataDomiciliario2, this.totalDomiciliario2);
            this.crud.edit(this.pathDataBarber2,this.totalBarbero2);
          }
        }
      ]
    });
    alert.present();     
  }
  sumarCuatromilquinientos3(totalBarbero, totalDomiciliario){
    let alert = this.alertCtrl.create({
      title: 'Confirmar sumar 4.500',
      message: 'Estás seguro de sumar 4.500?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Sumar',
          handler: () => {
            this.totalBarbero3 -= 4500;
            this.totalDomiciliario3 += 4500;
            this.crud.edit(this.pathDataDomiciliario3, this.totalDomiciliario3);
            this.crud.edit(this.pathDataBarber3,this.totalBarbero3);
          }
        }
      ]
    });
    alert.present();     
  }



  limpiarMensajero(num_mensajero){
    let alert = this.alertCtrl.create({
      title: 'Confirmar limpieza del mensajero',
      message: '¿Estás seguro de reiniciar al mensajero?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          }
        },
        {
          text: 'Limpiar',
          handler: () => {
            var pathDom;
            var error = false;
            var pathBarbero;
            var pathPedidos;
            switch (num_mensajero) {
              case 0:
                pathDom = "/DOMICILIARIOS/USUARIOS/0/TOTAL_DIA/" + "domiciliario";
                pathBarbero = "/DOMICILIARIOS/USUARIOS/0/TOTAL_DIA/" + "barbero";
                pathPedidos = "/DOMICILIARIOS/USUARIOS/0/PEDIDOS/";
                break;
              case 1:
                pathDom = "/DOMICILIARIOS/USUARIOS/1/TOTAL_DIA/" + "domiciliario";
                pathBarbero = "/DOMICILIARIOS/USUARIOS/1/TOTAL_DIA/" + "barbero";
                pathPedidos = "/DOMICILIARIOS/USUARIOS/1/PEDIDOS/";
                break;
              case 2:
                pathDom = "/DOMICILIARIOS/USUARIOS/2/TOTAL_DIA/" + "domiciliario";
                pathBarbero = "/DOMICILIARIOS/USUARIOS/2/TOTAL_DIA/" + "barbero";
                pathPedidos = "/DOMICILIARIOS/USUARIOS/2/PEDIDOS/";
                break;
              case 3:
                pathDom = "/DOMICILIARIOS/USUARIOS/3/TOTAL_DIA/" + "domiciliario";
                pathBarbero = "/DOMICILIARIOS/USUARIOS/3/TOTAL_DIA/" + "barbero";
                pathPedidos = "/DOMICILIARIOS/USUARIOS/3/PEDIDOS/";
                break;
            
              default:
                error = true;
                break;
            }
            if(error == false){
              var nuevo_valor_barbero = 0;
              var nuevo_valor_mensajero = 0;
              this.crud.edit(pathDom, nuevo_valor_mensajero);
              this.crud.edit(pathBarbero,nuevo_valor_barbero);

              try {
                this.crud.delete(pathPedidos);
              } catch (error) {
                throw new Error('No hay pedidos');
              }
            }  
          }
        }
      ]
    });
    alert.present();     
  }

  listaFaltantes(){
    var i = 0;
    while(i < this.pedidos.length){
      var path = this.pedidos[i].productos;
      console.log(path);
      i++;
    }
  }

  confirmarNacional(pedido){
    pedido.totalNacional = pedido.total - 4500;
  }

  verProductosFaltantesDeBodega(){
    var text = "Productos faltantes para el dia de hoy: " + '\n';
    var lista_productos_faltantes = [{
      id: "",
      nombre: "",
      cantidad: 0
    }];
    //ARREGLO CON LOS PEDIDOS EN ESTADO AMARILLO
    var pedidos_de_hoy = [];
    for(var g = 0; g < this.pedidos.length;g++){
      var estado_pedido = this.pedidos[g].estado.slice(0,3);
      if(estado_pedido == "F -"){
        pedidos_de_hoy.push(this.pedidos[g]);
      }
    }
    

    for(var i = 0; i < pedidos_de_hoy.length;i++){
      for(var j= 0; j < pedidos_de_hoy[i].productos.length;j++){
        var id_producto_a_evaluar = pedidos_de_hoy[i].productos[j].id;
        for(var k = 0; k < this.productos.length; k++){
          var id_producto_bodega = this.productos[k].id;
          if(id_producto_a_evaluar === id_producto_bodega){
            if(this.productos[k].combo){
              //ESTAMOS EN UN PRODUCTO QUE ES UN COMBO
              var arreglo_id_productos_combo = [];
              var j = 0;
              //HALLAMOS EL ID DE TODOS LOS PRODUCTOS EN EL COMBO
              for(var p = 0; p < this.productos[k].combo.idProductos.length; p++){
                if(this.productos[k].combo.idProductos[p] != ','){
                  if(arreglo_id_productos_combo[j] && arreglo_id_productos_combo[j].length > 0){
                    arreglo_id_productos_combo[j] += this.productos[k].combo.idProductos[p];
                  }else{
                    arreglo_id_productos_combo[j] = this.productos[k].combo.idProductos[p];
                  }
                }else{
                  j++;
                }
              }
              //BUSCAMOS EN TODOS LOS PRODUCTOS DEL COMBO
              for(var h = 0; h < arreglo_id_productos_combo.length; h++){
                id_producto_a_evaluar = arreglo_id_productos_combo[h];
                for(var k = 0; k < this.productos.length; k++){
                    id_producto_bodega = this.productos[k].id;
                    if(id_producto_a_evaluar === id_producto_bodega){
                      var cantidadPromo = 0; //INICIALMENTE EL PRODUCTO NO ES UNA PROMO
                      //SOLO SE ACTIVA ESTE IF, SI ESTAMOS CON UN PRODUCTO CON LA VARIABLE PROMO
                      if(this.productos[k].detallesPromo){
                        cantidadPromo = Number(this.productos[k].detallesPromo.cantidad); //VOLVEMOS EL PRODUCTO UNA PROMO
                      }
                      var cantidad_comprada = Number(1 + cantidadPromo);
                      var cantidad_en_bodega = Number(this.productos[k].disponibles);
                      var resta_de_producto_en_bodega = (cantidad_en_bodega - cantidad_comprada);
                      if(resta_de_producto_en_bodega < 1){
                        var nombre_producto = this.productos[k].nombre;
                        var cantidad_a_comprar = Math.abs(cantidad_en_bodega - cantidad_comprada);
                        if(cantidad_a_comprar == 0){
                          cantidad_a_comprar = 1;
                        }
                        var ya_esta_faltando = false;
                        for(var w = 0; w < lista_productos_faltantes.length && ya_esta_faltando == false; w++){
                          if(id_producto_a_evaluar == lista_productos_faltantes[w].id){
                            ya_esta_faltando = true;
                            lista_productos_faltantes[w].cantidad += cantidad_a_comprar;
                          }
                        }
                        if(ya_esta_faltando == false){
                          var nuevo_producto_faltante = {
                            id: id_producto_a_evaluar,
                            nombre: nombre_producto,
                            cantidad: cantidad_a_comprar
                          };
                          lista_productos_faltantes.push(nuevo_producto_faltante);
                        }
                      }
                    }
                }
              }
              
 
            }else{
              //NO ES UN COMBO EL PRODUCTO QUE TENEMOS, SOLO ACOMULAMOS SU CANTIDAD
              var cantidadPromo = 0; //INICIALMENTE EL PRODUCTO NO ES UNA PROMO
              //SOLO SE ACTIVA ESTE IF, SI ESTAMOS CON UN PRODUCTO CON LA VARIABLE PROMO
              if(this.productos[k].detallesPromo){
                cantidadPromo = Number(this.productos[k].detallesPromo.cantidad); //VOLVEMOS EL PRODUCTO UNA PROMO
              }
              var cantidad_comprada = Number(pedidos_de_hoy[i].productos[j].cantidad + cantidadPromo);
              var cantidad_en_bodega = Number(this.productos[k].disponibles);
              var resta_de_producto_en_bodega = (cantidad_en_bodega - cantidad_comprada);
              if(resta_de_producto_en_bodega < 1){
                var nombre_producto = pedidos_de_hoy[i].productos[j].nombre;
                var cantidad_a_comprar = Math.abs(cantidad_en_bodega - cantidad_comprada);
                if(cantidad_a_comprar == 0){
                  cantidad_a_comprar = 1;
                }
                var ya_esta_faltando = false;
                for(var w = 0; w < lista_productos_faltantes.length && ya_esta_faltando == false; w++){
                  if(id_producto_a_evaluar == lista_productos_faltantes[w].id){
                    ya_esta_faltando = true;
                    lista_productos_faltantes[w].cantidad += cantidad_a_comprar;
                  }
                }
                if(ya_esta_faltando == false){
                  var nuevo_producto_faltante = {
                    id: id_producto_a_evaluar,
                    nombre: nombre_producto,
                    cantidad: cantidad_a_comprar
                  };
                  lista_productos_faltantes.push(nuevo_producto_faltante);
                }
              }
            }
          }
        }
      }
    }

    for(var p = 1; p < lista_productos_faltantes.length; p++){
      text += '\n' + lista_productos_faltantes[p].nombre + " x " + lista_productos_faltantes[p].cantidad;
    }
    var texto_alerta = text.replace(/\n/g,"<br>");
    console.log(text)
    let alert = this.alertCtrl.create({
       title: "¡Pedidos para hoy!",
       message: texto_alerta,
       buttons: [ 
         {
         text: "copiar",
         handler: () => {
           this.copyText(text);
         }
       }]
     });
     alert.present();
  }



  /* To copy any Text */
  copyText(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  limpiar_listos(){
    var pathPedido = "/DOMICILIARIOS/PEDIDOS_LISTOS/";
    try {
      this.crud.delete(pathPedido);
    }catch (error) {
      throw new Error(error);
    }    
  }

}



