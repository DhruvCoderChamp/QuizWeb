import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { AddQuestionInTestComponent } from './components/add-question-in-test/add-question-in-test.component';
import { ViewTestComponent } from './components/view-test/view-test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { GovJobUpdateComponent } from './components/gov-job-update/gov-job-update.component';
import { CurrentAffairsComponent } from './current-affairs/current-affairs.component';
import { CurrentaffairsviewComponent } from './currentaffairsview/currentaffairsview.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'create-test', component: CreateTestComponent},
  {path:'latest-job', component: GovJobUpdateComponent},
  {path: 'current-affairs', component : CurrentAffairsComponent},
  {path: 'current-affairs-view', component : CurrentaffairsviewComponent},
  {path:'add-question/:id', component: AddQuestionInTestComponent},
  {path:'view-test/:id', component: ViewTestComponent},
  {path:'create-category', component: CreateCategoryComponent}

];  


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
