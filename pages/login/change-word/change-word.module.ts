import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeWordPage } from './change-word';

@NgModule({
  declarations: [
    ChangeWordPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeWordPage),
  ],
})
export class ChangeWordPageModule {}
