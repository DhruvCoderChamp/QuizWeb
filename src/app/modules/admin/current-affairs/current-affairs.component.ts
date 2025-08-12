import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentAffairsService, CurrentAffairs, Question } from './current-affairs.service'; // Adjust path as needed
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-current-affairs',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './current-affairs.component.html',
  styleUrls: ['./current-affairs.component.scss'],
})
export class CurrentAffairsComponent implements OnInit {
  quiz: CurrentAffairs = this.initializeEmptyQuiz();

  showForm = false;
  editMode = false;      // For question form add/edit mode
  editIndex: number | null = null;

  tempQuestion: Question = this.createEmptyQuestion();

  constructor(
    private currentAffairsService: CurrentAffairsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read 'id' from queryParams (e.g., /form?id=123)
    this.route.queryParamMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        if (!isNaN(id)) {
          this.loadQuiz(id);
        } else {
          alert('Invalid quiz ID.');
          this.resetForm();
        }
      } else {
        // No id → start new quiz
        this.resetForm();
      }
    });
  }

  initializeEmptyQuiz(): CurrentAffairs {
    return {
      date: '',
      title: '',
      duration: '',
      questionsCount: 0,
      totalMarks: 0,
      difficulty: '',
      questions: [],
    };
  }

  createEmptyQuestion(): Question {
    return {
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0,
    };
  }

  loadQuiz(id: number): void {
    this.currentAffairsService.getById(id).subscribe({
      next: (response : any ) => {
        this.quiz = response.data;
        this.editMode = false;  // question edit form off initially
        this.editIndex = null;
        this.showForm = false;  // question form hidden initially
      },
      error: (err) => {
        console.error('Failed to load quiz for editing:', err);
        alert('Failed to load quiz data for editing.');
        this.resetForm();
      },
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetTempQuestion();
      this.editMode = false;
      this.editIndex = null;
    }
  }

  canSave(): boolean {
    const q = this.tempQuestion;
    if (!q.text.trim()) return false;
    if (q.options.some((opt) => !opt.trim())) return false;
    if (
      q.correctIndex < 0 ||
      q.correctIndex >= q.options.length ||
      !q.options[q.correctIndex].trim()
    )
      return false;

    // When adding new question, respect quiz.questionsCount limit
    if (!this.editMode && this.quiz.questions.length >= this.quiz.questionsCount)
      return false;

    return true;
  }

  addQuestion(): void {
    if (!this.canSave()) {
      alert('Please fill all question fields correctly.');
      return;
    }

    this.quiz.questions.push({
      text: this.tempQuestion.text.trim(),
      options: this.tempQuestion.options.map((opt) => opt.trim()),
      correctIndex: this.tempQuestion.correctIndex,
    });

    this.resetTempQuestion();
    this.showForm = false;
  }

  startEditQuestion(index: number): void {
    const q = this.quiz.questions[index];
    this.tempQuestion = {
      text: q.text,
      options: [...q.options],
      correctIndex: q.correctIndex,
    };
    this.editIndex = index;
    this.editMode = true;
    this.showForm = true;
  }

  updateQuestion(): void {
    if (this.editIndex === null) return;
    if (!this.canSave()) {
      alert('Please fill all question fields correctly.');
      return;
    }

    this.quiz.questions[this.editIndex] = {
      text: this.tempQuestion.text.trim(),
      options: this.tempQuestion.options.map((opt) => opt.trim()),
      correctIndex: this.tempQuestion.correctIndex,
    };

    this.resetTempQuestion();
    this.editMode = false;
    this.editIndex = null;
    this.showForm = false;
  }

  deleteQuestion(index: number): void {
    if (index === this.editIndex) {
      this.resetTempQuestion();
      this.editMode = false;
      this.editIndex = null;
      this.showForm = false;
    }
    this.quiz.questions.splice(index, 1);
  }

  resetTempQuestion(): void {
    this.tempQuestion = this.createEmptyQuestion();
  }

  resetForm(): void {
    this.quiz = this.initializeEmptyQuiz();
    this.resetTempQuestion();
    this.editMode = false;
    this.editIndex = null;
    this.showForm = false;
  }

  canSubmit(): boolean {
    return (
      this.quiz.title.trim() !== '' &&
      this.quiz.date.trim() !== '' &&
      this.quiz.duration.trim() !== '' &&
      this.quiz.questionsCount > 0 &&
      this.quiz.totalMarks > 0 &&
      this.quiz.difficulty.trim() !== '' &&
      this.quiz.questions.length === this.quiz.questionsCount
    );
  }

  submitQuiz(): void {
    if (!this.canSubmit()) {
      alert('Please fill all the required quiz details and questions.');
      return;
    }

    if (this.quiz.id) {
      // Update existing quiz
      this.currentAffairsService.update(this.quiz.id, this.quiz).subscribe({
        next: () => {
          alert('Quiz updated successfully!');
          this.router.navigate(['admin/current-affairs-view']); // Redirect after update
        },
        error: (err) => {
          console.error('Error updating quiz:', err);
          alert('Failed to update quiz. Please try again.');
        },
      });
    } else {
      // Create new quiz
      this.currentAffairsService.create(this.quiz).subscribe({
        next: () => {
          alert('Quiz created successfully!');
          this.resetForm();
          this.router.navigate(['admin/current-affairs-view']); // Redirect after create if needed
        },
        error: (err) => {
          console.error('Error creating quiz:', err);
          alert('Failed to create quiz. Please try again.');
        },
      });
    }
  }

  // Function to redirect to this component with quiz id in query params (for editing)
  redirectToEdit(id: number): void {
    this.router.navigate(['/currentaffairs/form'], { queryParams: { id } });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
