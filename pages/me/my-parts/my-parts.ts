import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReceiveRecordPage} from "../../me-receive-record/receive-record";
import {PartsStreamPage} from "../parts-stream/parts-stream";
import {PartsStockPage} from "../parts-stock/parts-stock";
import {ApplyPartsTwoPage} from "../apply-parts-two/apply-parts-two";

/**
 * Generated class for the MyPartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-parts',
  templateUrl: 'my-parts.html',
})
export class MyPartsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPartsPage');
  }
  goToPartsStock() {
    this.navCtrl.push(PartsStockPage);
  }
  goToPartsStream() {
    this.navCtrl.push(PartsStreamPage);
  }
  goToApplyPartsTwo() {
    this.navCtrl.push(ApplyPartsTwoPage);
  }
  goToShopReceiveRecord() {
    this.navCtrl.push(ReceiveRecordPage);
  }
}
