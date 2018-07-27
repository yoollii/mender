import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }
  searchInfo(){
  	if(this.menderNum != null & this.menderNum != undefined){
  	setTimeout(()=>{
  		if(this.menderNum== 1234567890){
  			this.showinfo=true;
  			this.showinfoe=false;
  		}else{
  			this.showinfoe=true;
  			this.showinfo=false;
  		}
  	},100)
  	}else{
  		this.showinfoe=false;
  		this.showinfo=false;
  	}
  }
  sureTurn(){
  	console.log(this.reason2);
  	console.log(this.reason1);
  	console.log(this.menderNum);
  }
}
