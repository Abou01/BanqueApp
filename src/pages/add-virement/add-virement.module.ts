import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddVirementPage } from './add-virement';

@NgModule({
  declarations: [
    AddVirementPage,
  ],
  imports: [
    IonicPageModule.forChild(AddVirementPage),
  ],
})
export class AddVirementPageModule {}
