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
    this.Lists=[{title:"总单量",num:1244},
    {title:"转单量",num:234},
    {title:"售后量",num:545},
    {title:"月单量",num:65},
    {title:"日单量",num:543},
    {title:"日收益",num:123},
    {title:"推广人数",num:2354},
    {title:"推广收益评分",num:234}]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerformancePage');
  }

}
