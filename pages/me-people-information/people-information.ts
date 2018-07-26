import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TelUpdatePage} from "./tel-update/tel-update";

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

  str = 'nihao';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeopleInformationPage');
  }
  goToTelUpdatePage() {
    this.navCtrl.push(TelUpdatePage);
  }

}
