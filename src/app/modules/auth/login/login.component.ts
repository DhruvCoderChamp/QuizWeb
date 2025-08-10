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
        // ✅ Extract from res.data
        const data = res.data;

        const userData = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role
        };

        this.authService.setAuthData(data.token, userData);

        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });

        if (LocalstorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('/admin/dashboard');
        } else if (LocalstorageService.isUserLoggedIn()) {
          this.router.navigateByUrl('/user/dashboard');
        }
      },
      error: (err) => {
        const message = err?.error?.message || 'Login failed. Please check credentials.';
        this.snackBar.open(message, 'Close', { duration: 3000 });
      }
    });
  } else {
    this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
  }
}

}
