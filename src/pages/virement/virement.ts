import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import { AddVirementPage } from '../add-virement/add-virement';

/**
 * Generated class for the VirementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-virement',
  templateUrl: 'virement.html',
})
export class VirementPage {
    view;
    fullTab;
    fullTabBeforeView;
    tab;
    constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    }

    ionViewWillEnter() {
        this.api.getVirements().then((data) => {
            this.fullTabBeforeView = data;
            this.fullTab = data;
            this.tab = this.fullTab;

            this.changeView("present");
        
        }, (err) => {
            console.log(JSON.stringify(err));
        });
    }

    OnAddVirementClick(){
       this.navCtrl.push(AddVirementPage);
    }

    onChangeView($event){

        let value = $event.target.value;
        this.changeView(value);
    }

    changeView(value){
        switch (value) {
            case "present":
                this.fullTab = this.fullTabBeforeView.filter(function(ft) {
                    let currentdate = Date.parse(ft.date);
                    return currentdate < Date.now();
                });
                break;
            case "futur":
                this.fullTab = this.fullTabBeforeView.filter(function(ft) { 
                    let currentdate = Date.parse(ft.date);
                    return currentdate > Date.now() && ft.somme < 0; 
                });
                break;
        }

        this.tab = this.fullTab;
    }

    onFilterChange(critere){

        if(critere == "All"){
            this.tab = this.fullTab;
        }
        else
        {

            switch (critere) {
                case "Positif":
                    this.tab = this.fullTab.filter(function(ft) { return ft.somme > 0; });
                    break;
                case "Négatif":
                    this.tab = this.fullTab.filter(function(ft) { return ft.somme < 0; });
                    break;
            }

        }

    }
}