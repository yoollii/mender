import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

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
  public Lists: Object;
  starts = [];
  url = '';
  student: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpServiceProvider,
              private storage: StorageServiceProvider) {
  }

  ionViewDidLoad() {
    if(this.storage.read('student') != null && this.storage.read('student') != '') {
      this.student = this.storage.read('student');
      this.url = 'workerInfo/apprenticeachievment/'+this.student['worknum'];
      this.storage.remove('student');
    }else {
      this.url = 'workerInfo/perfomancemanage';
    }
    this.http.request({
      url: this.url,
      type: 'get',
      success: res => {
        this.Lists = res;
        if(!this.Lists['worknum']) {
          this.Lists['worknum'] = '';
        }
        if(!this.Lists['avatar']) {
          this.Lists['avatar'] = '';
        }
        let num = this.Lists['score'];
        let flag = num.indexOf('.0') != -1;
        if(flag) {
          for(let i = 0; i < parseInt(num); i++) {
            this.starts.push({img: 'assets/imgs/person/star.png', style: 'star'});
          }
        }else {
          for(let i = 0; i < parseInt(num.substring(0, 1)); i++) {
            this.starts.push({img: 'assets/imgs/person/star.png', style: 'star'});
          }
          this.starts.push({img: 'assets/imgs/person/halfstar1.png', style: 'halfstar'});
        }
      }
    });
  }

}
