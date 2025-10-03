import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/enviornment';


const BASIC_URL = environment.apiUrl;
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
  private apiUrl = BASIC_URL + `/api/govjobs`; 

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<GovJobDTO[]> {
    return this.http.get<GovJobDTO[]>(this.apiUrl);
  }
}
