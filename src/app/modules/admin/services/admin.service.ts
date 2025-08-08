import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  createTest(testDto): Observable<any>{
    return this.http.post(BASIC_URL + 'api/test/create-test', testDto);
  }

   getAllTests(): Observable<any>{
    return this.http.get(BASIC_URL + 'api/test');
  }


  addQuestionToTest(data: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/test/question', data);
  }

   getAllQuestions(id:number): Observable<any>{
  return this.http.get(`${BASIC_URL}api/test/${id}`);
  }

  getAllCategories(): Observable<any> {
  return this.http.get(`${BASIC_URL}api/test/categories`);
}

getTestsByCategory(categoryId: number): Observable<any> {
  return this.http.get(`${BASIC_URL}api/test/category/${categoryId}/tests`);
}

deleteTest(id: number): Observable<any> {
  return this.http.delete(`${BASIC_URL}api/test/${id}`);
}
createCategory(categoryData): Observable<any> {
    return this.http.post(BASIC_URL + 'api/test/category', categoryData);

}

}
