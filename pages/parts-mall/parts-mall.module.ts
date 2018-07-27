import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartsMallPage } from './parts-mall';

@NgModule({
  declarations: [
    PartsMallPage,
  ],
  imports: [
    IonicPageModule.forChild(PartsMallPage),
  ],
})
export class PartsMallPageModule {}
