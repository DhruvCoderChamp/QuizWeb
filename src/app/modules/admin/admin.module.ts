import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { AddQuestionInTestComponent } from './components/add-question-in-test/add-question-in-test.component';
import { ViewTestComponent } from './components/view-test/view-test.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { GovJobUpdateComponent } from './components/gov-job-update/gov-job-update.component';
import { CurrentAffairsComponent } from './current-affairs/current-affairs.component';
import { CurrentaffairsviewComponent } from './currentaffairsview/currentaffairsview.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateTestComponent,
    AddQuestionInTestComponent,
    ViewTestComponent,
    CreateCategoryComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatExpansionModule, 
    GovJobUpdateComponent, 
    CurrentAffairsComponent,
    CurrentaffairsviewComponent,
  ]
})
export class AdminModule { }
