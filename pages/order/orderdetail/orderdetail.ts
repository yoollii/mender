import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { PartsMallPage } from '../../parts-mall/parts-mall';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { OrdertransferPage } from '../../order/ordertransfer/ordertransfer';
import { CallNumber } from '@ionic-native/call-number';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';
import { Geolocation } from '@ionic-native/geolocation';
import { AppConfig } from '../../../app/app.config';
declare let startApp: any;
declare var BMap; //declare var BMap: any;
/**
 * Generated class for the OrderdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
})
export class OrderdetailPage {
  item = {};
  detail = {};
  platform = "";
  maps = [
    {
      and_schemeIntent: "com.autonavi.minimap",
      and_uri:'androidamap://',//安卓Uri
      ios_schemeIntent: "iosamap://*/*",
      name: '高德地图',
      isInstall: false,
      index: 1
    },
    {
      and_schemeIntent: "com.baidu.BaiduMap",
      and_uri:'androidamap://',
      ios_schemeIntent: "baidumap://*/*",
      name: '百度地图',
      isInstall: false,
      index: 2
    }];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpServiceProvider,
    private alertCtrl: AlertController,
    private callNumber: CallNumber,
    private device: Device,
    private appAvailability: AppAvailability,
    public actionSheetCtrl: ActionSheetController,
    public pl: Platform,
    private geolocation: Geolocation,
    private appConfig: AppConfig
  ) {
    let str = this.navParams.data['item'];
    this.item = JSON.parse(str);
    this.platform = this.device.platform;
    this.isMapInstall();
  }

  ionViewDidLoad() {
    this.orderDetail();
  }
  orderDetail() {
    this.http.request({
      url: 'order/orderdetail',
      data: {
        orderno: this.item['orderno'],
        Status: this.item['status']
      },
      success: res => {
        this.detail = res;
      }
    })
  }
  cancelOrder() {
    let me = this;
    this.confirmAlert(me, '确认要取消该订单?', this.cancelOrderRequest);
  }
  receiveOrder() {
    let me = this;
    this.confirmAlert(me, '确认要接手该订单?', this.receiveOrderRequest);
  }
  confirmOrder() {
    let me = this;
    this.confirmAlert(me, '需要确认该订单?', this.confirmOrderRequest);
  }
  finishOrder() {
    let me = this;
    this.confirmAlert(me, '确认结束该订单?', this.finishOrderRequest);
  }
  underPay() {
    let me = this;
    this.confirmAlert(me, '确认修改该订单的支付方式?', this.underPayRequest);
  }
  transferOrder() {
    this.navCtrl.push(OrdertransferPage, {
      order: this.item
    });
  }
  cancelOrderRequest(me) {
    me.http.request({
      url: 'order/cancelorder',
      type: 'put',
      loading_text: '取消中...',
      data: {
        orderno: me.item['orderno']
      },
      success: res => {
        me.showAlert('订单已取消');
      }
    })
  }
  receiveOrderRequest(me) {
    me.http.request({
      url: 'order/receiveorder',
      type: 'put',
      loading_text: '接手中...',
      data: {
        orderno: me.item['orderno']
      },
      success: res => {
        me.showAlert('已接手该订单');
      }
    })
  }
  finishOrderRequest(me) {
    me.http.request({
      url: 'order/endorder',
      type: 'put',
      loading_text: '结束中...',
      data: {
        orderno: me.item['orderno']
      },
      success: res => {
        me.showAlert('已结束该订单');
      }
    })
  }
  confirmOrderRequest(me) {
    me.http.request({
      url: 'order/confirmorder',
      type: 'put',
      loading_text: '确认中...',
      data: {
        orderno: me.item['orderno']
      },
      success: res => {
        me.showAlert('已确认该订单');
      }
    })
  }
  underPayRequest(me) {
    me.http.request({
      url: 'order/underpay',
      type: 'put',
      loading_text: '修改中...',
      data: {
        orderno: me.item['orderno'],
        paytype: '2'
      },
      success: res => {
        me.showAlert(res);
      }
    })
  }
  makeCallNumber() {
    const tel = this.detail['phone'];
    if (tel && this.callNumber.isCallSupported()) {
      this.callNumber.callNumber(tel, true).then(res => {
        console.log('拔打电话成功：',JSON.stringify(res))
      })
      .catch(error => {
        console.log('拔打电话失败：',JSON.stringify(error))
      })
    }
  }
  partsMall() {
    this.navCtrl.push(PartsMallPage);
  }
  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: '提示',
      subTitle: msg,
      buttons: ['确定']
    });
    alert.present();
  }
  confirmAlert(me, msg, confirmCallBack) {
    const confirm = this.alertCtrl.create({
      title: '提示',
      message: msg,
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确定',
          handler: () => {
            confirmCallBack(me)
          }
        }
      ]
    });
    confirm.present();
  }
  navigateMap() {
    let buttons = [];
    this.maps.forEach((item, index) => {
      if (item['isInstall']) {
        let button = {
          text: item['name'],
          handler: () => {
            this.startMapApp(item);
          }
        }
        buttons.push(button);
      }
    });
    if(buttons.length==0){
      this.showAlert('请安装百度地图或者高德地图以进行导航');
      return false;
    }
    let cancelButton = {
      text: '取消',
      role: "cancel",
      handler: () => {
        console.log('Cancel clicked');
      }
    }
    buttons.push(cancelButton);
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: buttons
    });
    actionSheet.present();
  }
  isMapInstall() {
    if (this.platform == "Android") {
      this.maps.forEach((item, index) => {
        this.appAvailability.check(item['and_schemeIntent']).then(
          (yes: boolean) => {
            item['isInstall'] = true
          },
          (no: boolean) => console.log(item['name'] + '未安装')
        );
      });
    } else if (this.platform == "Ios") {
      this.maps.forEach((item, index) => {
        this.appAvailability.check(item['ios_schemeIntent']).then(
          (yes: boolean) => {
            item['isInstall'] = true
          }
        );
      });
    }
  }
  startMapApp(item: object) {
    let sApp:any;
    console.log('坐标：'+this.detail['lon']+","+this.detail['lat'])
    if(this.platform=='Android'){
      if(item['index']=='1'){//高德地图
        sApp = startApp.set({  //跳转对应APP 
          "action": "ACTION_VIEW",
          　　　　"category": "CATEGORY_DEFAULT",
          　　　　"type": "text/css",
          　　　　"package": "com.autonavi.minimap",
          　　　　"uri": "androidamap://navi?sourceApplication=amap&poiname=&lat="+this.detail['lat']+"&lon="+this.detail['lon']+"&dev=1&style=2",   //我是选择路径规划然后导航的，当然你也可以直接用导航路径或者其他路径  
          　　　　"flags": ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
          　　　　"intentstart": "startActivity",
        }, { /* extras */
            "EXTRA_STREAM": "extraValue1",
            "extraKey2": "extraValue2"
          });
          sApp.start(function () { //跳转成功  
            console.log('地图跳转成功')
          }, function (error) { //失败 
            alert('地图打开失败,失败原因：'+JSON.stringify(error));
          });
      }else if(item['index']=='2'){//百度地图
        let ggPoint = new BMap.Point(this.detail['lon'],this.detail['lat']);
        let convertor = new BMap.Convertor();
        let pointArr = [];
        pointArr.push(ggPoint);
        let translateXY ={};
        convertor.translate(pointArr, 3, 5, res=>{
          
          translateXY['lat'] = res['points'][0]['lat']
          translateXY['lng'] = res['points'][0]['lng']
          console.log('转换后的坐标：'+JSON.stringify(translateXY));
          sApp = startApp.set({  //跳转对应APP 
            "action": "ACTION_VIEW",
            　　　　"category": "CATEGORY_DEFAULT",
            　　　　"type": "text/css",
            　　　　"package": "com.baidu.BaiduMap",
            　　　　"uri": "baidumap://map/navi?location="+translateXY['lat']+","+translateXY['lng']+"&src=andr.xiujian.api",
            　　　　"flags": ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
            　　　　"intentstart": "startActivity",
          }, { /* extras */
              "EXTRA_STREAM": "extraValue1",
              "extraKey2": "extraValue2"
            });
            sApp.start(function () { //跳转成功  
              console.log('地图跳转成功')
            }, function (error) { //失败 
              alert('地图打开失败,失败原因：'+JSON.stringify(error));
            });
        })
        
        
      }
    }else if(this.platform=='ios'){
      if(item['index']=='1'){//高德地图
        sApp = startApp.set("iosamap://navi?sourceApplication=applicationName&poiname=&poiid=BGVIS&lat="+this.detail['lat']+"&lon="+this.detail['lon']+"&dev=1&style=2");
          sApp.start(function () { //跳转成功  
            console.log('地图跳转成功')
          }, function (error) { //失败 
            alert('地图打开失败,失败原因：'+JSON.stringify(error));
          });
      }else if(item['index']=='2'){//百度地图
        let ggPoint = new BMap.Point(this.detail['lon'],this.detail['lat']);
        let convertor = new BMap.Convertor();
        let pointArr = [];
        pointArr.push(ggPoint);
        let translateXY ={};
        convertor.translate(pointArr, 3, 5, res=>{
          
          translateXY['lat'] = res['points'][0]['lat']
          translateXY['lng'] = res['points'][0]['lng']
          console.log('转换后的坐标：'+JSON.stringify(translateXY));
          sApp = startApp.set("baidumap://map/navi?location="+translateXY['lat']+","+translateXY['lng']+"&src=andr.xiujian.api");
          sApp.start(function () { //跳转成功  
            console.log('地图跳转成功')
          }, function (error) { //失败 
            alert('地图打开失败,失败原因：'+JSON.stringify(error));
          });
        })
       
      }
    }else{
      if(this.appConfig.debug){
        alert(this.platform+'未配置地图导航')
      }else{
        this.showAlert('暂不支持地图导航')
      }
    }
   
    

  }
}
