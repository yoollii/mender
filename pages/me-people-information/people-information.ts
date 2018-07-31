import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TelUpdatePage} from "./tel-update/tel-update";
import {ShopChoosePage} from "../me/shop-choose/shop-choose";
import {ReceiveRecordPage} from "../me-receive-record/receive-record";
import {OrderDetailsPage} from "../me/order-details/order-details";
import {ShoppingCarPage} from "../me/shopping-car/shopping-car";
import {PartsStreamPage} from "../me/parts-stream/parts-stream";
import {ApplyPartsPage} from "../me/apply-parts/apply-parts";

/**
 * Generated class for the PeopleInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-people-information',
  templateUrl: 'people-information.html'
})
export class PeopleInformationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeopleInformationPage');
  }
  goToApplyParts() {
    this.navCtrl.push(ApplyPartsPage);
  }
  goToTelUpdatePage() {
    this.navCtrl.push(TelUpdatePage);
  }
  goToShopChoosePage() {
    this.navCtrl.push(ShopChoosePage);
  }
  goToShopReceiveRecord() {
    this.navCtrl.push(ReceiveRecordPage);
  }
  goToOrderDetailsPage() {
    this.navCtrl.push(OrderDetailsPage);
  }
  goToShoppingCar() {
    this.navCtrl.push(ShoppingCarPage);
  }
  goToPartsStream() {
    this.navCtrl.push(PartsStreamPage);
  }
}
