import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeopleInformationPage } from './people-information';

@NgModule({
  declarations: [
    PeopleInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(PeopleInformationPage),
  ],
})
export class PeopleInformationPageModule {}
