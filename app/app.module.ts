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
import { DayincomePage } from '../pages/home/dayincome/dayincome';
import { IncomedetailPage } from '../pages/home/incomedetail/incomedetail';
import { RanklistPage } from '../pages/home/ranklist/ranklist';
//订单
import { OrderdetailPage } from '../pages/order/orderdetail/orderdetail';
import { OrderacceptPage } from '../pages/order/orderaccept/orderaccept';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//个人信息
import { PeopleInformationPage } from '../pages/me-people-information/people-information';
//消息通知
import { MessageNoticePage } from '../pages/me-message-notice/message-notice';
import { PerformancePage } from '../pages/me-performance/performance';

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
    IncomedetailPage,
    PeopleInformationPage,
    MessageNoticePage,
    PerformancePage,
    OrderdetailPage,
    OrderacceptPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
    	iconMode: 'ios',
    	mode: 'ios',  //平台样式
    	backButtonText: '',//按钮内容
      backButtonIcon: 'myback',//按钮图标样式
      tabsHideOnSubPages: 'true' , //隐藏全部子页面tabs
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
    IncomedetailPage,
    PeopleInformationPage,
    MessageNoticePage,
    PerformancePage,
    OrderdetailPage,
    OrderacceptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
