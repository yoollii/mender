import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ButtonsComponent } from './home/buttons/buttons.component';
import { TableComponent } from './home/table/table.component';
import { FormComponent } from './home/form/form.component';
import { CardsComponent } from './home/cards/cards.component';
import { SimpleTableComponent } from './home/simple-table/simple-table.component';
import { UploadComponent } from './home/upload/upload.component';
import { PanelComponent } from './home/panel/panel.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { StepsComponent } from './home/steps/steps.component';
import { ProgressComponent } from './home/progress/progress.component';
import { MentionComponent } from './home/mention/mention.component';
import { AntvComponent } from './home/antv/antv.component';

const routes:Routes=[
{path:"",redirectTo:"login",pathMatch:"full"},
{path:"login",component:LoginComponent},
{path:"home",component:HomeComponent,
	children:[
	{path:'',component:ButtonsComponent},
	{path:"buttons",component:ButtonsComponent},
	{path:"table",component:TableComponent},
	{path:"form",component:FormComponent},
	{path:"card",component:CardsComponent},
	{path:"simple-table",component:SimpleTableComponent},
	{path:"upload",component:UploadComponent},
	{path:"panel",component:PanelComponent},
	{path:"carousel",component:CarouselComponent},
	{path:"steps",component:StepsComponent},
	{path:"progress",component:ProgressComponent},
	{path:"mention",component:MentionComponent},
	{path:"antv",component:AntvComponent}
	]
}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
