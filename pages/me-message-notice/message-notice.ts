import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { PageDataProvider } from '../../providers/page-data/page-data';

/**
 * Generated class for the MessageNoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-notice',
  templateUrl: 'message-notice.html',
})
export class MessageNoticePage {

  messages = [];
  haveData = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpServiceProvider,
              private pageData: PageDataProvider) {
  }

  ionViewDidLoad() {
    this.getMessage();
  }

  getMessage(operation?:any) {
    let flag = operation?false:true;
    this.http.request({
      url: 'my/notification',
      type: 'post',
      loading: flag,
      data: {currentPage: this.pageData.next_page},
      success: res => {
        this.pageData.load(res);
        this.messages = this.pageData.list;
        this.haveData = this.pageData.more_data;
      },
      complete:res => {
        if(operation){
          operation.complete();
        }
      }
    });
  }
  //下拉刷新
  doRefresh(refresher) {
    this.pageData.refresh();
    this.getMessage(refresher);
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    if(this.haveData){
      this.getMessage(infiniteScroll);
    }else{
      infiniteScroll.enable(false);
      infiniteScroll.complete();
    }
  }
}
