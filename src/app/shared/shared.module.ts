import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPageComponent } from './components/menu-page/menu-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MenuPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuPageComponent
  ]
})
export class SharedModule { }
