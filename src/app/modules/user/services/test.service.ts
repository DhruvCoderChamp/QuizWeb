import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from 'src/assets/enviornment';


const BASIC_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAllTests(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/test');
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/test/categories');
  }
  getTestsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/test/category/${categoryId}/tests`);
  }

  getTestById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/test/${id}`);
  }
 
  saveTestResult(resultData: any): Observable<any> {
    debugger
    return this.http.post(`${BASIC_URL}api/testResults`, resultData);
  }
}
