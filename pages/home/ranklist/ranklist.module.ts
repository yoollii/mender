import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RanklistPage } from './ranklist';

@NgModule({
  declarations: [
    RanklistPage,
  ],
  imports: [
    IonicPageModule.forChild(RanklistPage),
  ],
})
export class RanklistPageModule {}
