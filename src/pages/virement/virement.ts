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
    fullTab;
    tab;
    constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {

    }

    ionViewWillEnter() {
        this.api.getVirements().then((data) => {
            this.fullTab = data;
            this.tab = this.fullTab;
        }, (err) => {
            console.log(JSON.stringify(err));
        });
    }

    OnAddVirementClick(){
       this.navCtrl.push(AddVirementPage);
    }

    onFilterChange(critere){
        let my_filter;

        if(critere == "All"){
            this.tab = this.fullTab;
        }
        else
        {

            switch (critere) {
                case "Positif":
                    my_filter = "{ somme: { $gt: 0} }";
                    this.tab = this.fullTab.filter(function(ft) { return ft.somme > 0; });
                    break;
                case "Négatif":
                    my_filter = "{ somme: { $lt: 0 } }";
                    this.tab = this.fullTab.filter(function(ft) { return ft.somme < 0; });
                    break;
            }
            console.log(my_filter);

        }

    }
}