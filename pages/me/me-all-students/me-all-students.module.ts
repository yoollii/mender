import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeAllStudentsPage } from './me-all-students';

@NgModule({
  declarations: [
    MeAllStudentsPage,
  ],
  imports: [
    IonicPageModule.forChild(MeAllStudentsPage),
  ],
})
export class MeAllStudentsPageModule {}
