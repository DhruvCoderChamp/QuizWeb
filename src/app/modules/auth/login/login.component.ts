import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          // ✅ Save user to local storage
          LocalstorageService.saveUser(res);

          // ✅ Notify app of current user
          this.authService.setUser(res);

          // ✅ Success message
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          const user ={
            id: res.id,
            role: res.role
          }
          LocalstorageService.saveUser(user);
          if(LocalstorageService.isAdminLoggedIn()){
            this.router.navigateByUrl('admin/dashboard')
          }else if(LocalstorageService.isUserLoggedIn()){
            this.router.navigateByUrl('user/dashboard')
          }
          console.log(res);
        },
        error: () => {
          this.snackBar.open('Login failed. Please check credentials.', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
