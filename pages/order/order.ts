import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderdetailPage } from './orderdetail/orderdetail';
import {MessageServiceProvider} from "../../providers/messageService/messageService";
import { Subscription } from 'rxjs/Subscription';

import { Events } from 'ionic-angular';

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
  subscription: Subscription;
  tabsIndex = 0;//tabs的选中项
  tabs = [
    {
      name:'待受理',
      backimg:'../../assets/icon/icon-wait.svg',
      backimg_active:'../../assets/icon/icon-wait-active.svg'
    },
    {
      name:'已受理',
      backimg:'../../assets/icon/icon-accepted.svg',
      backimg_active:'../../assets/icon/icon-accepted-active.svg'
    },
    {
      name:'已确定',
      backimg:'../../assets/icon/icon-confirmed.svg',
      backimg_active:'../../assets/icon/icon-cofirmed-active.svg'
    },
    {
      name:'已支付',
      backimg:'../../assets/icon/icon-money.svg',
      backimg_active:'../../assets/icon/icon-money-active.svg'
    },
    {
      name:'已完成',
      backimg:'../../assets/icon/icon-finished.svg',
      backimg_active:'../../assets/icon/icon-finished-active.svg'
    }
  ]
  dataList = [
    {
      order_no:'20192138388423424',
      status:0,
      products_list:[
        {
          name:'iphone6',
          thumbnail:'',
          color:'红色',
          info:'电池故障-电池膨胀/续航时间',
          price:"￥128.00"
        }
      ],
      count:'一',
      total_price:'￥128'
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams,public srv: MessageServiceProvider,public events: Events) { 
    
    this.srv.getMessage().subscribe(message =>{//从home页或ordermap页进入订单页(第二次到订单页),根据订阅信息显示页面内容
    	 this.changeTabs(message);
    });

  }
  ionViewDidLoad() { //第一次进入订单页面,根据tabs页面参数判断是从哪个页面进入的
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
    }
  }
  viewDetail(){
    this.navCtrl.push(OrderdetailPage);
  }
}
