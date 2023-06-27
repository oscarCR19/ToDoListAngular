import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404RoutingModule } from './error404-routing.module';
import { Error404PageComponent } from './components/error404-page.component';


@NgModule({
  declarations: [
    Error404PageComponent
  ],
  imports: [
    CommonModule,
    Error404RoutingModule
  ]
})
export class Error404Module { }
