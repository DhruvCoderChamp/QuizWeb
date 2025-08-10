import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private static TOKEN_KEY = 'auth_token';
  private static USER_KEY = 'auth_user';

  constructor() { }

  // ===== TOKEN =====
  static saveTokenFromResponse(response: any): void {
    if (response && response.data && response.data.token) {
      sessionStorage.setItem(this.TOKEN_KEY, response.data.token);
    }
  }

  static saveToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  static clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  // ===== USER =====
  static saveUserFromResponse(response: any): void {
    if (response && response.data) {
      const { token, ...userData } = response.data; // remove token from user object
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(userData));
    }
  }

  static saveUser(user: any): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static getUser(): any {
    const user = sessionStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static clearUser(): void {
    sessionStorage.removeItem(this.USER_KEY);
  }

  // ===== USER HELPERS =====
  static getUserId(): string {
    const user = this.getUser();
    return user?.id || '';
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user?.role || '';
  }

  static isAdminLoggedIn(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  static isUserLoggedIn(): boolean {
    return this.getUserRole() === 'USER';
  }

  // ===== CLEAR ALL =====
  static signout(): void {
    this.clearToken();
    this.clearUser();
  }
}