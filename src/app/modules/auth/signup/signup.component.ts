import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 submitForm() {
  if (this.validateForm.valid) {
    this.authService.register(this.validateForm.value).subscribe(
      (res) => {
        this.snackBar.open('Registered successfully!', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/login']); // Navigate to login page
      },
      (error) => {
        this.snackBar.open(
          error?.error?.message || 'Registration failed. Try again.',
          'Close',
          {
            duration: 3000
          }
        );
      }
    );
  } else {
    this.snackBar.open('Please fill out the form correctly.', 'Close', {
      duration: 3000
    });
  }
}

}
