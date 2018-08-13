import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";
import { PageDataProvider } from '../../../providers/page-data/page-data';
/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
  dataList=[];
  haveData=true;//判定有没有更多数据
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http:HttpServiceProvider,
    private pageData:PageDataProvider
  ) {
   
  }

  ionViewDidLoad() {
    this.pageData.refresh();
    this.partsList();
  }
  partsList(operation?:any){
    let flag = operation?false:true;
    if (!this.pageData.more_data) {
      return false;
    }
    this.http.request({
      url:'order/workerbackpack',
      loading:flag,
      data:{
        currentPage:this.pageData.next_page,
        orderno:this.navParams.data['orderno'],
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

    this.partsList(refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      this.partsList(infiniteScroll);
    }else{
      //infiniteScroll.enable(false);
      infiniteScroll.complete();
    }
   
  }
}
