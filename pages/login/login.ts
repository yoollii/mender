import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController ,App} from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { TabsPage } from '../../pages/tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http:HttpServiceProvider,
    private toastCtrl:ToastController,
    private storage:StorageServiceProvider,
    private app:App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(tel:HTMLInputElement,pwd:HTMLInputElement,status:HTMLInputElement){
  	this.app.getRootNav().push(TabsPage);
//  const telNum = tel.value;
//  const password = pwd.value.trim();
//  const checked = status.checked;
//  if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(telNum))){
//    this.toast('手机号码不正确');
//    return false;
//  }
//  if(!password||password.length<6){
//    this.toast('密码不正确');
//    return false;
//  }
//  this.http.request({
//    url:'workerInfo/login',
//    data:{
//      userName:telNum,
//      passWord:password
//    },
//    success:res=>{
//      this.loginSuccess(res);
//    }
//  });
  }
  loginSuccess(data){
    this.storage.write("user",data);
    this.app.getRootNav().push(TabsPage);
  }
  getTest(){
    this.http.request({
      url:"order/countorderbystatus",
      type:"get",
      data:{
        
      },
      success:res=>{
        alert(res);
      }
    })
  }
  PUTest(){
    this.http.request({
      url:"order/cancelorder",
      type:"put",
      data:{
        orderno:'201803212342412164691'
      },
      success:res=>{
        alert(res);
      }
    })
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
