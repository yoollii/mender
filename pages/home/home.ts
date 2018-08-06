import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { DayincomePage } from './dayincome/dayincome';
import { RanklistPage } from './ranklist/ranklist';
import {MessageServiceProvider} from "../../providers/messageService/messageService";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nowTime:string;
  nowDay:string;
  nowweek:number;
  btnText:string='开始接单';
  rankingList:boolean=false;
  order:boolean=false;
  income:boolean=false;
  myrotate:boolean=false;
  constructor(public navCtrl: NavController,public srv: MessageServiceProvider) {

  }
  ionViewDidLoad() {
  	let nowtime=new Date();
  	let m1;
  	if(nowtime.getMinutes()<10){
  			m1='0'+nowtime.getMinutes();
  		}else{
  			m1=nowtime.getMinutes();
  		}
  	this.nowTime=nowtime.getHours()+' : '+m1;
  	let da=nowtime.getDate(); //获取当前日 
    let mon=nowtime.getMonth()+1; //获取当前月份 
    this.nowweek=nowtime.getDay(); //获取当前星期几  
  	this.nowDay=mon+'月'+da+'日';
  	setInterval(()=>{
  		let nowtime1=new Date();
  		let m;
  		if(nowtime1.getMinutes()<10){
  			m='0'+nowtime1.getMinutes();
  		}else{
  			m=nowtime1.getMinutes();
  		}
  		this.nowTime=nowtime1.getHours()+' : '+m;
  		
  	},50000);
  }
  orderReZq(){//开始接单
  	if(this.btnText=='开始接单'){
  		this.btnText='结束接单';
  	  this.myrotate=true;//开始旋转动画
  	}else{
  		this.btnText='开始接单';
  	  this.myrotate=false;//结束旋转动画
  	}
  	
  }
  rankingListZq(){//排行榜
  	this.rankingList=true;
  	this.order=false;
    this.income=false;
    this.navCtrl.push(RanklistPage);
  }
  orderZq(){//今日订单
  	this.rankingList=false;
  	this.order=true;
    this.income=false;
    this.srv.sendMessage(1);
    this.navCtrl.parent.select(2);
  }
  incomeZq(){//今日收入
  	this.rankingList=false;
  	this.order=false;
    this.income=true;
    this.navCtrl.push(DayincomePage);
  }
}
