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

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
  }

  initializeForm(): void {
    this.testForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      time: [30, [Validators.required, Validators.min(1)]],
      totalQuestions: [0, [Validators.required, Validators.min(1)]],
      totalMarks: [0, [Validators.required, Validators.min(1)]],
      difficulty: ['EASY', Validators.required],
      languages: [[], Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  loadCategories(): void {
    this.adminService.getAllCategories().subscribe({
      next: (res) => {
        console.log('res', res)
        this.categories = res.data;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        // this.snackBar.open('⚠️ Could not load categories', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.testForm.invalid) {
      this.testForm.markAllAsTouched();
      return;
    }

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

        // Reset form with defaults
        this.testForm.reset({
          title: '',
          description: '',
          time: 30,
          totalQuestions: 0,
          totalMarks: 0,
          difficulty: 'EASY',
          languages: [],
          categoryId: ''
        });

        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.error('Error creating test:', err);
        this.snackBar.open('❌ Failed to create test', 'Close', { duration: 3000 });
      }
    });
  }
}
