import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
//import {FormBuilder,FormGroup,Validators} from '@angular/forms';

/**
 * Generated class for the OrdertransferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordertransfer',
  templateUrl: 'ordertransfer.html',
})
export class OrdertransferPage {
  showinfo:boolean=false;
  showinfoe:boolean=false;
  menderNum:number;
  reason1:boolean=false;
  reason2:boolean=false;
  constructor(
	  public navCtrl: NavController, 
	  public navParams: NavParams,
	  private http:HttpServiceProvider
	) {
  }

  ionViewDidLoad() {

  }
  searchInfo(){
	this.http.request({
		url:"order/gettransferworker",
		type:'get',
		data:{
			worknum:this.menderNum
		},
		success:res=>{
			console.log(res)
		}
	})
  }
  
  sureTurn(){
  	console.log(this.reason2);
  	console.log(this.reason1);
  	console.log(this.menderNum);
  }
}
