import { Component, OnInit } from '@angular/core';
import { GovJobService, GovJobDTO } from './gov-job.service';

@Component({
  selector: 'app-gov-job',
  templateUrl: './gov-job.component.html',
  styleUrls: ['./gov-job.component.scss']
})
export class GovJobComponent implements OnInit {
  jobs: GovJobDTO[] = [];
  jobLink: any;
  constructor(private govJobService: GovJobService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.govJobService.getAllJobs().subscribe({
      next: (res: any) => {
        this.jobs = res.data;
        this.jobLink = res.data.jobLink;
        console.log(this.jobs);
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
      }
    });
  }

  onJobTitleClick(job: any): void {
  if (job.jobLink) {
    let url = job.jobLink.trim();

    // If it doesn't start with http:// or https://, add https://
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    console.log('Opening:', url);
    window.open(url, '_blank');
  } else {
    alert('No job link available.');
  }
}


}
