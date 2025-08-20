import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonDonutComponent } from 'src/app/globalservices/common-donut/common-donut.component';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
  standalone: true,
  imports: [CommonDonutComponent, FormsModule, CommonModule],
})
export class ResultPageComponent implements OnInit {
  donutSegments: number[] = [];
  donutColors: string[] = [];
  names: string[] = [];
  resultData: any = null;
  total: number = 0;

  // For marks calculation and display
  correctCount = 0;
  incorrectCount = 0;
  skippedCount = 0;
  userMarks = 0;
  questions: any[] = [];
testTitle: string = '';

  constructor(private testService : TestService) {
    
  }

  ngOnInit() {
    this.loadResult();
    this.loadAnswer();
  }
  loadAnswer() {
    const navState = window.history.state;
    let testId = navState.test;
    this.testService.getTestById(testId).subscribe((res: any) => {
  this.questions = res.data.questions.map(q => ({ ...q, expanded: false }));
  this.testTitle = res.data.testDTO.title;
});

  }

  // loadResult() {
  //   const navState = window.history.state;
  //   console.log('Passed state:', navState);

  //   if (navState && navState.result) {
  //     this.resultData = navState.result;
  //     console.log('Result Data:', this.resultData);

  //     if (this.resultData.data?.attempts) {
  //       const graphval = this.resultData.data.attempts;

  //       this.correctCount = graphval.filter(a => a.isCorrect === 'Yes').length;
  //       this.incorrectCount = graphval.filter(a => a.isCorrect === 'No').length;
  //       this.skippedCount = graphval.filter(a => a.isCorrect === 'Skipped').length;
  //       this.total = this.correctCount + this.incorrectCount + this.skippedCount;

  //       this.donutSegments = [this.correctCount, this.incorrectCount, this.skippedCount];
  //       this.donutColors = ['#4caf50', '#f44336', '#ffd600'];
  //       this.names = ['Correct', 'Incorrect', 'Skipped'];

  //       // Calculate user's obtained marks
  //       this.userMarks = (this.correctCount * 1) + (this.incorrectCount * -0.25);
  //     }
  //   }
  // }

  loadResult() {
    const navState = window.history.state;
    console.log('Passed state:', navState);

    if (navState && navState.result) {
      this.resultData = navState.result;
      console.log('Result Data:', this.resultData);

      if (this.resultData.data?.attempts) {
        const graphval = this.resultData.data.attempts;

        this.correctCount = graphval.filter(a => a.isCorrect === 'Yes').length;
        this.incorrectCount = graphval.filter(a => a.isCorrect === 'No').length;
        this.skippedCount = graphval.filter(a => a.isCorrect === 'Skipped').length;
        this.total = this.correctCount + this.incorrectCount + this.skippedCount;

        // Filter out zero values and their corresponding colors/names
        const allSegments = [this.correctCount, this.incorrectCount, this.skippedCount];
        const allColors = ['#4caf50', '#f44336', '#ffd600'];
        const allNames = ['Correct', 'Incorrect', 'Skipped'];

        // Only include non-zero segments
        this.donutSegments = [];
        this.donutColors = [];
        this.names = [];

        for (let i = 0; i < allSegments.length; i++) {
          if (allSegments[i] > 0) {
            this.donutSegments.push(allSegments[i]);
            this.donutColors.push(allColors[i]);
            this.names.push(allNames[i]);
          }
        }

        // Calculate user's obtained marks
        this.userMarks = (this.correctCount * 1) + (this.incorrectCount * -0.25);
      }
    }
  }

}
