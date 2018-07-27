import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopChoosePage } from './shop-choose';

@NgModule({
  declarations: [
    ShopChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(ShopChoosePage),
  ],
})
export class ShopChoosePageModule {}
