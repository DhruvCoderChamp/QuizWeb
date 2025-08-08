import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrentAffairsService, CurrentAffairs, Question } from './current-affairs.service'; // adjust path
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-current-affairs',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './current-affairs.component.html',
  styleUrls: ['./current-affairs.component.scss'],
})
export class CurrentAffairsComponent {
  quiz: CurrentAffairs = {
    date: '',
    title: '',
    duration: '',
    questionsCount: 0,
    totalMarks: 0,
    difficulty: '',
    questions: [],
  };

  showForm = false;
  editMode = false;
  editIndex: number | null = null;

  tempQuestion: Question = this.createEmptyQuestion();

  constructor(private currentAffairsService: CurrentAffairsService) {}

  createEmptyQuestion(): Question {
    return {
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0,
    };
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  canSave(): boolean {
    const q = this.tempQuestion;
    if (!q.text.trim()) return false;
    if (q.options.some(opt => !opt.trim())) return false;
    if (
      q.correctIndex < 0 ||
      q.correctIndex >= q.options.length ||
      !q.options[q.correctIndex].trim()
    )
      return false;

    if (!this.editMode && this.quiz.questions.length >= this.quiz.questionsCount)
      return false;

    return true;
  }

  addQuestion(): void {
    if (!this.canSave()) return;

    this.quiz.questions.push({
      text: this.tempQuestion.text.trim(),
      options: this.tempQuestion.options.map(opt => opt.trim()),
      correctIndex: this.tempQuestion.correctIndex,
    });

    this.resetForm();
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
    if (this.editIndex === null || !this.canSave()) return;

    this.quiz.questions[this.editIndex] = {
      text: this.tempQuestion.text.trim(),
      options: this.tempQuestion.options.map(opt => opt.trim()),
      correctIndex: this.tempQuestion.correctIndex,
    };

    this.resetForm();
    this.editMode = false;
    this.editIndex = null;
    this.showForm = false;
  }

  deleteQuestion(index: number): void {
    if (index === this.editIndex) {
      this.resetForm();
      this.editMode = false;
      this.editIndex = null;
      this.showForm = false;
    }
    this.quiz.questions.splice(index, 1);
  }

  resetForm(): void {
    this.tempQuestion = this.createEmptyQuestion();
    this.editMode = false;
    this.editIndex = null;
  }

  canSubmit(): boolean {
    return (
      this.quiz.title.trim() &&
      this.quiz.date &&
      this.quiz.duration.trim() &&
      this.quiz.questionsCount > 0 &&
      this.quiz.totalMarks > 0 &&
      this.quiz.difficulty &&
      this.quiz.questions.length === this.quiz.questionsCount
    );
  }

  submitQuiz(): void {
    if (!this.canSubmit()) {
      alert('Please fill all the required quiz details and questions.');
      return;
    }

    this.currentAffairsService.create(this.quiz).subscribe({
      next: (res) => {
        console.log('Quiz submitted successfully:', res);
        alert('Quiz submitted successfully!');
        this.resetForm();
        this.quiz = {
          date: '',
          title: '',
          duration: '',
          questionsCount: 0,
          totalMarks: 0,
          difficulty: '',
          questions: [],
        };
      },
      error: (err) => {
        console.error('Error submitting quiz:', err);
        alert('Failed to submit quiz. Please try again.');
      },
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
