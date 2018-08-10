import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { PageDataProvider } from '../../../providers/page-data/page-data';
import { StorageServiceProvider } from '../../../providers/storage-service/storage-service';
import { PerformancePage } from '../../me-performance/performance';


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
  title: string;
  isHidden = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpServiceProvider,
              private pageData: PageDataProvider,
              private storage: StorageServiceProvider,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('title');
    console.log(this.title);
    if(this.title == '所有徒弟') {
      this.isHidden = true;
      this.getAllApprentice();
    }
    if(this.title == '申请列表') {
      this.isHidden = false;
      this.getwantmyfollower();
    }
  }
  getAllApprentice() {
    this.http.request({
      url: 'my/masterapprenticelistall',
      type: 'get',
      success: res => this.apprentices = res
    });
  }
  getwantmyfollower() {
    this.http.request({
      url: 'my/getwantmyfollower',
      type: 'get',
      success: res => this.apprentices = res
    });
  }
  goToStudent(student: Object) {
    this.storage.write('student', student);
    this.navCtrl.push(PerformancePage);
  }
  sureGetApprentice(worknum: string) {
    this.http.request({
      url: 'my/entermyfollower/'+worknum,
      type: 'get',
      success: res => {
        this.tipsAlert('收徒成功')
      }
    });
  }
  tipsAlert(str: string) {
    const alert = this.alertCtrl.create({
      cssClass: 'tips-alert',
      title: str
    })
    alert.present();
  }
}
