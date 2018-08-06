import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderdetailPage } from './orderdetail/orderdetail';
import {MessageServiceProvider} from "../../providers/messageService/messageService";
import { PageDataProvider } from '../../providers/page-data/page-data';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})

export class OrderPage {
  haveData=true;//判定有没有更多数据
  tabsIndex = 0;//tabs的选中项
  tabs = [
    {
      name:'待受理',
      backimg:'../../assets/icon/icon-wait.svg',
      backimg_active:'../../assets/icon/icon-wait-active.svg',
      cnt:0
    },
    {
      name:'已受理',
      backimg:'../../assets/icon/icon-accepted.svg',
      backimg_active:'../../assets/icon/icon-accepted-active.svg',
      cnt:0
    },
    {
      name:'已确定',
      backimg:'../../assets/icon/icon-confirmed.svg',
      backimg_active:'../../assets/icon/icon-cofirmed-active.svg',
      cnt:0
    },
    {
      name:'已支付',
      backimg:'../../assets/icon/icon-money.svg',
      backimg_active:'../../assets/icon/icon-money-active.svg',
      cnt:0
    },
    {
      name:'已完成',
      backimg:'../../assets/icon/icon-finished.svg',
      backimg_active:'../../assets/icon/icon-finished-active.svg',
      cnt:0
    }
  ]
  dataList=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pageData:PageDataProvider,
    private http:HttpServiceProvider,
    public srv: MessageServiceProvider
  ) {
  	 this.srv.getMessage().subscribe(message =>{//从home页或ordermap页进入订单页(第二次到订单页),根据订阅信息显示页面内容
    	 this.changeTabs(message);
    });
  }
  ionViewDidLoad() { //第一次进入订单页面,根据tabs页面参数判断是从哪个页面进入的
	this.orderList();
    this.orderCount();
  	  if(parseInt(this.navParams.data)==0 ){//home
  	  	this.changeTabs(parseInt(this.navParams.data)+1);
  	  }else if(parseInt(this.navParams.data)==1){//ordermap
  	  	this.changeTabs(parseInt(this.navParams.data)-1);
  	  }else{//其他页面
  	  	this.changeTabs(0);
  	  }
  	  
  }
  changeTabs(index){
    if(this.tabsIndex!==index){
      this.tabsIndex = index;
      this.pageData.refresh();
      this.orderList();
    }
  }
  viewDetail(idx){
    const item = this.dataList[idx];
    this.navCtrl.push(OrderdetailPage,{
      item:JSON.stringify(item)
    });
  }
  orderCount(){
    this.http.request({
      url:'order/countorderbystatus',
      type:'get',
      loading:false,
      success:res=>{
        for(let i=0;i<res.length;i++){
          this.tabs[i].cnt = res[i];
        }
      }
    })
  }
  orderList(operation?:any){
    let flag = operation?false:true;
    this.http.request({
      url:'order/orderlist',
      loading:flag,
      data:{
        Status:this.tabsIndex+1,
        currentPage:this.pageData.next_page,
        pageSize:10,
      },
      success:res=>{
        this.pageData.load(res);
        this.dataList = this.pageData.list;
        this.haveData = this.pageData.more_data;
      },
      complete:res=>{
        if(operation){
          operation.complete();
         
        }
       
      }
    })
  }
  //下拉刷新
  doRefresh(refresher) {
    this.pageData.refresh();
    this.orderList(refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      this.orderList(infiniteScroll);
    }else{
      infiniteScroll.enable(false);
      infiniteScroll.complete();
    }
   
  }
}
