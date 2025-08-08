import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
 categoryForm!: FormGroup;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  createCategory(): void {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;

      this.adminService.createCategory(categoryData).subscribe({
        next: () => {
          this.successMessage = '✅ Category created successfully!';
          this.snackBar.open('✅ Category created!', 'Close', { duration: 3000 });
          this.categoryForm.reset();
          this.router.navigate(['/admin/dashboard']);

        },
        error: () => {
          this.snackBar.open('❌ Failed to create category', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
