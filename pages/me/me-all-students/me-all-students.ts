import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { PageDataProvider } from '../../../providers/page-data/page-data';


/**
 * Generated class for the MeAllStudentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me-all-students',
  templateUrl: 'me-all-students.html',
})
export class MeAllStudentsPage {

  apprentices = [];
  haveData = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpServiceProvider,
              private pageData: PageDataProvider) {
  }

  ionViewDidLoad() {
    this.getAllApprentice();
  }
  getAllApprentice(operation?: any) {
    let flag = operation?false:true;
    this.http.request({
      url: 'my/masterapprenticelistall',
      type: 'get',
      success: res => this.apprentices = res,
      complete: res => {
        if(operation) {
          operation.complete();
        }
      }
    });
  }
}
