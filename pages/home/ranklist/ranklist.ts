import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
/**
 * Generated class for the RanklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ranklist',
  templateUrl: 'ranklist.html',
})
export class RanklistPage {
  list;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http:HttpServiceProvider
  ) {
  }

  ionViewDidLoad() {
    this.rankList();
  }
  rankList(){
    this.http.request({
      url:'workerProfit/workermonthincometop',
      type:'get',
      success:res=>{
        this.list = res;
      }
    })
  }
}
