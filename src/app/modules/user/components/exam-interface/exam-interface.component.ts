import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-interface',
  templateUrl: './exam-interface.component.html',
  styleUrls: ['./exam-interface.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ExamInterfaceComponent {
  // Stepper: 1-general instr, 2-test instr+agreement, 3-test
  showInstructionsStep: number = 1;
  agreeToRules: boolean = false;
  selectedLanguage: string = 'English';

  testId!: number;
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswers: any = {};
  showResults: boolean = false;
  timer: number = 0;
  interval: any;
  testTitle: string = '';
 

  isGridView = true;  // default view mode

  languages = [
    'English','Hindi','Telugu','Marathi','Bengali','Gujarati',
    'Kannada','Tamil','Oriya','Malayalam'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {}

  // Only run when test starts
  startTest(): void {
    this.showInstructionsStep = 3;
    // Read testId now, as route is valid
    this.testId = Number(this.route.snapshot.paramMap.get('testId'));
    this.enterFullScreen();
    this.loadTest();
    this.requestCameraAccess();
    this.requestCameraAndMicAccess();
  }

  toggleView() {
    this.isGridView = !this.isGridView;
  }

  loadTest(): void {
    this.testService.getTestById(this.testId).subscribe((res) => {
      this.questions = res.questions;
      this.testTitle = res.testDTO.title;
      this.timer = res.testDTO.time * 60;
      this.startTimer();
    });
  }

  requestCameraAccess(): void {
    navigator.mediaDevices?.getUserMedia({ video: true })
      .then(stream => {
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(err => {
        alert('Please allow camera access for secure testing.');
      });
  }

  requestCameraAndMicAccess(): void {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(err => {
        alert('Camera & Microphone access is required to take the test. Please allow permission.');
      });
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
        this.submitTest();
      }
    }, 1000);
  }

  selectOption(qIndex: number, option: string): void {
    this.selectedAnswers[qIndex] = option;
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  next(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previous(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  jumpToUnanswered(): void {
    const index = this.questions.findIndex((_, i) => !this.selectedAnswers[i]);
    if (index !== -1) this.currentQuestionIndex = index;
  }

  getUnansweredCount(): number {
    return this.questions.filter((_, i) => !this.selectedAnswers[i]).length;
  }

  submitTest(): void {
    const confirmSubmit = confirm(
      'Are you sure you want to submit the test? You won’t be able to change your answers.'
    );
    if (!confirmSubmit) return;

    this.showResults = true;
    clearInterval(this.interval);

    const resultData = this.questions.map((q, index) => ({
      questionText: q.questionText,
      selectedOption: this.selectedAnswers[index] || null,
      correctOption: q.correctOption,
      isCorrect: this.selectedAnswers[index] === q.correctOption,
    }));

    this.router.navigate(['/user/progress', this.testId], {
      state: { resultData, testTitle: this.testTitle },
    });
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: any): void {
    event.returnValue = 'Are you sure you want to leave the test? Your progress will be lost.';
  }

  canDeactivate(): boolean {
    return confirm('Are you sure you want to leave the quiz? Your progress will be lost.');
  }

  enterFullScreen(): void {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => {
        console.warn(`Failed to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen();
    }
  }
}
