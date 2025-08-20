import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-question-in-test',
  templateUrl: './add-question-in-test.component.html',
  styleUrls: ['./add-question-in-test.component.scss']
})
export class AddQuestionInTestComponent implements OnInit {

  questionForm!: FormGroup;
  testId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));

    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      optionA: ['', Validators.required],
      optionB: ['', Validators.required],
      optionC: ['', Validators.required],
      optionD: ['', Validators.required],
      correctOption: ['', Validators.required],
      explaination : ['', Validators.required]
    });
  }

  submitQuestion(): void {
    if (this.questionForm.valid) {
      const formData = this.questionForm.value;

      // ✅ Send as flat structure with testId
      const payload = {
        ...formData,
        testId: this.testId
      };

      this.adminService.addQuestionToTest(payload).subscribe({
        next: () => {
          this.snackBar.open('✅ Question added!', 'Close', { duration: 3000 });
          this.router.navigate(['/admin/dashboard']);
          this.questionForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('❌ Failed to add question.', 'Close', { duration: 3000 });
        }
      });
    }
  }
  

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }

}
