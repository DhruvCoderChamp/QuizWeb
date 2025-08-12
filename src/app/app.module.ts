import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './modules/auth/home/home.component';
import { CreateTestComponent } from './modules/admin/components/create-test/create-test.component';
import { NewsComponent } from './live/news/news/news.component';
import { FormsModule } from '@angular/forms';
import { GovJobComponent } from './live/gov-job/gov-job.component';
import { JwtInterceptor } from './jwtinterceptor.interceptor';


const routes: Routes = [
    { path: 'register', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', loadChildren: ()=> import('./modules/user/user.module').then(m=>m.UserModule)},
   { path: 'admin', loadChildren: ()=> import('./modules/admin/admin.module').then(m=>m.AdminModule)},
    { path: '', component: HomeComponent }, 
    {path: 'news', component : NewsComponent}, 
    {path : 'govJob', component: GovJobComponent}



];

@NgModule({
  declarations: [AppComponent, SignupComponent, LoginComponent, HomeComponent, GovJobComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forRoot(routes), 
    FormsModule
  ],
  bootstrap: [AppComponent], 
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass : JwtInterceptor, 
      multi: true
    }
  ]
})
export class AppModule {}
