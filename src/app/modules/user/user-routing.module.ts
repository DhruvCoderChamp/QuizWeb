import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryTestListComponent } from './components/category-test-list/category-test-list.component';
import { ExamInterfaceComponent } from './components/exam-interface/exam-interface.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  { path: 'category/:id', component: CategoryTestListComponent },
  { path: 'test/:testId', component: ExamInterfaceComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
