import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parts = [
      {orderCode: '201823435312',img: '../../assets/imgs/licImg-ys.png',model: 'iphone6',fault: '电池故障-电池膨胀/续航时间短',color: '银色',solve: '使用S内屏幕*1 S8触摸键*1'},
      {orderCode: '201823435312',img: '../../assets/imgs/licImg-ys.png',model: 'iphone6',fault: '电池故障-电池膨胀/续航时间短',color: '银色',solve: '使用S内屏幕*1 S8触摸键*1'},
      {orderCode: '201823435312',img: '../../assets/imgs/licImg-ys.png',model: 'iphone6',fault: '电池故障-电池膨胀/续航时间短',color: '银色',solve: '使用S内屏幕*1 S8触摸键*1'},
      {orderCode: '201823435312',img: '../../assets/imgs/licImg-ys.png',model: 'iphone6',fault: '电池故障-电池膨胀/续航时间短',color: '银色',solve: '使用S内屏幕*1 S8触摸键*1'},
      {orderCode: '201823435312',img: '../../assets/imgs/licImg-ys.png',model: 'iphone6',fault: '电池故障-电池膨胀/续航时间短',color: '银色',solve: '使用S内屏幕*1 S8触摸键*1'}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartsStreamPage');
  }

}
