import { Component} from '@angular/core';
import { NavController,Platform,ToastController } from 'ionic-angular';
import { DayincomePage } from './dayincome/dayincome';
import { RanklistPage } from './ranklist/ranklist';
import {MessageServiceProvider} from "../../providers/messageService/messageService";
import { HttpServiceProvider } from '../../providers/http-service/http-service';
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
  n=0;
  todayIncome:number = 0;
  rank:number=0;
  todayOrderCount:number=0;
  constructor(
    public navCtrl: NavController,
    private toastCtrl:ToastController,
    private plat:Platform,
    public srv: MessageServiceProvider,
    private http:HttpServiceProvider,
  ) {
    const pl = this.plat;
    this.plat.registerBackButtonAction(res=>{
      this.n++;
      if(this.n<2){
        this.toast('再次按返回键将退出程序');
      }else{
        pl.exitApp();
      }
    })
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
    this.countRequst();
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
    const tab = this.navCtrl.parent.getByIndex(2);
    tab.rootParams=1;
    this.srv.sendMessage(1);
    this.navCtrl.parent.select(2);
  }
  incomeZq(){//今日收入
  	this.rankingList=false;
  	this.order=false;
    this.income=true;
    this.navCtrl.push(DayincomePage);
  }
  toast(msg){
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'middle', // “top”，“middle”，“bottom”。
      duration: 3000
    });
    toast.present();
  }
  countRequst(){
    this.http.request({
      url:'workerProfit/workerIndex',
      type:'get',
      success:res=>{
        this.todayIncome = res['dayTotalIncome'];
        this.rank = res['leaderBoard'];
        this.todayOrderCount = res['orderNumberToday'];
      }
    })
  }
}
