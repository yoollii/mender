import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Events } from 'ionic-angular';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {PageDataProvider} from "../../providers/page-data/page-data";
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { ShoppingCartPage } from './shopping-cart/shopping-cart';
import { ApplyPartsPage } from '../me/apply-parts/apply-parts';
/**
 * Generated class for the PartsMallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parts-mall',
  templateUrl: 'parts-mall.html',
})
export class PartsMallPage {
  navList = [];
  navIndex =0;
  products = [];
  haveData = true;
  buyProducts = {};
  orderno:string;
  count:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpServiceProvider,
              private pageData: PageDataProvider, private alertController: AlertController,
              private storage: StorageServiceProvider,private events:Events,
              private alertCtrl: AlertController) {
                this.orderno = this.navParams.data['order']['orderno'];
  }

  ionViewDidLoad() {
    this.pageData.refresh();
    this.getNavList();
  }
  ionViewDidEnter(){
    this.pageData.refresh();
    this.getCount();
   }
  getCount() {
    this.http.request({
      url: 'order/countworkerbackpack',
      data:{
        orderno:this.orderno
      },
      type: 'post',
      success: res => {
        this.count = res;
      }
    });
  }
  shoppingCar(){
    this.navCtrl.push(ShoppingCartPage,{
      orderno:this.orderno
    });
  }
  clickEvent(id:string,str: string) {
    for(let product of this.products) {
      if(id == product.partsid) {
        str == '-' ? product.buyNumber = product.buyNumber - 1 : product.buyNumber = product.buyNumber + 1;
        if(product.buyNumber < 0) {
          this.tipsAlert('最少需要申请一个配件');
          product.buyNumber = 0;
        }
        this.buyProducts[id] = product.buyNumber;
        if(this.buyProducts[id] == 0) {
          //delete this.buyProducts[id];
        }
        break;
      }
    }
  }
  tipsAlert(text: string) {
    const alert = this.alertController.create({
      cssClass: 'tips-alert',
      title: text
    })
    alert.present();
  }
  getProductList(id:number, operation?: any) {
    let flag = operation ? false : true;
    if(!this.pageData.more_data){
      return false;
    }
    this.http.request({
      url: 'order/partsinventorydetail',
      type: 'post',
      loading: flag,
      data : {classifyid: id, currentPage: this.pageData.next_page,orderno:this.orderno},
      success: res => {
        this.pageData.load(res);
        this.products = this.pageData.list;
        for(let product of this.products) {
          if(product['buyNumber']>0){
            this.buyProducts[product['partsid']]=product['buyNumber']
          }
        }
        this.haveData = this.pageData.more_data;
      },
      complete: res => {
        if(operation) {
          operation.complete();
        }
      }
    });
  }
  getNavList() {
    this.http.request({
      url: 'order/partsinventorymenu',
      type: 'get',
      success: res => {
        this.navList = res;
        this.getProductList(this.navList[0].classifyid);
      }
    });
  }
  navChange(index) {
    if (this.navIndex != index) {
      this.navIndex = index;
      const classifyid = this.navList[index]['classifyid'];
      this.pageData.refresh();
      this.getProductList(classifyid);
    }
  }
  goToApplyParts() {
    if(JSON.stringify(this.buyProducts) == '{}') {
      this.tipsAlert('您还未选择申请的配件');
      return;
    }
    let sendParam = '';
    for(let item in this.buyProducts) {
      sendParam += item + '|' + this.buyProducts[item] + ',';
    }
    // let sendParam1 = 'data:'+sendParam;
    this.http.request({
      url: 'order/applypartssubmit',
      type: 'put',
      data: {data:sendParam,orderno:this.orderno},
      success: res => {
       // this.storage.write('orderCode',res);
       this.events.publish("detail:change","1");//配件发生改变，通知详情页，重新刷新数据
        this.navCtrl.pop(); 
      }
    });
  }
  //下拉刷新
  doRefresh(refresher) {
    this.pageData.refresh();
    const classifyid = this.navList[this.navIndex]['classifyid'];
    this.getProductList(classifyid, refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      
      const classifyid = this.navList[this.navIndex]['classifyid'];
      this.getProductList(classifyid, infiniteScroll);
    }else{
     // infiniteScroll.enable(false);
      infiniteScroll.complete();
    }
  }
}
