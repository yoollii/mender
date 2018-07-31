import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShoppingCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-car',
  templateUrl: 'shopping-car.html',
})
export class ShoppingCarPage {

  parts = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parts = [
      {name: 'S8内屏幕', num: '1600*3(占用额度20)',money: '4800.00'},
      {name: 'S8内屏幕', num: '1600*3(占用额度20)',money: '4800.00'},
      {name: 'S8内屏幕', num: '1600*3(占用额度20)',money: '4800.00'},
      {name: 'S8内屏幕', num: '1600*3(占用额度20)',money: '4800.00'},
      {name: 'S8内屏幕', num: '1600*3(占用额度20)',money: '4800.00'},
      {name: 'S8内屏幕', num: '1600*3(占用额度20)',money: '4800.00'},
      {name: 'S8内屏幕', num: '1600*3(占用额度20)',money: '4800.00'},
      {name: 'S8内屏幕', num: '1600*3(占用额度20)',money: '4800.00'},
      {name: 'S8内屏幕', num: '1600*3(占用额度20)',money: '4800.00'}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCarPage');
  }

}
