import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartsStreamPage } from './parts-stream';

@NgModule({
  declarations: [
    PartsStreamPage,
  ],
  imports: [
    IonicPageModule.forChild(PartsStreamPage),
  ],
})
export class PartsStreamPageModule {}
