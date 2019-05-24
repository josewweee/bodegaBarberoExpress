import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { crudDB } from '../../services/crudDB.service';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  contadorUsuarios: number;
  usuarios: any = [];
  path: string = "/USUARIOS/";
  constructor(public navCtrl: NavController, public navParams: NavParams, public crud: crudDB) {
    this.crud.getList(this.path).valueChanges()
      .subscribe((usuariosDB) => {
        this.usuarios = usuariosDB;
        this.contadorUsuarios = this.usuarios.length;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

}
