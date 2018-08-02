import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  shops = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shops = [
      {name: '天府国际金融城1号店 ( NO.0569 ) ', address: '高新区天府国际金融中心写字楼1号负一楼大堂', distance: 315},
      {name: '天府国际金融城2号店 ( NO.0569 ) ', address: '高新区天府国际金融中心写字楼2号负一楼大堂', distance: 325},
      {name: '天府国际金融城3号店 ( NO.0569 ) ', address: '高新区天府国际金融中心写字楼3号负一楼大堂', distance: 335},
      {name: '天府国际金融城4号店 ( NO.0569 ) ', address: '高新区天府国际金融中心写字楼4号负一楼大堂', distance: 345},
      {name: '天府国际金融城5号店 ( NO.0569 ) ', address: '高新区天府国际金融中心写字楼5号负一楼大堂', distance: 355},
      {name: '天府国际金融城6号店 ( NO.0569 ) ', address: '高新区天府国际金融中心写字楼6号负一楼大堂', distance: 365},
      {name: '天府国际金融城7号店 ( NO.0569 ) ', address: '高新区天府国际金融中心写字楼7号负一楼大堂', distance: 375},
      {name: '天府国际金融城8号店 ( NO.0569 ) ', address: '高新区天府国际金融中心写字楼8号负一楼大堂', distance: 385},
      {name: '天府国际金融城9号店 ( NO.0569 ) ', address: '高新区天府国际金融中心写字楼9号负一楼大堂', distance: 395},
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

}
