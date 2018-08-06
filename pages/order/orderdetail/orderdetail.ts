import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PartsMallPage } from '../../parts-mall/parts-mall';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { OrdertransferPage } from '../../order/ordertransfer/ordertransfer';
import { CallNumber } from '@ionic-native/call-number';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpServiceProvider,
    private alertCtrl: AlertController,
    private callNumber:CallNumber
  ) {
    let str = this.navParams.data['item'];
    this.item = JSON.parse(str);
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
    this.confirmAlert(me,'确认要取消该订单?', this.cancelOrderRequest);
  }
  receiveOrder() {
    let me = this;
    this.confirmAlert(me,'确认要接手该订单?', this.receiveOrderRequest);
  }
  confirmOrder() {
    let me = this;
    this.confirmAlert(me,'需要确认该订单?', this.confirmOrderRequest);
  }
  finishOrder() {
    let me = this;
    this.confirmAlert(me,'确认结束该订单?', this.finishOrderRequest);
  }
  underPay() {
    let me = this;
    this.confirmAlert(me,'确认修改该订单的支付方式?', this.underPayRequest);
  }
  transferOrder(){
    this.navCtrl.push(OrdertransferPage);
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
  makeCallNumber(){
    const tel = this.detail['phone'];
    if(tel&&this.callNumber.isCallSupported()){
      this.callNumber.callNumber(tel,true).then(res=>{
     
      })
      .catch(error=>{
        
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
  confirmAlert(me,msg, confirmCallBack) {
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
}
