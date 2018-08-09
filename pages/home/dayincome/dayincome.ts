import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncomedetailPage } from '../incomedetail/incomedetail';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
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
  allIncome:number=0;
  divide:number=0;
  allowance:number=0;
  extend:number=0;
  master:number=0;
  turn:number=0;
  recommend:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpServiceProvider) {
  }

  ionViewDidLoad() {
    this.workerdayincomedetail();
  }
  detail(){//订单收入明细
  	this.navCtrl.push(IncomedetailPage);
  }
  workerdayincomedetail(){
    this.http.request({
      url:'workerInfo/workerdayincomedetail',
      type:'get',
      success:res=>{
        this.divide=res['ordertotalincome'];
        this.allowance = res['subsidytotalincome'];
        this.master = res['followertotalincome'];
        this.turn = res['tranftotalincome'];
        this.allIncome = res['daytotalincome'];
      }
    })
  }
}
