import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nowTime:string;
  nowDay:string;
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
  	let nowtime=new Date();
  	this.nowTime=nowtime.getHours()+' : '+nowtime.getMinutes();
  	let da=nowtime.getDate(); //获取当前日 
    let mon=nowtime.getMonth()+1; //获取当前月份 
    let day=nowtime.getDay(); //获取当前星期几  
  	this.nowDay=mon+'月'+da+'日   星期'+day;
  	setTimeout(function(){
  		this.nowTime=nowtime.getHours()+' : '+nowtime.getMinutes();
  	},60000);
  }

}
