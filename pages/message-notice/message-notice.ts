import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessageNoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-notice',
  templateUrl: 'message-notice.html',
})
export class MessageNoticePage {

  messages = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.messages = [
      {date: new Date(), content: '月排行榜今日更新，恭喜刘明华师傅以一月807单的成绩位居榜首', footer: '修匠手机维修测试店'},
      {date: new Date(), content: '月排行榜今日更新，恭喜陈明华师傅以一月807单的成绩位居榜首', footer: '修匠手机维修测试店'},
      {date: new Date(), content: '月排行榜今日更新，恭喜王明华师傅以一月807单的成绩位居榜首', footer: '修匠手机维修测试店'},
      {date: new Date(), content: '月排行榜今日更新，恭喜李明华师傅以一月807单的成绩位居榜首', footer: '修匠手机维修测试店'},
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageNoticePage');
  }

}
