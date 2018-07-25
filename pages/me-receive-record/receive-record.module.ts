import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiveRecordPage } from './receive-record';

@NgModule({
  declarations: [
    ReceiveRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiveRecordPage),
  ],
})
export class ReceiveRecordPageModule {}
