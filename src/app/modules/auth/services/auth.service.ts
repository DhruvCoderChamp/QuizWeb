import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any>(LocalstorageService.getUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/auth/sign-up", data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(BASIC_URL + "api/auth/login", data);
  }

  setAuthData(token: string, user: any) {
    LocalstorageService.saveToken(token);
    LocalstorageService.saveUser(user);
    this.currentUserSubject.next(user);
  }

  logout() {
    LocalstorageService.signout();
    this.currentUserSubject.next(null);
  }
}