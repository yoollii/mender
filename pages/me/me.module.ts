import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MePage } from './me';
import {PeopleInformationPage} from "../people-information/people-information";


@NgModule({
  declarations: [
    MePage
  ],
  imports: [
    IonicPageModule.forChild(MePage),
  ]
})
export class MePageModule {}
