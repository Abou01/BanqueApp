import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VirementPage} from "../virement/virement";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  OnVirementClick(){
      this.navCtrl.push(VirementPage);
  }

  OnChatClick(){

  }

}
