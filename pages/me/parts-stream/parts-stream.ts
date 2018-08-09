import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";
import {PageDataProvider} from "../../../providers/page-data/page-data";

/**
 * Generated class for the PartsStreamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parts-stream',
  templateUrl: 'parts-stream.html',
})
export class PartsStreamPage {

  parts = [];
  haveData = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpServiceProvider,
    private pageData: PageDataProvider
  ) {
  }

  ionViewDidLoad() {
    this.getPartsList();
  }
  getPartsList(operation?:any) {
    let flag = operation?false:true;
    this.http.request({
      url: 'my/partsflow/',
      type: 'post',
      data: {currentPage: this.pageData.next_page},
      success: res => {
        this.pageData.load(res);
        this.parts = this.pageData.list;
        this.haveData = this.pageData.more_data;
      },
      complete:res => {
        if(operation){
          operation.complete();
        }
      }
    });
  }
  //下拉刷新
  doRefresh(refresher) {
    console.log(refresher);
    this.pageData.refresh();
    this.getPartsList(refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      this.getPartsList(infiniteScroll);
    }else{
      infiniteScroll.enable(false);
      infiniteScroll.complete();
    }
  }
}
