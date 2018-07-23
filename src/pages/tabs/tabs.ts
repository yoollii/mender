import { Component } from '@angular/core';

import { MePage } from '../me/me';
import { OrderPage } from '../order/order';
import { OrdermapPage } from '../ordermap/ordermap';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OrdermapPage;
  tab3Root = OrderPage;
  tab4Root = MePage;

  constructor() {

  }
}
