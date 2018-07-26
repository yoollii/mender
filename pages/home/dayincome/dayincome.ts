import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncomedetailPage } from '../incomedetail/incomedetail';
/**
 * Generated class for the DayincomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dayincome',
  templateUrl: 'dayincome.html',
})
export class DayincomePage {
  allIncome:number=1920;
  divide:number=1500;
  allowance:number=100;
  extend:number=80;
  master:number=80;
  turn:number=80;
  recommend:number=80;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayincomePage');
  }
  detail(){//订单收入明细
  	this.navCtrl.push(IncomedetailPage);
  }

}
