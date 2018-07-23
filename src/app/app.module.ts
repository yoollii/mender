import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
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
import { ProgressprogressComponent } from './home/progressprogress/progressprogress.component';
import { MentionComponent } from './home/mention/mention.component';
import { AntvComponent } from './home/antv/antv.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ButtonsComponent,
    TableComponent,
    FormComponent,
    CardsComponent,
    SimpleTableComponent,
    UploadComponent,
    PanelComponent,
    CarouselComponent,
    StepsComponent,
    ProgressComponent,
    ProgressprogressComponent,
    MentionComponent,
    AntvComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
