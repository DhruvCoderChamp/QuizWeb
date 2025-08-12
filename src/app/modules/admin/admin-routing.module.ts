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
import { AdminGuard } from 'src/app/globalservices/auth/admin.guard';


const routes: Routes = [
  {path:'dashboard', component: DashboardComponent , canActivate: [AdminGuard]},
  {path:'create-test', component: CreateTestComponent , canActivate: [AdminGuard]},
  {path:'latest-job', component: GovJobUpdateComponent , canActivate: [AdminGuard]},
  {path: 'current-affairs', component : CurrentAffairsComponent , canActivate: [AdminGuard]},
  {path: 'current-affairs-view', component : CurrentaffairsviewComponent , canActivate: [AdminGuard]},
  {path:'add-question/:id', component: AddQuestionInTestComponent , canActivate: [AdminGuard]},
  {path:'view-test/:id', component: ViewTestComponent,  canActivate: [AdminGuard]},
  {path:'create-category', component: CreateCategoryComponent , canActivate: [AdminGuard]}

];  


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
