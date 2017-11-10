import { Component } from '@angular/core';
import {ApiProvider} from "../../providers/api/api";
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddVirementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-virement',
  templateUrl: 'add-virement.html',
})
export class AddVirementPage {
  newVir = {
    date:'',
    intitule:'',
    somme:'',
    description:'',
    destinataire:''
  };

  loading:any;

  hasError: boolean;
  errorMessage: string;
  isVirementAuto:Boolean;
  beneficiaires;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, private loadingCtrl: LoadingController) {
    this.newVir.date = new Date().toISOString();
    this.isVirementAuto = false;
    this.hasError = false;
    this.api.getUsers().then((data) => {
      this.beneficiaires = data;
      this.newVir.destinataire = this.beneficiaires[0];
    }, (err) => {
        console.log(JSON.stringify(err));
    });
  }

  OnAddNewVir(form) {
    
    console.log(JSON.stringify(this.newVir));

    this.showLoader('Enregistrement...');

    this.newVir.somme = this.newVir.somme.replace(",",".");

    if(isNaN(Number(this.newVir.somme))){
      console.log("isNAN");
      this.hasError = true;
      this.errorMessage = "Veuillez saisir un nombre pour la somme du virement !";
      this.loading.dismiss();
    }
    else{
      if(Number(this.newVir.somme)<1){
        console.log("is Neg-");
        this.hasError = true;
        this.errorMessage = "Veuillez saisir un nombre positif !";
        this.loading.dismiss();}
      else
      {
        this.api.addVirements(this.newVir)
        .then(() => {
          this.loading.dismiss();
          this.navCtrl.pop();
        }, (error) => {
          this.loading.dismiss();
          this.errorMessage = JSON.stringify(error);
          this.hasError = true;
        });
      }
    }
  }

  showLoader(message:string){
    
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();

  }

}
