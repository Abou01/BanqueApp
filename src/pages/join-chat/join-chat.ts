import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { ChatRoomPage } from '../chat-room/chat-room';

/**
 * Generated class for the JoinChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join-chat',
  templateUrl: 'join-chat.html',
})
export class JoinChatPage {

  username = '';
  
   constructor(public navCtrl: NavController, private socket: Socket) { }
  
   joinChat() {
     this.socket.connect();
     this.socket.emit('set-nickname', this.username);
     this.navCtrl.push(ChatRoomPage, { username: this.username });
   }

}
