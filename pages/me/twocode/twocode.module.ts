import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwocodePage } from './twocode';

@NgModule({
  declarations: [
    TwocodePage,
  ],
  imports: [
    IonicPageModule.forChild(TwocodePage),
  ],
})
export class TwocodePageModule {}
