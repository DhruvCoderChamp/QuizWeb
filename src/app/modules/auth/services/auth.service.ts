import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
const BASIC_URL ="http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  register(data): Observable<any>{
    return this.http.post(BASIC_URL + "api/auth/sign-up", data);
  }

 login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(BASIC_URL + "api/auth/login", data);
  }

   setUser(user: any) {
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

}
