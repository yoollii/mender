import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";

/**
 * Generated class for the ApplyPartsTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-parts-two',
  templateUrl: 'apply-parts-two.html',
})
export class ApplyPartsTwoPage {
  buyNumber = 0;
  navList = [];
  navIndex =0;
  products = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpServiceProvider) {
    this.http.request({
      url: 'my/applypartsmenu',
      type: 'get',
      success: res => res.reduce((str, nav) => this.navList.push(nav.title), '')
    });
    this.http.request({
      url: 'my/applypartsdetail',
      data : {classifyid: 1, current: 1, size: 10},
      success: res => this.products = res.records
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPartsTwoPage');
  }
  navChange(index) {
    if (this.navIndex != index) {
      this.navIndex = index;
    }
    this.http.request({
      url: 'my/applypartsdetail',
      data : {classifyid: index + 1, current: 1, size: 10},
      success: res => this.products = res.records
    });
  }
}
