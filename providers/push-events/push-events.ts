import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController} from 'ionic-angular';
import { MessageNoticePage } from '../../pages/me-message-notice/message-notice';
/*
  Generated class for the PushEventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushEventsProvider {

  constructor(
    public http: HttpClient,
    private navCtrl:NavController
  ) {
    
  }
  doPushNav(type:string){
    switch(type){
      case '1'://通知列表页面
      this.navCtrl.push(MessageNoticePage);
      break;
      case '2'://跳转到拜师列表页面
      this.navCtrl.push(MessageNoticePage);
      break;
    }
  }
}
