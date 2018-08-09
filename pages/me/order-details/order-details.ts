import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageServiceProvider } from '../../../providers/storage-service/storage-service';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  orderDetailNo: Object;
  orderDetail: Object;
  detailList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: StorageServiceProvider,
              private http: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    this.orderDetailNo = this.storage.read('orderDetailNo');
    this.http.request({
      url: 'my/receiverecordorderlist/'+this.orderDetailNo['code'],
      type: 'get',
      success: res => {
        this.orderDetail = res;
        this.detailList = this.orderDetail['detailList'];
      }
    });
  }

}
