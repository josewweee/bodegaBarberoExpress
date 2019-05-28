import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { crudDB } from '../../services/crudDB.service';

/**
 * Generated class for the ContabilidadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contabilidad',
  templateUrl: 'contabilidad.html',
})
export class ContabilidadPage {

  //VARIABLES DEL HTML
  mano_de_obra:number;
  costos_adicionales:number;
  ganancia_neta:number;
  dinero_bodega:number;
  mercancia:number
  efectivo:boolean;
  cuenta:boolean;
  efectivo_e:boolean;
  cuenta_e:boolean;

  //VARIABLES GLOBALES
  pedidos: any = [];
  productos: any = [];
  ListosParaEnviar: any = [];

  //VARIABLES CONTABILIDAD
  valor_deuda: number;
  costo_domicilio: number;
  fecha: any;
  deuda_total: number;
  deudor0: number; //deudas hermano ramon
  deudor1: number; //deudas cristian
  deudor2: number; //ramon
  deudor3: number; //deudas jose
  ingresos_netos:number;
  egresos:number;
  utilidades: number;
  balance: number;
  activos: number;
  dineroEfectivo:number;
  dineroCuenta:number;

  cantidadEnviosMensajeros:number;
  ganancia: number;
  ganancia_esperada:number;
  mercancia_esperada:number;

  //PATHS PARA LA BASE DE DATOS
  path_pedidos: string = "/PEDIDOS/"
  pathProductos: string = "/PRODUCTOS/";

  //PATHS DE LA RAMA "DOMICILIARIOS"
  totalDomiciliario0: number;
  totalBarbero: number;
  totalDomiciliario1: number;
  totalBarbero1: number;
  totalDomiciliario2: number;
  totalBarbero2: number;
  totalDomiciliario3: number;
  totalBarbero3: number;
  pathDataBarber: string = "/DOMICILIARIOS/USUARIOS/0/TOTAL_DIA/" + "barbero";
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
  pathPediosListos: string = "/DOMICILIARIOS/PEDIDOS_LISTOS/";
  pathDeudas: string = "/TOTAL_DIA/CONTABILIDAD/total_deuda";


  constructor(public navCtrl: NavController, public navParams: NavParams, public crud: crudDB, public alertCtrl: AlertController) {
    //VARIABLES GLBALES
    //this.ganancia = 0;
    this.mano_de_obra = 1200000;
    this.costos_adicionales = 0;
    this.costo_domicilio = 7000;
    this.mercancia = 0;
    this.valor_deuda = 0;
    this.fecha = new Date().toDateString().replace(/\s/g,'_');

    //DATOS DE LAS DEUDAS Y CONTABILIDAD DE LA DB
    this.crud.get("/TOTAL_DIA/" + this.fecha + "/ganancias").valueChanges()
          .subscribe((data) => {
            this.ganancia = Number(data);
    });
    this.crud.get("/TOTAL_DIA/" + this.fecha + "/mercancia").valueChanges()
          .subscribe((data) => {
            this.mercancia = Number(data);
    });

    this.crud.get("/TOTAL_DIA/CONTABILIDAD/efectivo").valueChanges()
    .subscribe((data) => {
      this.dineroEfectivo = Number(data);
    });
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/cuenta_ahorros").valueChanges()
    .subscribe((data) => {
      this.dineroCuenta = Number(data);
    });

    this.crud.get("/TOTAL_DIA/CONTABILIDAD/ingresos_netos").valueChanges()
          .subscribe((data) => {
            this.ingresos_netos = Number(data);
    });
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/egresos").valueChanges()
          .subscribe((data) => {
            this.egresos = Number(data);
    });
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/utilidades").valueChanges()
          .subscribe((data) => {
            this.utilidades = Number(data);
    });
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/total_deuda").valueChanges()
          .subscribe((data) => {
            this.deuda_total = Number(data);
    });
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_0").valueChanges()
    .subscribe((data) => {
      this.deudor0 = Number(data);
      console.log(this.deudor0);
    });
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_1").valueChanges()
    .subscribe((data) => {
      this.deudor1 = Number(data);
    });
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_2").valueChanges()
    .subscribe((data) => {
      this.deudor2 = Number(data);
    });
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_3").valueChanges()
    .subscribe((data) => {
      this.deudor3 = Number(data);
    });
    
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/ganancia_esperada").valueChanges()
          .subscribe((data) => {
            this.ganancia_esperada = Number(data);
    });
    this.crud.get("/TOTAL_DIA/CONTABILIDAD/mercancia_esperada").valueChanges()
          .subscribe((data) => {
            this.mercancia_esperada = Number(data);
    });
    // DATOS DE LOS PEDIDOS DE LA DB
    this.crud.getList(this.path_pedidos).valueChanges()
          .subscribe((pedidosDB) => {
            this.pedidos = pedidosDB;
    });

    this.crud.getList(this.pathPediosListos).valueChanges()
    .subscribe((data) => {
      this.ListosParaEnviar = data;
      this.cantidadEnviosMensajeros = Number((this.ListosParaEnviar != null)?this.ListosParaEnviar.length:0);
    });

    //DATOS DE LOS PRODUCTOS DE LA DB
    this.crud.getList(this.pathProductos).valueChanges()
    .subscribe((productos) => {
      this.productos = productos;
    });

    //DATOS DOMICILIARIO 0
    this.crud.get(this.pathDataBarber).valueChanges()
          .subscribe((data) => {
            this.totalBarbero = Number(data);
    });
    this.crud.get(this.pathDataDomiciliario).valueChanges()
          .subscribe((data) => {
            this.totalDomiciliario0 = Number(data);
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

    //DATOS DOMICILIARIO 2
    this.crud.get(this.pathDataBarber2).valueChanges()
          .subscribe((data) => {
            this.totalBarbero2 = Number(data);
    });
    this.crud.get(this.pathDataDomiciliario2).valueChanges()
          .subscribe((data) => {
            this.totalDomiciliario2 = Number(data);
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
  }

  sacarGanancias(){

    let alert = this.alertCtrl.create({
      title: 'Ver ganancias del dia',
      message: '¿PREPARADO PAL SALSEO?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado, que pussy");
          }
        },
        {
          text: 'DAMELO TODO',
          handler: () => {
            var i = 0;
            this.ganancia = 0;
            this.ganancia_esperada = 0;
            /* var contador_pedidos = 0; */
            while(i < this.pedidos.length){
              if(this.pedidos[i].estado.slice(0,3) == "G -"){
                try {
                /*   contador_pedidos++; */
                 /*  this.ganancia += Number(this.gananciaPedido(this.pedidos[i]));
                  this.mercancia += Number(this.dinero_mercancia(this.pedidos[i])); */
                 /*  console.log("GANANCIAS ACOMULADAS " + " = " + this.ganancia + " # " + contador_pedidos);
                  console.log("MERCANCIA ACOMULADA " + " = " + this.mercancia + " # " + contador_pedidos);
                  console.log("___________________________"); */
                } catch (error) {
                  console.log(error);
                }
              }
              if(this.pedidos[i].estado.slice(0,3) == "D -" || this.pedidos[i].estado.slice(0,3) == "G -"){
               /*  this.mercancia_esperada += Number(this.dinero_mercancia(this.pedidos[i]));
                this.ganancia_esperada += this.gananciaPedido(this.pedidos[i]); */
              }
              i++;
            }
           /* this.ganancia -= Number(this.mano_de_obra/30);
           this.ganancia -= Number(this.costos_adicionales);
           this.ganancia_esperada -= Number(this.mano_de_obra/30);
           this.ganancia_esperada -= Number(this.costos_adicionales);
           console.log(this.ganancia);
           this.guardar_ganancias_base_de_datos(); */
          }
        }
      ]
    });
    alert.present();     
  }
  


  //FUNCION PARA HALLAR LAS GANANCIAS DE UN PEDIDO
  gananciaPedido(pedido){
    var costo_domicilio = this.costo_domicilio;
    var ganancias_producto = 0;
    var pago_domicilio_cliente = Number(4500);
    var posicionProducto = 0;
    var total_ganancia_pedido = 0;
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
    //this.ganancia += total_ganancia_pedido - (costo_domicilio -pago_domicilio_cliente);
    console.log("Pedido de: " + pedido.usuario.nombre + " Ganancia " + (total_ganancia_pedido - (costo_domicilio -pago_domicilio_cliente)));
    return(total_ganancia_pedido - (costo_domicilio -pago_domicilio_cliente));
    
  }


  Dinero_en_bodega(){
    this.dinero_bodega = 0;
    for(var i = 0; i< this.productos.length;i++){
      var producto = this.productos[i];
      if(producto.disponibles > 0){
        this.dinero_bodega += (Number(producto.costo) * Number(producto.disponibles));
      }
      /* console.log("dinero en " + producto.nombre + " de = " + (Number(producto.costo) * Number(producto.disponibles))); */
    }
    console.log("dinero en bodega" + this.dinero_bodega);
  }

  guardar_ganancias_base_de_datos(){
    var pathGanancias = "/TOTAL_DIA/" + this.fecha + "/ganancias";
    var pathMercancia = "/TOTAL_DIA/" + this.fecha + "/mercancia";
    console.log("path = " +  pathGanancias);
    this.crud.create(pathGanancias, this.ganancia);
    this.crud.create(pathMercancia, this.mercancia);
  }

  dinero_mercancia(pedido){
    var costo_mercancia_producto = 0;
    var total_mercancia = 0;
    var posicionProducto = 0;
    for(var i = 0; i < pedido.productos.length; i++){
      var idProd = pedido.productos[i].id;
      for(var j = 0; j < this.productos.length; j++){
        var idBodega = this.productos[j].id;
        if(idProd == idBodega){
          posicionProducto = j;
        }
      }
      costo_mercancia_producto = Number(this.productos[posicionProducto].costo);
      total_mercancia += costo_mercancia_producto;
    }
    return total_mercancia;
  }

  modEgresos(valorIngresado0, tipoEgreso){
    var valorIngresado = Number(valorIngresado0);
    var path;
    var pathTipoCuenta;

    if(this.efectivo_e && !this.cuenta_e){
      pathTipoCuenta = "/TOTAL_DIA/CONTABILIDAD/efectivo";
      this.dineroEfectivo -= valorIngresado;
      this.crud.edit(pathTipoCuenta, this.dineroEfectivo);
    }else if(this.cuenta_e && !this.efectivo_e){
      pathTipoCuenta = "/TOTAL_DIA/CONTABILIDAD/cuenta_ahorros";
      this.dineroCuenta -= valorIngresado;
      this.crud.edit(pathTipoCuenta, this.dineroCuenta);
    }else{
      alert("Seleccion si es efectivo o cuenta de ahorros");
      return;
    }

    switch (tipoEgreso) {
      case "deudasHermanoRamon":
        path = "/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_0";
        this.deudor0 = this.deudor0 - valorIngresado;
        this.crud.edit(path,this.deudor0);
        break;
      case "deudasCristian":
        path = "/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_1";
        this.deudor1 = this.deudor1 - valorIngresado;
        this.crud.edit(path,this.deudor1);
        break;
      case "deudasRamon":
        path = "/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_2";
        this.deudor2 = this.deudor2 - valorIngresado;
        console.log(this.deudor2);
        this.crud.edit(path,this.deudor2);
        break;
      case "deudasJose":
        path = "/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_3";
        this.deudor3 = this.deudor3 - valorIngresado;
        this.crud.edit(path,this.deudor3);
        break;
      case "otros":
        path = "/TOTAL_DIA/CONTABILIDAD/egresos"
        this.egresos += (Number(valorIngresado));
        this.crud.edit(path, this.egresos);
        break;
      case "publicidad":
        path = "/TOTAL_DIA/CONTABILIDAD/egresos"
        this.egresos += (Number(valorIngresado));
        this.crud.edit(path, this.egresos);
        break;
      case "manoObra":
        path = "/TOTAL_DIA/CONTABILIDAD/egresos"
        this.egresos += (Number(valorIngresado));
        this.crud.edit(path, this.egresos);
        break;
      default: //GASTOS EN (OTROS, PUBLICIDAD O MANO DE OBRA)
        alert("Seleccion una categoria para el egreso");
        break;
    }
    this.utilidades -= valorIngresado;
    this.crud.edit("/TOTAL_DIA/CONTABILIDAD/utilidades", this.utilidades);
  }

  agregarDeudas(valorIngresado0,valorIngresado1,valorIngresado2,valorIngresado3){
    var path;
    
    //HERMANO RAMON
    if(valorIngresado0 != undefined && valorIngresado0.length > 2){
      path = "/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_0"
      this.deudor0 += Number(valorIngresado0);
      this.crud.edit(path, this.deudor0);
    }else{
      
    }

    //CRISTIAN
    if(valorIngresado1 != undefined && valorIngresado1.length > 2){
      path = "/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_1"
      this.deudor1 += Number(valorIngresado1);
      this.crud.edit(path, this.deudor1);
    }else{
      
    }

    //RAMON
    if(valorIngresado2 != undefined && valorIngresado2.length > 2){
      path = "/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_2"
      this.deudor2 += Number(valorIngresado2);
      this.crud.edit(path, this.deudor2);
    }else{
      
    }

    //JOSE
    if(valorIngresado3 != undefined && valorIngresado3.length > 2){
      path = "/TOTAL_DIA/CONTABILIDAD/DEUDAS/provedor_3"
      this.deudor3 += Number(valorIngresado3);
      this.crud.edit(path, this.deudor3);
    }else{
      
    }
  }

  agregarIngreso(valorIngresado0){
    var valorIngresado = Number(valorIngresado0);
    var path = "/TOTAL_DIA/CONTABILIDAD/ingresos_netos";
    var pathTipoCuenta;

    if(this.efectivo && !this.cuenta){
      pathTipoCuenta = "/TOTAL_DIA/CONTABILIDAD/efectivo";
      this.dineroEfectivo += valorIngresado;
      this.crud.edit(pathTipoCuenta, this.dineroEfectivo);
    }else if(this.cuenta && !this.efectivo){
      pathTipoCuenta = "/TOTAL_DIA/CONTABILIDAD/cuenta_ahorros";
      this.dineroCuenta += valorIngresado;
      this.crud.edit(pathTipoCuenta, this.dineroCuenta);
    }else{
      alert("Seleccion si es efectivo o cuenta de ahorros");
      return;
    }
    this.ingresos_netos += valorIngresado;
    this.crud.edit(path, this.ingresos_netos);

    this.utilidades += valorIngresado;
    this.crud.edit("/TOTAL_DIA/CONTABILIDAD/utilidades", this.utilidades);
  }

  updateEfectivo(){
    this.cuenta = false;
  }

  updateCuenta(){
    this.efectivo = false;
  }

  updateEfectivo_egresos(){
    this.cuenta_e = false;
  }

  updateCuenta_egresos(){
    this.efectivo_e = false; 
  }
}
