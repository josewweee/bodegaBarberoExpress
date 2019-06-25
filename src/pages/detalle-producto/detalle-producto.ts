import { crudDB } from './../../services/crudDB.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';

/**
 * Generated class for the DetalleProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-producto',
  templateUrl: 'detalle-producto.html',
})
export class DetalleProductoPage {
  producto: any = {};
  ref: AngularFireStorageReference;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  progress: any;  // Observable 0 to 100
  image: string; // base64
  url: Observable<string>;
  productos: any = [];
  salida: any = [];
  costo: number;
  ganancia: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private storage: AngularFireStorage, private crud: crudDB) {
    this.producto = navParams.get('producto') || {};
    if(!this.producto.id) {
      this.producto.id = Date.now();
    }
    let pathProductos = "PRODUCTOS/";
    this.crud.getList(pathProductos).valueChanges()
          .subscribe((productosDB) => {
            this.productos = productosDB;
    });

    this.salida = this.productos;
  }

  resizeImage(file:File, maxWidth:number, maxHeight:number):Promise<Blob> {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => {
            let width = image.width;
            let height = image.height;

            if (width <= maxWidth && height <= maxHeight) {
                resolve(file);
            }

            let newWidth;
            let newHeight;

            if (width > height) {
                newHeight = height * (maxWidth / width);
                newWidth = maxWidth;
            } else {
                newWidth = width * (maxHeight / height);
                newHeight = maxHeight;
            }

            let canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;

            let context = canvas.getContext('2d');

            context.drawImage(image, 0, 0, newWidth, newHeight);

            canvas.toBlob(resolve, file.type);
        };
        image.onerror = reject;
    });
}

  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    return await this.camera.getPicture(options)
  }

  createUploadTask(file: string, path: string) {
    const filePath = `${path}`;
    this.ref = this.storage.ref(filePath);
    this.image = 'data:image/jpg;base64,' + file;
    alert("Cargando foto en la base de datos");
    this.ref.putString(this.image, 'data_url').then(() => {
      this.ref.getDownloadURL().subscribe(url => {
        this.downloadURL = url;
        //TEMPORAL
        this.producto.fotoGrande = this.producto.foto;
        this.producto.foto = this.downloadURL;
        alert("Foto cargada con éxito en la base de datos")
      })
    });
  }

  async openFromGallery(){
    return await this.camera.getPicture({
      quality: 100,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG
     });
  }



  async uploadHandler() {
    //const base64 = await this.takePhoto();
    const base64 = await this.openFromGallery();
    const pathFotoUsuario: string = `PRODUCTOS/${this.producto.id}/fotoProducto.jpg`;
    await this.resizeImage(base64, 300, 300).then(blob => {
      //You can upload the resized image: doUpload(blob)
      this.createUploadTask(URL.createObjectURL(blob), pathFotoUsuario);
    }, err => {
    	console.error("Photo error", err);
    });

    //this.createUploadTask(img, pathFotoUsuario);
  }

  confirmarRegistro(producto, costo:number, ganancia:number){
   /*  this.producto.costo = costo;
    this.producto.ganancia = this.producto.precio - this.producto.costo; */
    let path = "PRODUCTOS/" + producto.id;
    this.crud.create(path, this.producto);
    alert("El producto fue almacenado por un caballo en Barbero Express, gracias.");
    console.log("modificado");
    //this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleProductoPage');
  }

}
