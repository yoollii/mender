import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TelUpdatePage} from "./tel-update/tel-update";
import {ShopChoosePage} from "../me/shop-choose/shop-choose";
import {OrderDetailsPage} from "../me/order-details/order-details";
import {ShoppingCarPage} from "../me/shopping-car/shopping-car";
import {PartsMallPage} from "../parts-mall/parts-mall";
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { HttpServiceProvider } from '../../providers/http-service/http-service';


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

  userInfo: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpServiceProvider,
              private storage: StorageServiceProvider) {
  }

  ionViewDidLoad() {
    this.http.request({
      url: 'workerInfo/infodetail',
      type: 'get',
      success: res => {
        this.userInfo = res;
        this.userInfo['name'] = this.storage.read('user')['name'];
      }
    });
  }
  goToPartsTest() {
    this.navCtrl.push(PartsMallPage);
  }

  goToTelUpdatePage() {
    this.navCtrl.push(TelUpdatePage);
  }
  goToShoppingCar() {
    this.navCtrl.push(ShoppingCarPage);
  }
}
