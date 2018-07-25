import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  private Lists=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Lists=[{title:"消息通知",src:"../../assets/imgs/person/msg.png"},
    {title:"我的配件",src:"../../assets/imgs/person/parts.png"},
    {title:"个人信息",src:"../../assets/imgs/person/person-msg.png"},
    {title:"绩效管理",src:"../../assets/imgs/person/performance.png"},
    {title:"师徒管理",src:"../../assets/imgs/person/teachers.png"},
    {title:"推广管理",src:"../../assets/imgs/person/extension.png"}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }

}
