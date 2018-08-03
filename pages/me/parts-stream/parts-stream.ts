import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";

/**
 * Generated class for the PartsStreamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parts-stream',
  templateUrl: 'parts-stream.html',
})
export class PartsStreamPage {

  parts = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpServiceProvider
  ) {
    this.http.request({
      url: 'my/partsflow',
      type: 'post',
      data: {current: 1, size: 5},
      success: res => {
        console.log(res);
        this.parts = res.records;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartsStreamPage');
  }

}
