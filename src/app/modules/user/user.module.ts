import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatCardModule } from "@angular/material/card";
import { CategoryTestListComponent } from './components/category-test-list/category-test-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExamInterfaceComponent } from './components/exam-interface/exam-interface.component';
import { UserCurrentAffairsComponent } from './components/user-current-affairs/user-current-affairs.component';
import { UserCurrentAffairsTestComponent } from './components/user-current-affairs-test/user-current-affairs-test.component';
import { ResultPageComponent } from './components/result-page/result-page.component';

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
    ExamInterfaceComponent,
    UserCurrentAffairsComponent,
    UserCurrentAffairsTestComponent,
    ResultPageComponent,
    
]
})
export class UserModule { }
