import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";
import {PageDataProvider} from "../../../providers/page-data/page-data";
import { ApplyPartsPage } from '../apply-parts/apply-parts';

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
              private pageData: PageDataProvider, private alertController: AlertController) {
  }

  ionViewDidLoad() {
    this.getNavList();
    this.getProductList();
  }
  clickEvent(id:string,str: string) {
    for(let product of this.products) {
      if(id == product.partsid) {
        str == '-' ? product.buyNumber = product.buyNumber - 1 : product.buyNumber = product.buyNumber + 1;
        if(product.buyNumber < 0) {
          this.tipsAlert();
          product.buyNumber = 0;
        }
        this.buyProducts[id] = product.buyNumber;
        if(this.buyProducts[id] == 0) {
          delete this.buyProducts[id];
        }
      }
    }
  }
  tipsAlert() {
    const alert = this.alertController.create({
      cssClass: 'tips-alert',
      title: '至少需要申请1件配件'
    })
    alert.present();
  }
  getProductList(id:number = 1, operation?: any) {
    let flag = operation ? false : true;
    this.http.request({
      url: 'my/applypartsdetail',
      type: 'post',
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
      success: res => res.reduce((str, nav) => this.navList.push(nav.title), '')
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
    // this.navCtrl.push(ApplyPartsPage);
    let sendParam = '';
    for(let item in this.buyProducts) {
      sendParam += item + '|' + this.buyProducts[item] + ',';
    }
    // let sendParam1 = 'data:'+sendParam;
    console.log(sendParam);
    this.http.request({
      url: 'my/applypartssubmit',
      type: 'post',
      data: {data: sendParam},
      success: res => console.log(res)
    });
  }
  //下拉刷新
  doRefresh(refresher) {
    this.pageData.refresh();
    this.getProductList(this.navIndex, refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      this.getProductList(this.navIndex, infiniteScroll);
    }else{
      infiniteScroll.enable(false);
      infiniteScroll.complete();
    }
   
  }
}
