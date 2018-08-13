import { Component } from '@angular/core';
import { Platform,LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { Network }  from '@ionic-native/network';
import { JPushService } from 'ionic2-jpush/dist';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  rootPage:any;
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private storage:StorageServiceProvider,
    private network:Network,
    private loadingCtrl:LoadingController,
    private jPushPlugin:JPushService
  ) {
    platform.ready().then(() => {
      const user= this.storage.read('user');
      if(user['token']){//判断用户token是否存在
        this.rootPage = TabsPage;
      }else{
        this.rootPage =LoginPage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkNetWork();
      this.init(user['id']);
     
    });
  }
 
  checkNetWork(){
    if(this.network.type=='unknown'||this.network.type=="none"){
       let loader = this.loadingCtrl.create({
         content:'当前网络不可用,请检查网络设置'
       })
       loader.present();
    }
  }
  init(alias) {
    const ctx =this;
    this.jPushPlugin.init()
    .then(res =>{
      console.log('jp_alias',alias);
      ctx.jPushPlugin.setAlias({sequence:0,alias:alias})
    })
    .catch(err => alert(err))
    }
}
