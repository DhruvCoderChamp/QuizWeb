import { Component, OnInit } from '@angular/core';
import { GovJobService, GovJobDTO } from './gov-job.service';

@Component({
  selector: 'app-gov-job',
  templateUrl: './gov-job.component.html',
  styleUrls: ['./gov-job.component.scss']
})
export class GovJobComponent implements OnInit {
  jobs: GovJobDTO[] = [];

  constructor(private govJobService: GovJobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.govJobService.getAllJobs().subscribe({
      next: (res : any) => {
        this.jobs = res.data;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
      }
    });
  }

  onJobTitleClick(job: GovJobDTO): void {
 
  window.location.href = 'https://ssc.gov.in/candidate-portal/one-time-registration/home-page';

  }
}
