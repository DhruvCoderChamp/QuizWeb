import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GovJobService, GovJobDTO} from './gov-job-service'

// Extend GovJobDTO with eligibilityString used only in the form UI
type GovJobForm = GovJobDTO & { eligibilityString: string };

@Component({
  selector: 'app-gov-job-update',
  templateUrl: './gov-job-update.component.html',
  styleUrls: ['./gov-job-update.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class GovJobUpdateComponent implements OnInit, AfterContentChecked {
  jobs: GovJobDTO[] = [];
  editing: boolean = false;
  formVisible: boolean = false;

  // This is the form model backing the Add/Edit form
  formJob: GovJobForm = this.createEmptyJob();

  constructor(private govJobService: GovJobService) {}

  ngOnInit() {
    this.loadJobs();
  }

  ngAfterContentChecked() {
    // Sync eligibility array to eligibilityString for input if not already set
    if (this.formJob && typeof this.formJob.eligibilityString !== 'string') {
      this.formJob.eligibilityString = this.eligibilityToString(this.formJob.eligibility);
    }
  }

  loadJobs() {
    this.govJobService.getAllJobs().subscribe(data => {
      this.jobs = data;
    });
  }

  startAdd() {
    this.editing = false;
    this.formJob = this.createEmptyJob();
  }

  startEdit(job: GovJobDTO) {
    this.editing = true;
    this.formJob = {
      ...job,
      eligibility: job.eligibility ? [...job.eligibility] : [],
      eligibilityString: this.eligibilityToString(job.eligibility),
    };
  }

  createJob() {
    this.formJob.eligibility = this.parseEligibility(this.formJob.eligibilityString);
    this.govJobService.createJob(this.formJob).subscribe(created => {
      this.jobs.push(created);
      this.startAdd();
    });
  }

  updateJob() {
    this.formJob.eligibility = this.parseEligibility(this.formJob.eligibilityString);
    if (this.formJob.id) {
      this.govJobService.updateJob(this.formJob.id, this.formJob).subscribe(() => {
        this.loadJobs();
        this.startAdd();
      });
    }
  }

  deleteJob(id: number) {
    this.govJobService.deleteJob(id).subscribe(() => {
      this.loadJobs();
      this.startAdd();
    });
  }

  // Converts comma-separated string to string array
  parseEligibility(input: string): string[] {
    return input
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0);
  }

  // Converts string array to comma-separated string
  eligibilityToString(list?: string[]): string {
    return list && list.length ? list.join(', ') : '';
  }
  showAddForm() {
  this.editing = false;
  this.formJob = this.createEmptyJob();
  this.formVisible = true;
}

showEditForm(job: GovJobDTO) {
  this.editing = true;
  this.formJob = {
    ...job,
    eligibility: job.eligibility ? [...job.eligibility] : [],
    eligibilityString: this.eligibilityToString(job.eligibility),
  };
  this.formVisible = true;
}

cancelForm() {
  this.formVisible = false;
  this.startAdd(); // clears formJob for next use
}
  createEmptyJob(): GovJobForm {
    return {
      jobName: '',
      jobTitle: '',
      jobLink: '',
      jobCount: 0,
      eligibility: [],
      eligibilityString: '',
      lastDate: '',
    };
  }

  // Called on input change of eligibility text input
  onEligibilityInput(value: string) {
    this.formJob.eligibilityString = value;
  }
}
