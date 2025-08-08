import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GovJobDTO {
  id?: number;
  jobName: string;
  jobTitle: string;
  jobLink: string;
  jobCount: number;
  eligibility: string[];
  lastDate: string; // ISO string (e.g., '2025-08-10')
}

@Injectable({
  providedIn: 'root'
})
export class GovJobService {
  private apiUrl = 'http://localhost:8080/api/govjobs'; // Adjust if port/path differs

  constructor(private http: HttpClient) { }

  // Get all jobs
  getAllJobs(): Observable<GovJobDTO[]> {
    return this.http.get<GovJobDTO[]>(this.apiUrl);
  }

  // Get job by id
  getJobById(id: number): Observable<GovJobDTO> {
    return this.http.get<GovJobDTO>(`${this.apiUrl}/${id}`);
  }

  // Create job
  createJob(job: GovJobDTO): Observable<GovJobDTO> {
    return this.http.post<GovJobDTO>(this.apiUrl, job);
  }

  // Update job
  updateJob(id: number, job: GovJobDTO): Observable<GovJobDTO> {
    return this.http.put<GovJobDTO>(`${this.apiUrl}/${id}`, job);
  }

  // Delete job
  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
