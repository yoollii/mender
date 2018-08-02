import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private storage:StorageServiceProvider
  ) {
    platform.ready().then(() => {
      const user= storage.read('user');
      if(user['token']){//判断用户token是否存在
        this.rootPage = TabsPage;
      }else{
        this.rootPage =LoginPage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
