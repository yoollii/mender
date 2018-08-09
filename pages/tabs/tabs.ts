import { Component,ViewChild } from '@angular/core';
 import { Tabs} from 'ionic-angular';
import { MePage } from '../me/me';
import { OrderPage } from '../order/order';
import { OrdermapPage } from '../ordermap/ordermap';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
@ViewChild('mytabs') tabRef:Tabs;
  tab1Root = HomePage;
  tab2Root = OrdermapPage;
  tab3Root = OrderPage;
  tab4Root = MePage;
  tabindex:any;
  constructor() { 


  }
  ionChanget(){ //根据_selectHistory看前一个tab页是哪一个
    
  	if(this.tabRef._selectHistory.length>2){
	     this.tabindex=this.tabRef._selectHistory[this.tabRef._selectHistory.length-2].split('-')[1];
  	}else{
  		 this.tabindex=this.tabRef._selectHistory[this.tabRef._selectHistory.length-1].split('-')[1];
  	}
  }
  
  
    
}
