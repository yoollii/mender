import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelUpdatePage } from './tel-update';

@NgModule({
  declarations: [
    TelUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(TelUpdatePage),
  ],
})
export class TelUpdatePageModule {}
