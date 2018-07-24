import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DayincomePage } from './dayincome';

@NgModule({
  declarations: [
    DayincomePage,
  ],
  imports: [
    IonicPageModule.forChild(DayincomePage),
  ],
})
export class DayincomePageModule {}
