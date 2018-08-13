import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderdetailPage } from './orderdetail/orderdetail';
import { MessageServiceProvider } from "../../providers/messageService/messageService";
import { PageDataProvider } from '../../providers/page-data/page-data';
import { HttpServiceProvider } from '../../providers/http-service/http-service'
import * as $ from 'jquery';
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
  haveData = true;//判定有没有更多数据
  tabsIndex = 0;//tabs的选中项
  srvIndex = -1;//获取外部传入的tabIndex
  reload = false;//用于判定tab外进入页面
  isInit = true;//用于判定详情页状态下，不刷新页面;
  tabs = [
    {
      name: '待受理',
      backimg: '../../assets/icon/icon-wait.svg',
      backimg_active: '../../assets/icon/icon-wait-active.svg',
      cnt: 0
    },
    {
      name: '已受理',
      backimg: '../../assets/icon/icon-accepted.svg',
      backimg_active: '../../assets/icon/icon-accepted-active.svg',
      cnt: 0
    },
    {
      name: '已确定',
      backimg: '../../assets/icon/icon-confirmed.svg',
      backimg_active: '../../assets/icon/icon-cofirmed-active.svg',
      cnt: 0
    },
    {
      name: '已支付',
      backimg: '../../assets/icon/icon-money.svg',
      backimg_active: '../../assets/icon/icon-money-active.svg',
      cnt: 0
    },
    {
      name: '已完成',
      backimg: '../../assets/icon/icon-finished.svg',
      backimg_active: '../../assets/icon/icon-finished-active.svg',
      cnt: 0
    }
  ]

  dataList = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pageData: PageDataProvider,
    private http: HttpServiceProvider,
    public srv: MessageServiceProvider

  ) {

    this.srv.getMessage().subscribe(message => {//从home页或ordermap页进入订单页(第二次到订单页),根据订阅信息显示页面内容
      //this.changeTabs(message);
      this.tabsIndex = message;
      this.srvIndex = message;
    });
  }
  ionViewDidLoad() { //第一次进入订单页面,根据tabs页面参数判断是从哪个页面进入的
    //  alert(this.navParams.data)
    if (parseInt(this.navParams.data) == 1) {//home
      this.tabsIndex = 1;
      this.srvIndex = 1;
    } else if (parseInt(this.navParams.data) == 1) {//ordermap
      //this.changeTabs(parseInt(this.navParams.data)-1);
    }

    this.orderList();
    this.orderCount();

  }
  ionViewDidEnter() {
    let scrollContent = $('.list-content .scroll-content');//去除滚动区域下的margin-bottom;
    scrollContent.css('marginBottom', '0px');
    if (this.reload) {
      this.srv.getMessage().subscribe(msg => {
        this.tabsIndex = msg;
      })
      this.pageData.refresh();
      this.orderList();
      this.orderCount();
    }
  }
  ionViewDidLeave() {
    if (this.srvIndex != -1&&this.isInit) {//判定
      this.pageData.refresh();
      this.tabsIndex = 0;
      this.reload = true;
    }
    this.isInit = true;//不管刷不刷新，统一更新状态
  }
  changeTabs(index) {
    if (this.tabsIndex !== index) {
      this.tabsIndex = index;
      this.pageData.refresh();
      this.orderList();
    }
  }
  viewDetail(idx) {
    const item = this.dataList[idx];
    this.isInit = false;//详情面不刷新数据
    this.navCtrl.push(OrderdetailPage, {
      item: JSON.stringify(item)
    });
  }
  orderCount() {
    this.http.request({
      url: 'order/countorderbystatus',
      type: 'get',
      loading: false,
      success: res => {
        for (let i = 0; i < res.length; i++) {
          this.tabs[i].cnt = res[i];
        }
      }
    })
  }
  orderList(operation?: any) {
    let flag = operation ? false : true;
    if (!this.pageData.more_data) {
      return false;
    }
    this.http.request({
      url: 'order/orderlist',
      loading: flag,
      data: {
        Status: this.tabsIndex + 1,
        currentPage: this.pageData.next_page,
        pageSize: 10,
      },
      success: res => {

        let resList = res['list'];
        for (let index = 0; index < resList.length; index++) {
          const item = resList[index];
          item['stars'] = [];
          if (item['status'] == 5 && item['comment']) {
            let comments = parseFloat(item['comment']);
            let last = comments % 1;
            let intStars = Math.ceil(comments);
            for (let index = 0; index < intStars; index++) {
              item['stars'].push(1);
            }
            if (last > 0) {
              item['stars'].push(last);//
            }
          }

        }

        this.pageData.load(res);
        this.dataList = this.pageData.list;
        this.haveData = this.pageData.more_data;
      },
      complete: res => {
        if (operation) {
          operation.complete();

        }

      }
    })
  }
  //下拉刷新
  doRefresh(refresher) {
    this.pageData.refresh();
    this.orderCount();
    this.orderList(refresher);

  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if (this.haveData) {
      this.orderList(infiniteScroll);
    } else {
      // infiniteScroll.enable(false);
      infiniteScroll.complete();
    }

  }
}
