import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageServiceProvider } from '../../../providers/storage-service/storage-service';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { ApplyPartsTwoPage } from '../apply-parts-two/apply-parts-two';

/**
 * Generated class for the ApplyPartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-parts',
  templateUrl: 'apply-parts.html',
})
export class ApplyPartsPage {

  orderCode = '';
  orderDetail: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: StorageServiceProvider,
              private http: HttpServiceProvider,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.orderCode = this.storage.read('orderCode');
    this.http.request({
      url: 'my/applypartsorder/'+this.orderCode['orderno'],
      type: 'get',
      success: res => {
        this.orderDetail = res;
      }
    });
  }
  sureApply() {
    this.http.request({
      url: 'my/applypartssubmitorder/'+this.orderCode['orderno'],
      type: 'put',
      success: res => {
        this.tipsAlert();
      }
    });
  }
  tipsAlert() {
    const alert = this.alertCtrl.create({
      cssClass: 'tips-alert',
      title: '配件申请成功',
      enableBackdropDismiss: false,
      buttons: [{text: '返回配件列表', handler: () => {this.navCtrl.push(ApplyPartsTwoPage)}}]
    })
    alert.present();
  }
}
