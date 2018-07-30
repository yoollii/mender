import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule} from '@angular/forms';

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
import { OrdertransferPage } from '../pages/order/ordertransfer/ordertransfer';
//配件商城
import { PartsMallPage } from '../pages/parts-mall/parts-mall';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//个人信息
import { PeopleInformationPage } from '../pages/me-people-information/people-information';
import { TwocodePage } from '../pages/me/twocode/twocode';
//消息通知
import { MessageNoticePage } from '../pages/me-message-notice/message-notice';
import { PerformancePage } from '../pages/me-performance/performance';
import { TeachersPage } from '../pages/me/me-teachers/teachers';
import {TelUpdatePage} from "../pages/me-people-information/tel-update/tel-update";

import { DdChaoshiPage} from '../pages/dd-chaoshi/dd-chaoshi';
import {ComponentsModule} from '../components/components.module';
import {ShopChoosePage} from "../pages/me/shop-choose/shop-choose";
import {ReceiveRecordPage} from "../pages/me-receive-record/receive-record";
import { MeAllStudentsPage } from '../pages/me/me-all-students/me-all-students';


//import { QRCodeModule } from 'angular2-qrcode';//生成二维码
import { QRCodeModule } from 'angularx-qrcode';

import {MessageServiceProvider} from "../providers/messageService/messageService";
import { HttpModule }from '@angular/http';
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
    TeachersPage,
    OrderdetailPage,
    OrderacceptPage,
    TelUpdatePage,
    DdChaoshiPage,
    OrdertransferPage,
    ShopChoosePage,
    ReceiveRecordPage,
    MeAllStudentsPage,
    PartsMallPage,
    ReceiveRecordPage,
    TwocodePage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    FormsModule,
    QRCodeModule,
    HttpModule,
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
    TeachersPage,
    OrderdetailPage,
    OrderacceptPage,
    TelUpdatePage,
    DdChaoshiPage,
    OrdertransferPage,
    ShopChoosePage,
    ReceiveRecordPage,
    MeAllStudentsPage,
    PartsMallPage,
    ReceiveRecordPage,
    TwocodePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MessageServiceProvider
  ]
})
export class AppModule {}
