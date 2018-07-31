import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {HttpModule, JsonpModule, Jsonp} from '@angular/http';
import { NgModel} from '@angular/forms';
import {HtpService} from './htp.service';
import 'zone.js';
import { AppComponent } from './app.component';
import { TemplateoneComponent } from './templateone/templateone.component';
import { TemplatesComponent } from './templates/templates.component';
import { HomeComponent } from './home/home.component';
import { TemplatetwoComponent } from './templatetwo/templatetwo.component';
import { TemplatethreeComponent } from './templatethree/templatethree.component';
import { TemplatefourComponent } from './templatefour/templatefour.component';
import { TemplatefiveComponent } from './templatefive/templatefive.component';
import { TemplatesixComponent } from './templatesix/templatesix.component';
import { TemplatesevenComponent } from './templateseven/templateseven.component';
import { TemplateeightComponent } from './templateeight/templateeight.component';
import { SheetComponent } from './sheet/sheet.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { SuccessComponent } from './success/success.component';
import { LandingComponent } from './landing/landing.component';

const appRoutes: Routes = [
  {
  path: 'templates',
  component: TemplatesComponent
  }

  ,
  {
    path: 'success',
    component: SuccessComponent
  }
  ,
  {
  path: 'templateone',
  component: TemplateoneComponent
  }
  ,

  {
  path: 'templatetwo',
  component: TemplatetwoComponent
  }
  ,

  {
  path: 'templatethree',
  component: TemplatethreeComponent
  }
  ,

  {
  path: 'templatefour',
  component: TemplatefourComponent
  }
  ,
{
  path: 'templatefive',
  component: TemplatefiveComponent
  }
  ,

  {
  path: 'templatesix',
  component: TemplatesixComponent
  }

  ,


  {
  path: 'templateseven',
  component: TemplatesevenComponent
  }
  ,

  {
  path: 'templateeight',
  component: TemplateeightComponent
  }

  ,


  {
  path: 'Home',
  component: HomeComponent
  }
  ,
  {
  path: '',
  component: LandingComponent
  }

  ,
  {
  path: 'Landing',
  component: LandingComponent
  }
  ,
  {
    path: 'sheet',
    component: SheetComponent
  }
  ,
  {
    path: '**',
    component: LandingComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    TemplateoneComponent,
    TemplatesComponent,
    HomeComponent,
    TemplatetwoComponent,
    TemplatethreeComponent,
    TemplatefourComponent,
    TemplatefiveComponent,
    TemplatesixComponent,
    TemplatesevenComponent,
    TemplateeightComponent,
    SheetComponent,
    SuccessComponent,
    LandingComponent
  ],
  imports: [
  RouterModule.forRoot(appRoutes),
    HttpModule,
    JsonpModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [HtpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
