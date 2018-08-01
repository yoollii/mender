import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPartsPage } from './my-parts';

@NgModule({
  declarations: [
    MyPartsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPartsPage),
  ],
})
export class MyPartsPageModule {}
