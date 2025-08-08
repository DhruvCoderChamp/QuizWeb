import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GovJobDTO {
  id?: number;
  jobName: string;
  jobTitle: string;
  jobCount: number;
  eligibility: string[];
  lastDate: string; // ISO string date
}

@Injectable({
  providedIn: 'root'
})
export class GovJobService {
  private apiUrl = 'http://localhost:8080/api/govjobs'; // adjust URL as needed

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<GovJobDTO[]> {
    return this.http.get<GovJobDTO[]>(this.apiUrl);
  }
}
