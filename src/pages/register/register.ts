import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  form : FormGroup;
  hasError: boolean;
  errorMessage: string;
  isConfirm:any;
  loading:any;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private auth: ApiProvider
  ) {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
    this.isConfirm=true;
}

  signUp() {

    if(this.form.value.password != this.form.value.confirm_password){
      this.isConfirm = false;
    }
    else{

      this.showLoader('Enregistrement...');

      let details = {
        nom: this.form.value.nom,
        prenom: this.form.value.prenom,
        username: this.form.value.username,      
        email: this.form.value.email,
        password: this.form.value.password
      };

      this.auth.createAccount(details).then(() => {
        this.loading.dismiss();
        this.navCtrl.pop();
      }, (error) => {
        this.loading.dismiss();
        this.errorMessage = error;
        this.hasError = true;
      });
    }

  }

  showLoader(message:string){
    
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();

  }
  
  navigatePop() {
    this.navCtrl.pop();
  }

}
