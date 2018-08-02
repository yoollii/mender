import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TelUpdatePage} from "./tel-update/tel-update";
import {ShopChoosePage} from "../me/shop-choose/shop-choose";
import {OrderDetailsPage} from "../me/order-details/order-details";
import {ShoppingCarPage} from "../me/shopping-car/shopping-car";
import {PartsMallPage} from "../parts-mall/parts-mall";


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
  goToPartsTest() {
    this.navCtrl.push(PartsMallPage);
  }

  goToTelUpdatePage() {
    this.navCtrl.push(TelUpdatePage);
  }
  goToShopChoosePage() {
    this.navCtrl.push(ShopChoosePage);
  }
  goToOrderDetailsPage() {
    this.navCtrl.push(OrderDetailsPage);
  }
  goToShoppingCar() {
    this.navCtrl.push(ShoppingCarPage);
  }
}
