import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-comment',
  templateUrl: 'user-comment.html',
})
export class UserCommentPage {
  stars:Array<number>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const ordertItem = this.navParams.data['orderItem'];
    this.stars = ordertItem['stars'];
  }

  ionViewDidLoad() {
   
  }

}
