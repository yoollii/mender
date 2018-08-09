import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";
import { PageDataProvider } from '../../../providers/page-data/page-data';

/**
 * Generated class for the PartsStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parts-stock',
  templateUrl: 'parts-stock.html',
})
export class PartsStockPage {
  navList = [];
  navIndex =0;
  products = [];
  haveData = true;
  classId: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpServiceProvider,
              private pageData: PageDataProvider) {
  }

  ionViewDidLoad() {
    this.getNavList();
  }
  ionInputEvent(searchValue: string) {
    if(searchValue != '') {
      this.http.request({
        url: 'my/partsinventorysearch',
        data: {classifyid: this.classId, title: searchValue, currentPage: 1},
        success: res => {
          this.products.splice(0, this.products.length);
          this.products = res.list;
        }
      });
    }
  }
  navChange(index, classifyid){
    if(this.navIndex!=index){
      this.navIndex = index;
    }
    this.classId = classifyid;
    this.products.splice(0, this.products.length);
    this.getproductList(classifyid);
  }
  getNavList() {
    this.http.request({
      url: 'my/partsinventorymenu',
      type: 'get',
      success: res => {
        this.navList = res;
        this.classId = this.navList[0].classifyid;
        this.getproductList(this.navList[0].classifyid);
      }
    });
  }
  getproductList(index: number, operation?: any) {
    let flag = operation?false:true;
    this.http.request({
      url: 'my/partsinventorydetail',
      type: 'post',
      loading: flag,
      data: {classifyid: index, currentPage: this.pageData.next_page},
      success: res => {
        this.pageData.load(res);
        console.log(res);
        this.products = this.pageData.list;
        this.haveData = this.pageData.more_data;
      },
      complete: res => {
        if(operation){
          operation.complete();
        }
      }
    });
  }
  //下拉刷新
  doRefresh(refresher) {
    this.pageData.refresh();
    this.getproductList(this.classId, refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      this.getproductList(this.classId, infiniteScroll);
    }else{
      infiniteScroll.enable(false);
      infiniteScroll.complete();
    }
   
  }
}
