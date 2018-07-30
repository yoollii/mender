import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DdChaoshiPage} from "../dd-chaoshi/dd-chaoshi";
declare var BMap; //declare var BMap: any;
import {MessageServiceProvider} from "../../providers/messageService/messageService";
/**
 * Generated class for the OrdermapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordermap',
  templateUrl: 'ordermap.html',
})
export class OrdermapPage {
  public item:boolean=false;
  public item1:boolean=false;
  @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,public srv: MessageServiceProvider) {
  }
  rankingList:boolean=false;
  order:boolean=false;
  income:boolean=false;
  ionViewWillEnter() {
    let map = new BMap.Map(this.mapElement.nativeElement, {enableMapClick: true});//创建地图实例
    map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom();//连续缩放效果，默认禁用
    let point = new BMap.Point(104.067923463,30.6799428454);//坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 12);//设置中心和地图显示级别
  }
  gochaoshi(){
    this.item1=true;
    this.item=false;
    this.navCtrl.push(DdChaoshiPage);
  }
  goyuyue(){
  	this.item=true;
  	this.item1=false;
  	this.srv.sendMessage(0);
  	this.navCtrl.parent.select(2);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdermapPage');
  }
}
