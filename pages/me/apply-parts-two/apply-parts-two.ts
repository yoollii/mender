import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";
import {PageDataProvider} from "../../../providers/page-data/page-data";
import { ApplyPartsPage } from '../apply-parts/apply-parts';
import { StorageServiceProvider } from '../../../providers/storage-service/storage-service';

/**
 * Generated class for the ApplyPartsTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-parts-two',
  templateUrl: 'apply-parts-two.html',
})
export class ApplyPartsTwoPage {
  navList = [];
  navIndex =0;
  products = [];
  haveData = true;
  buyProducts = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpServiceProvider,
              private pageData: PageDataProvider, private alertController: AlertController,
              private storage: StorageServiceProvider,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getNavList();
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
          delete this.buyProducts[id];
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
    this.http.request({
      url: 'my/applypartsdetail',
      type: 'post',
      loading: flag,
      data : {classifyid: id, currentPage: this.pageData.next_page},
      success: res => {
        this.pageData.load(res);
        this.products = this.pageData.list;
        for(let product of this.products) {
          product['buyNumber'] = 0;
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
      url: 'my/applypartsmenu',
      type: 'get',
      success: res => {
        this.navList = res;
        this.getProductList(this.navList[0].id);
      }
    });
  }
  navChange(index) {
    if (this.navIndex != index) {
      this.navIndex = index;
    }
    this.products.splice(0, this.products.length);
    this.getProductList(parseInt(index) + 1);
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
      url: 'my/applypartssubmit',
      type: 'post',
      data: {data:sendParam},
      success: res => {
        this.storage.write('orderCode',res);
        this.navCtrl.push(ApplyPartsPage); 
      }
    });
  }
  //下拉刷新
  doRefresh(refresher) {
    this.pageData.refresh();
    this.getProductList(this.navIndex+1, refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      this.getProductList(this.navIndex+1, infiniteScroll);
    }else{
      infiniteScroll.enable(false);
      infiniteScroll.complete();
    }
  }
}
