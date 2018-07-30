import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PeopleInformationPage } from '../me-people-information/people-information';
import { MessageNoticePage } from '../me-message-notice/message-notice';
import { PerformancePage } from '../me-performance/performance';
import { TeachersPage } from './me-teachers/teachers';
import { TwocodePage } from './twocode/twocode';

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
  personMsg(nav){
    this.navCtrl.push(nav);
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Lists=[{title:"消息通知",src:"../../assets/imgs/person/msg.png",nav:MessageNoticePage,classIcon:"notice-icon"},
    {title:"我的配件",src:"../../assets/imgs/person/parts.png",nav:"",classIcon:"parts-icon"},
    {title:"个人信息",src:"../../assets/imgs/person/person-msg.png",nav:PeopleInformationPage,classIcon:"persion-icon"},
    {title:"绩效管理",src:"../../assets/imgs/person/performance.png",nav:PerformancePage,classIcon:"performance-icon"},
    {title:"师徒管理",src:"../../assets/imgs/person/teachers.png",nav:TeachersPage,classIcon:"teachers-icon"}]
    // {title:"推广管理",src:"../../assets/imgs/person/extension.png",nav:"PeopleInformationPage",classIcon:"extension-icon"}]
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad MePage');
  }
  qrcode(){
  	this.navCtrl.push(TwocodePage);
  }
  
}
