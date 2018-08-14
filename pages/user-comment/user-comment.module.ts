import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCommentPage } from './user-comment';

@NgModule({
  declarations: [
    UserCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCommentPage),
  ],
})
export class UserCommentPageModule {}
