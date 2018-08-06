import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";

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
  navList = ['屏幕','按键', '外框', '喇叭', '相机', '电池', '主板', '其他'];
  navIndex =0;
  products = [
    {img: 'assets/imgs/person/notice/phone.jpg', name: 'iphone6 内屏', price: '499', num: '0'},
    {img: 'assets/imgs/person/notice/phone.jpg', name: 'iphone7 内屏', price: '599', num: '1'},
    {img: 'assets/imgs/person/notice/phone.jpg', name: 'iphone8 内屏', price: '699', num: '2'},
    {img: 'assets/imgs/person/notice/phone.jpg', name: 'iphone9 内屏', price: '799', num: '0'},
    {img: 'assets/imgs/person/notice/phone.jpg', name: 'iphone10 内屏', price: '899', num: '3'},
    {img: 'assets/imgs/person/notice/phone.jpg', name: 'iphone11 内屏', price: '999', num: '1'},
    {img: 'assets/imgs/person/notice/phone.jpg', name: 'iphone12 内屏', price: '1099', num: '2'},
    {img: 'assets/imgs/person/notice/phone.jpg', name: 'iphone13 内屏', price: '1199', num: '3'},
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpServiceProvider) {
    this.http.request({
      url: 'my/partsinventorydetail',
      type: 'post',
      data: {classifyid: 2, current: 1, size: 10},
      success: res => console.log(res)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartsStockPage');
  }
  navChange(index){
    if(this.navIndex!=index){
      this.navIndex = index;
    }

  }
}
