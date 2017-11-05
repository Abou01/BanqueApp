import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the BankNavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bank-navbar',
  templateUrl: 'bank-navbar.html'
})
export class BankNavbarComponent {

  text: string;

  constructor(public navCtrl: NavController, private api: ApiProvider) {
    this.text = 'BankApp';
  }

  OnHomeClick(){
    this.navCtrl.popToRoot();
  }

  OnLogoutClick(){
    this.api.logout().then((res) => {
      this.navCtrl.setRoot(LoginPage);
    }, (err) => {
        console.log("Error on Logout : " + JSON.stringify(err));
    });

  }

}
