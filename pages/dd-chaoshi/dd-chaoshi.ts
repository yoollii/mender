import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service'
import { PageDataProvider } from '../../providers/page-data/page-data';
import { OrderdetailPage } from '../order/orderdetail/orderdetail';
/**
 * Generated class for the DdChaoshiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dd-chaoshi',
  templateUrl: 'dd-chaoshi.html',
})
export class DdChaoshiPage {
  title:string;
  apiList=[
    'order/todayorderlist',
    'order/overtimeorderlist'
  ];
  api:string;
  haveData=true;//判定有没有更多数据
  dataList:Array<object>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http:HttpServiceProvider,
    private pageData:PageDataProvider,
  ) {
    
  }

  ionViewDidLoad() {
 
  }
  ionViewDidEnter(){
    const index = this.navParams.data['index'];
    if(index==1){
      this.title = '今日预约';
      
    }else if(index==2){
      this.title = '超时订单';
    }
    this.api = this.apiList[index-1]
    this.dataList=[];
    this.pageData.refresh();
    this.orderList(this.api);
   }
  viewDetail(idx){
    const item = this.dataList[idx];
    this.navCtrl.push(OrderdetailPage,{
      item:JSON.stringify(item)
    });
  }
  orderList(api:string,operation?:any){
    let flag = operation?false:true;
    this.http.request({
      url:api,
      loading:flag,
      data:{
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
    this.orderList(this.api,refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      this.orderList(this.api,infiniteScroll);
    }else{
      infiniteScroll.enable(false);
      infiniteScroll.complete();
    }
   
  }
}
