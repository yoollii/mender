import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import {DdChaoshiPage} from "../dd-chaoshi/dd-chaoshi";
declare var BMap; //declare var BMap: any;
import {MessageServiceProvider} from "../../providers/messageService/messageService";
import { HttpServiceProvider } from '../../providers/http-service/http-service'
import { OrderdetailPage } from '../order/orderdetail/orderdetail';
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public srv: MessageServiceProvider,
    private http:HttpServiceProvider,
    private app:App
  ) {
  }
  todayCount:number=0;
  overCount:number=0;
  rankingList:boolean=false;
  order:boolean=false;
  income:boolean=false;
  map;
  ionViewWillEnter() {
    
    this.orderMapData();
  }
  attribute(e){
		var p = e.target;
		alert("marker的位置是" + p.getPosition().lng + "," + p.getPosition().lat);    
	}
  gochaoshi(){
    this.item1=true;
    this.item=false;
    this.navCtrl.push(DdChaoshiPage,{
      index:2
    });
  }
  goyuyue(){
  	this.item=true;
  	this.item1=false;
  	// this.srv.sendMessage(0);
    // this.navCtrl.parent.select(2);
    this.navCtrl.push(DdChaoshiPage,{
      index:1
    });
  }
  ionViewDidLoad() {
    this.map = new BMap.Map(this.mapElement.nativeElement, {enableMapClick: true});//创建地图实例
    this.map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
    this.map.enableContinuousZoom();//连续缩放效果，默认禁用
    let point = new BMap.Point(104.067923463,30.6799428454);//坐标可以通过百度地图坐标拾取器获取
    this.map.centerAndZoom(point, 12);//设置中心和地图显示级别
  }
  orderMapData(){
    this.http.request({
      url:'order/receiveordermap',
      type:'get',
      success:res=>{
        this.todayCount = res['todayCount'];
        this.overCount = res['overCount'];
        this.createOrderPoint(res['info']);
      }
    })
  }
  createOrderPoint(list:Array<object>){
    let myIcon = new BMap.Icon("../../assets/imgs/order_map_icon.png", new BMap.Size(40,40));
    list.forEach(item => {
      let ggPoint = new BMap.Point(item['lon'],item['lat']);
      let convertor = new BMap.Convertor();
      let pointArr = [];
      pointArr.push(ggPoint);
      let translateXY ={};
      convertor.translate(pointArr, 3, 5, res=>{
        translateXY['lat'] = res['points'][0]['lat']
        translateXY['lng'] = res['points'][0]['lng']
        console.log('转换后的坐标：'+JSON.stringify(translateXY));
        let pt = new BMap.Point(translateXY['lng'],translateXY['lat']);
        let marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
        this.map.addOverlay(marker); 
        marker.addEventListener("click",()=>{
          this.app.getRootNav().push(OrderdetailPage,{
            item:JSON.stringify(item)
          });
        });
      })
      
    });
  }
}
