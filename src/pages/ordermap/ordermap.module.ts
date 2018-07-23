import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdermapPage } from './ordermap';

@NgModule({
  declarations: [
    OrdermapPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdermapPage),
  ],
})
export class OrdermapPageModule {}
