import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatCardModule } from "@angular/material/card";
import { CategoryTestListComponent } from './components/category-test-list/category-test-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExamInterfaceComponent } from './components/exam-interface/exam-interface.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CategoryTestListComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ExamInterfaceComponent
]
})
export class UserModule { }
