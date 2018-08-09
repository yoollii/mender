import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {PageDataProvider} from "../../providers/page-data/page-data";
import { OrderDetailsPage } from '../me/order-details/order-details';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

/**
 * Generated class for the ReceiveRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive-record',
  templateUrl: 'receive-record.html',
})
export class ReceiveRecordPage {

  records = [];
  haveData: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpServiceProvider,
              private pageData: PageDataProvider,
              private storage: StorageServiceProvider) {
  }

  ionViewDidLoad() {
    this.getRecordList();
  }
  getRecordList(operation?: any) {
    let flag = operation?false:true;
    this.http.request({
      url: 'my/receiverecord/',
      type: 'post',
      data: {currentPage: this.pageData.next_page},
      success: res => {
        this.pageData.load(res);
        this.records = this.pageData.list;
        this.haveData = this.pageData.more_data;
      },
      complete: res => {
        if(operation) {
          operation.complete();
        }
      }
    });
  }
  goToOrderDetail(orderDetailNo: string) {
    this.storage.write('orderDetailNo', {code: orderDetailNo});
    this.navCtrl.push(OrderDetailsPage);
  }
  //下拉刷新
  doRefresh(refresher) {
    this.pageData.refresh();
    this.getRecordList(refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      this.getRecordList(infiniteScroll);
    }else{
      infiniteScroll.enable(false);
      infiniteScroll.complete();
    }

  }

}
