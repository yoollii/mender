import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { OrderPage } from '../../../pages/order/order';
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
	workinfo:object;
	showinfo: boolean = false;
	showinfoe: boolean = false;
	menderNum: string;
	resons=[];
	reson:string;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private http: HttpServiceProvider,
		private toastCtrl:ToastController,
		private alertCtrl:AlertController
	) {
		
	}

	ionViewDidLoad() {
		this.transferReason();
	}
	searchInfo() {
		let worknum = this.menderNum.toString();
		if(worknum.length===7){
			this.http.request({
				url: "order/gettransferworker?worknum=" + this.menderNum,
				type: 'get',
				success: res => {
					if(res){
						this.workinfo = res;
						this.showinfo = true;
						this.showinfoe = false;
					}else {
						this.showinfo = false;
						this.showinfoe = true;
					}
				}
			})
		}
		
	}
	transferReason(){
		this.http.request({
			url: "order/transferorder",
			type: 'get',
			success: res => {
				res.forEach(item => {
					for (const key in item) {
						let _item = {
							id:key,
							reson:item[key],
						}
						this.resons.push(_item);
					}
					
				});
			}
		})	
	}
	
	sureTurn() {
		if(!this.showinfo){
			this.toast('请输入正确的技师工号');
			return false;
		}
		let flag = false;//判定有没有选择理由
		if(!this.reson){
			this.toast('请选择转单理由');
			return false;
		}
		const orderno = this.navParams.data['order']['orderno'];
		this.http.request({
			url: "order/confirmtransferorder",
			type: 'put',
			data:{
				orderno:orderno,
				worknum:this.menderNum,
				reason:this.reson
			},
			success: res => {
				this.showAlert(res);
			}
		})	
	}
	showAlert(msg) {
		const alert = this.alertCtrl.create({
		  title: '提示',
		  subTitle: msg,
		  buttons: [{
			  text:'确定',
			  handler:()=>{
				this.navCtrl.popTo(OrderPage)//返回这需要作处理
			  }
		  }],
		 

		});
		alert.present();
	  }
	private toast(message: string) {
		const toast = this.toastCtrl.create({
		  message: message,
		  position: 'middle', // “top”，“middle”，“bottom”。
		  duration: 3000
		});
		toast.present();
	  }
}
