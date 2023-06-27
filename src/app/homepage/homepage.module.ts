import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatListModule,
    FormsModule,
    MatTableModule
  
    
  ]
})
export class HomepageModule { }
