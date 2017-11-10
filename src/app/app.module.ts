import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {VirementPage} from "../pages/virement/virement";
import {BankNavbarComponent} from "../components/bank-navbar/bank-navbar";
import { ApiProvider } from '../providers/api/api';
import { AddVirementPage } from '../pages/add-virement/add-virement';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { JoinChatPage } from '../pages/join-chat/join-chat';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
const config: SocketIoConfig = { url: 'http://127.0.0.1:3000', options: {} };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VirementPage,
    AddVirementPage,
    LoginPage,
    RegisterPage,
    BankNavbarComponent,
    JoinChatPage,
    ChatRoomPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VirementPage,
    LoginPage,
    AddVirementPage,
    RegisterPage,
    JoinChatPage,
    ChatRoomPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
