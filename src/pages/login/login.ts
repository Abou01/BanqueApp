import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@IonicPage({
  name: 'auth-signin'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form : FormGroup;
  hasError: boolean;
  errorMessage: string;
  loading:any;
  
  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder, private api: ApiProvider) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  OnRegisterClick():void {
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    
    this.showLoader('Chargement...');

    //Check if already authenticated
    this.api.checkAuthentication().then((res) => {
        console.log("Already authorized");
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
    }, (err) => {
        console.log("Not already authorized");
        this.loading.dismiss();
    });

  }

  signInWithEmail() {
    this.showLoader('Connexion en cours...');

    let credentials = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    
    this.api.login(credentials)
    .then(() => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (error) => {
      this.loading.dismiss();
      this.errorMessage = error;
      this.hasError = true;
    });
  }

  showLoader(message:string){
    
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();

  }
}