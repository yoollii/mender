import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the TelUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tel-update',
  templateUrl: 'tel-update.html',
})
export class TelUpdatePage {

  telphone = '138*****235';
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TelUpdatePage');
  }

  telSure() {
    const alert = this.alertController.create({
      title: '修改手机成功',
      subTitle: '您新的手机号为' + this.telphone
    })
    alert.present();
  }
}
