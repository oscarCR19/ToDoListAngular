import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule} from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { HomepageModule } from './homepage/homepage.module';
import { RegisterModule } from './register/register.module';
import { SharedModule } from './shared/shared.module';
import { CalendarModule } from './calendar/calendar.module';
import { Error404Module } from './error404/error404.module';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LoginModule,
    HomepageModule,
    RegisterModule,
    SharedModule,
   HttpClientModule,
   CalendarModule,
   Error404Module
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
