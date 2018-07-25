import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PeopleInformationPage } from '../me-people-information/people-information';
import { MessageNoticePage } from '../me-message-notice/message-notice';
import { PerformancePage } from '../me-performance/performance';

/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  public Lists=[];
  personMsg(list){
    if(list.nav=="MessageNoticePage"){
      this.navCtrl.push(MessageNoticePage);
    }else if(list.nav=="PeopleInformationPage"){
      this.navCtrl.push(PeopleInformationPage);
    }else if(list.nav=="PerformancePage"){
      this.navCtrl.push(PerformancePage);
    }
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Lists=[{title:"消息通知",src:"../../assets/imgs/person/msg.png",nav:"MessageNoticePage"},
    {title:"我的配件",src:"../../assets/imgs/person/parts.png",nav:"PeopleInformationPage"},
    {title:"个人信息",src:"../../assets/imgs/person/person-msg.png",nav:"PeopleInformationPage"},
    {title:"绩效管理",src:"../../assets/imgs/person/performance.png",nav:"PerformancePage"},
    {title:"师徒管理",src:"../../assets/imgs/person/teachers.png",nav:"PeopleInformationPage"},
    {title:"推广管理",src:"../../assets/imgs/person/extension.png",nav:"PeopleInformationPage"}]
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad MePage');
  }

}
