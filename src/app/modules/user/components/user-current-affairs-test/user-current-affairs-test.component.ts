import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CurrentAffairsService, CurrentAffairs } from '../../../admin/current-affairs/current-affairs.service'; 

@Component({
  selector: 'app-user-current-affairs-test',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-current-affairs-test.component.html',
  styleUrls: ['./user-current-affairs-test.component.scss']
})
export class UserCurrentAffairsTestComponent implements OnInit {

  testData?: CurrentAffairs;
  loading = true;

  // Store user selections: key = question index, value = option index
  selectedAnswers: number[] = [];
  score: number | null = null;

  constructor(private route: ActivatedRoute, private service: CurrentAffairsService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        this.fetchTest(id);
      }
    });
  }

  fetchTest(id: number): void {
    this.service.getById(id).subscribe({
      next: (res : any) => {
        this.testData = res.data;
        this.selectedAnswers = new Array(res.data.questions.length).fill(-1); // no answer selected initially
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  selectAnswer(questionIndex: number, optionIndex: number): void {
    this.selectedAnswers[questionIndex] = optionIndex;
  }

  submitQuiz(): void {
  if (!this.testData) return;

  let correctCount = 0;
  this.testData.questions.forEach((q, index) => {
    if (this.selectedAnswers[index] === q.correctIndex) {
      correctCount++;
    }
  });

  this.score = correctCount;
}

}
