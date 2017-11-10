import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinChatPage } from './join-chat';

@NgModule({
  declarations: [
    JoinChatPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinChatPage),
  ],
})
export class JoinChatPageModule {}
