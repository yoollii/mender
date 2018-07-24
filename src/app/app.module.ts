import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { OrderPage } from '../pages/order/order';
import { OrdermapPage } from '../pages/ordermap/ordermap';
import { MePage } from '../pages/me/me';
import { TabsPage } from '../pages/tabs/tabs';
//首页
import { HomePage } from '../pages/home/home';
import { DayincomePage } from '../pages/dayincome/dayincome';
import { IncomedetailPage } from '../pages/incomedetail/incomedetail';
import { RanklistPage } from '../pages/ranklist/ranklist';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MePage,
    OrdermapPage,
    OrderPage,
    HomePage,
    TabsPage,
    DayincomePage,
    RanklistPage,
    IncomedetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
    	backButtonText: '',//按钮内容
      backButtonIcon: 'myback',//按钮图标样式
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MePage,
    OrdermapPage,
    OrderPage,
    HomePage,
    TabsPage,
    DayincomePage,
    RanklistPage,
    IncomedetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
