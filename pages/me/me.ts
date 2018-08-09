import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PeopleInformationPage } from '../me-people-information/people-information';
import { MessageNoticePage } from '../me-message-notice/message-notice';
import { PerformancePage } from '../me-performance/performance';
import { TeachersPage } from './me-teachers/teachers';
import { TwocodePage } from './twocode/twocode';
import {MyPartsPage} from "./my-parts/my-parts";
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

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
  userInfo: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpServiceProvider,
              private storage: StorageServiceProvider) {
    this.Lists=[{title:"消息通知",src:"../../assets/imgs/person/msg.png",nav:MessageNoticePage,classIcon:"notice-icon"},
    // {title:"我的配件",src:"../../assets/imgs/person/parts.png",nav:PartsMallPage,classIcon:"parts-icon"},
    {title:"我的配件",src:"../../assets/imgs/person/parts.png",nav:MyPartsPage,classIcon:"parts-icon"},
    {title:"个人信息",src:"../../assets/imgs/person/person-msg.png",nav:PeopleInformationPage,classIcon:"persion-icon"},
    {title:"绩效管理",src:"../../assets/imgs/person/performance.png",nav:PerformancePage,classIcon:"performance-icon"},
    {title:"师徒管理",src:"../../assets/imgs/person/teachers.png",nav:TeachersPage,classIcon:"teachers-icon"}]
    // {title:"推广管理",src:"../../assets/imgs/person/extension.png",nav:"PeopleInformationPage",classIcon:"extension-icon"}]
    this.userInfo = this.storage.read('user');
  }

  ionViewDidLoad() {
   this.http.request({
     url: 'workerInfo/infoheader',
     type: 'get',
     success: res => {
       this.userInfo['dayincome'] = res['dayincome'];
       this.userInfo['monthincome'] = res['monthincome'];
       this.userInfo['totalincome'] = res['totalincome'];
     }
   });
  }
  qrcode(){
  	this.navCtrl.push(TwocodePage);
  }
  
}
