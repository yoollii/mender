import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
/**
 * Generated class for the ChangeWordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-word',
  templateUrl: 'change-word.html',
})
export class ChangeWordPage {
  readonly:boolean = false;
  time:number = 10;
  timeText:string = '10s';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpServiceProvider,
    private toastCtrl:ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeWordPage');
  }
  getValiCode(tel:HTMLInputElement){
    const telNum = tel.value;
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(telNum))){
      this.toast('手机号码不正确');
      return false;
    }
    this.http.request({
      url:'workerInfo/changepasswordcode/'+telNum,
      type:'get',
      success:res=>{
        this.readonly = true;
        this.countTime();
      }
    })
  }
  countTime(){
    let timer = setInterval(()=>{
      this.time--;
      this.timeText = this.time+'s';
      if(this.time==0){
        clearInterval(timer);
        timer=null;
        this.time=60;
        this.timeText='60s';
      }
    },1000)
  }
  toast(msg){
    const toast = this.toastCtrl.create({
      message: msg,
      position: 'middle', // “top”，“middle”，“bottom”。
      duration: 3000
    });
    toast.present();
  }
}
