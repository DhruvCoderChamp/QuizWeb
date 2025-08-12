import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  text: string;
  options: string[];
  correctIndex: number;
}

export interface CurrentAffairs {
  id?: number;
  title: string;
  date: string;      // yyyy-MM-dd format
  duration: string;
  questionsCount: number;
  totalMarks: number;
  difficulty: string;
  questions: Question[];
}

@Injectable({
  providedIn: 'root',
})
export class CurrentAffairsService {
  private apiUrl = 'http://localhost:8080/api/currentAffairs'; // Base URL, adjust if needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<CurrentAffairs[]> {
    return this.http.get<CurrentAffairs[]>(this.apiUrl);
  }

  getById(id: number): Observable<CurrentAffairs> {
    return this.http.get<CurrentAffairs>(`${this.apiUrl}/${id}`);
  }

  create(currentAffairs: CurrentAffairs): Observable<CurrentAffairs> {
    return this.http.post<CurrentAffairs>(this.apiUrl, currentAffairs);
  }

  update(id: number, currentAffairs: CurrentAffairs): Observable<CurrentAffairs> {
    return this.http.put<CurrentAffairs>(`${this.apiUrl}/${id}`, currentAffairs);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
