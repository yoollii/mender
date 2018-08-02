import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartsStockPage } from './parts-stock';

@NgModule({
  declarations: [
    PartsStockPage,
  ],
  imports: [
    IonicPageModule.forChild(PartsStockPage),
  ],
})
export class PartsStockPageModule {}
