import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReceiveRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive-record',
  templateUrl: 'receive-record.html',
})
export class ReceiveRecordPage {

  records = []
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.records = [
      {orderCode: '201824124324', state: '已申请', quota: 111,parts: 11,money: 3423},
      {orderCode: '201824575675', state: '未申请', quota: 222,parts: 22, money: 1243},
      {orderCode: '201824235465', state: '未申请', quota: 333,parts: 33, money: 5643},
      {orderCode: '201822546546', state: '已申请', quota: 444,parts: 44, money: 76554},
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiveRecordPage');
  }

}
