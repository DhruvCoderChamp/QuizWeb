import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CurrentAffairsService, CurrentAffairs } from '../../../admin/current-affairs/current-affairs.service'; // adjust path

@Component({
  selector: 'app-user-current-affairs',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-current-affairs.component.html',
  styleUrls: ['./user-current-affairs.component.scss']
})
export class UserCurrentAffairsComponent implements OnInit {
  
  latestTests: CurrentAffairs[] = [];
  loading = true;
  error: string | null = null;

  constructor(private currentAffairsService: CurrentAffairsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchLatestTests();
  }

  fetchLatestTests(): void {
    this.currentAffairsService.getAll().subscribe({
      next: (data) => {
        // Sort by date latest first
        this.latestTests = data.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load tests.';
        this.loading = false;
      }
    });
  }

  goToTest(testId: number): void {
    this.router.navigate(['/user/current-affair-test'], { queryParams: { id: testId } });
  }
}
