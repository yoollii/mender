import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomedetailPage } from './incomedetail';

@NgModule({
  declarations: [
    IncomedetailPage,
  ],
  imports: [
    IonicPageModule.forChild(IncomedetailPage),
  ],
})
export class IncomedetailPageModule {}
