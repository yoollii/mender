import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApplyPartsPage} from "../apply-parts/apply-parts";
import {ReceiveRecordPage} from "../../me-receive-record/receive-record";
import {PartsStreamPage} from "../parts-stream/parts-stream";

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
  goToPartsStream() {
    this.navCtrl.push(PartsStreamPage);
  }
  goToApplyParts() {
    this.navCtrl.push(ApplyPartsPage);
  }
  goToShopReceiveRecord() {
    this.navCtrl.push(ReceiveRecordPage);
  }
}
