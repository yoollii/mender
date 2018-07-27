import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PartsMallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parts-mall',
  templateUrl: 'parts-mall.html',
})
export class PartsMallPage {
  navList = ['屏幕','按键'];
  navIndex =0;
  show=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartsMallPage');
  }
  navChange(index){
    if(this.navIndex!=index){
      this.navIndex = index;
    }
  }
  viewBrand(){
    this.show = this.show?false:true;
  }
}
