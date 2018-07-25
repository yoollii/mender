import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PerformancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-performance',
  templateUrl: 'performance.html',
})
export class PerformancePage {
  public Lists=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Lists=[{title:"接单数",num:1244},
    {title:"取消量",num:234},
    {title:"售后量",num:545},
    {title:"12小时完成量",num:65},
    {title:"苹果维修量",num:543},
    {title:"国产维修量",num:123},
    {title:"推广量",num:2354},
    {title:"24小时推广量",num:234}]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerformancePage');
  }

}
