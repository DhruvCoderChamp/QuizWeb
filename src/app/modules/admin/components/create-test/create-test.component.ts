import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  testForm!: FormGroup;
  successMessage: string = '';
  categories: any[] = [];
  difficulties: string[] = ['EASY', 'MEDIUM', 'HARD'];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.testForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      time: [30, [Validators.required, Validators.min(1)]],
      totalQuestions: [0, Validators.required],
      totalMarks: [0, Validators.required],
      difficulty: ['EASY', Validators.required],
      languages: [[], Validators.required], // now an array
      categoryId: ['', Validators.required]
    });

    this.adminService.getAllCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  onSubmit() {
    if (this.testForm.valid) {
      const formValue = this.testForm.value;

      const testData = {
        title: formValue.title,
        description: formValue.description,
        time: formValue.time,
        totalQuestions: formValue.totalQuestions,
        totalMarks: formValue.totalMarks,
        difficulty: formValue.difficulty,
        languages: formValue.languages,
        categoryId: formValue.categoryId
      };

      this.adminService.createTest(testData).subscribe({
        next: () => {
          this.snackBar.open('✅ Test created!', 'Close', { duration: 3000 });
          this.testForm.reset({
            time: 0,
            difficulty: 'EASY',
            languages: [],
            totalQuestions: 0,
            totalMarks: 0
          });
          this.router.navigate(['/admin/dashboard']);

        },
        error: () => {
          this.snackBar.open('❌ Failed to create test', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
