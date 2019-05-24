import { UsersPage } from './../pages/users/users';
import { ListaProductosPedidoPage } from './../pages/lista-productos-pedido/lista-productos-pedido';
import { DetallePedidoPage } from './../pages/detalle-pedido/detalle-pedido';
import { RecibosPage } from './../pages/recibos/recibos';
import { ContabilidadPage } from './../pages/contabilidad/contabilidad';
import { Camera } from '@ionic-native/camera';
import { DetalleProductoPage } from './../pages/detalle-producto/detalle-producto';
import { PipesModule } from './../pipes/pipes.module';
import { AuthService } from './../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';

// Imports Firebase auth, Database, Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
export const firebaseConfig = {
  apiKey: "AIzaSyAVCcHaDu7iETTruTao-QsbiDC6aow4b9s",
  authDomain: "barbero-express.firebaseapp.com",
  databaseURL: "https://barbero-express.firebaseio.com",
  projectId: "barbero-express",
  storageBucket: "barbero-express.appspot.com",
  messagingSenderId: "1021518127997"
}

// Servicios
import { crudDB } from '../services/crudDB.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { TabsHomePage } from '../pages/tabs-home/tabs-home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsHomePage,    
    DetalleProductoPage,
    ContabilidadPage,
    PedidosPage,
    RecibosPage,
    DetallePedidoPage,
    ListaProductosPedidoPage,
    UsersPage
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),          
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsHomePage,    
    DetalleProductoPage,
    ContabilidadPage,
    PedidosPage,
    RecibosPage,
    DetallePedidoPage,
    ListaProductosPedidoPage,
    UsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    AuthService,
    crudDB,
    AngularFireAuth,
    AngularFireDatabase,
    AngularFireStorage,
    // FileTransfer,
    // FileUploadOptions,
    // FileTransferObject,
    // File,
    CallNumber
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
