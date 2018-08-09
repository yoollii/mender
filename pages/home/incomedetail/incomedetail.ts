import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { PageDataProvider } from '../../../providers/page-data/page-data';
/**
 * Generated class for the IncomedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incomedetail',
  templateUrl: 'incomedetail.html',
})
export class IncomedetailPage {
  haveData=true;//判定有没有更多数据
  dataList=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http:HttpServiceProvider,
    private pageData:PageDataProvider,
    ) {
  }

  ionViewDidLoad() {
    this.workerProfitDetail();
  }
  workerProfitDetail(operation?:any){
    let flag = operation?false:true;
    this.http.request({
      url:'workerInfo/workerProfitDetail',
      loading:flag,
      data:{
        currentPage:this.pageData.next_page,
        pageSize:10,
      },
      type:'post',
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
    this.workerProfitDetail(refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      this.workerProfitDetail(infiniteScroll);
    }else{
      infiniteScroll.enable(false);
      infiniteScroll.complete();
    }
   
  }
}
