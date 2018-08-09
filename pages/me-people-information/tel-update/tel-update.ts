import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

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

  telphone = '';
  validateCode = '';
  vcStr = '免费获取';
  vcTime = 60;
  isDisabled = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public alertController: AlertController,
              private http: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TelUpdatePage');
  }
  getValiDateCode() {
    if(this.telphone == null || this.telphone == '') {
      this.validataCode('请输入手机号码');
      return;
    }
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.telphone))){
      this.validataCode('请输入正确的手机号码');
      return;
    }
    this.http.request({
      url: 'workerInfo/changephonecode/'+this.telphone,
      type: 'get',
      success: res => {
        this.validataCode('验证码已发送，请注意接收');
        this.setTime();
      }
    });
  }
  setTime() {
    let si = setInterval( res => {
      if(this.vcTime != 0) {
        this.isDisabled = true;
        this.vcTime--;
        this.vcStr = this.vcTime + '秒后重新获取';
      }else {
        this.isDisabled = false;
        this.vcTime = 60;
        this.vcStr = '重新获取';
        clearInterval(si);
      }
    }, 1000);
  }
  telSure() {
    this.http.request({
      url: 'workerInfo/enterchangeworkerphone',
      type: 'put',
      data: {changephone: this.telphone, code: this.validateCode},
      success: res => {
        this.validataCode('修改手机成功');
      }
    });
  }
  telSureTips() {
    const alert = this.alertController.create({
      cssClass: 'tel-alert',
      title: '修改手机成功',
      subTitle: '您新的手机号为' + this.telphone
    })
    alert.present();
  }
  validataCode(text: string) {
    const alert = this.alertController.create({
      cssClass: 'tel-alert',
      title: '',
      subTitle: text
    })
    alert.present();
  }
}
