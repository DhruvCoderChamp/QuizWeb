import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    
    // Read user from sessionStorage (update to your storage method if different)
    const userJson = sessionStorage.getItem('auth_user');
    const user = userJson ? JSON.parse(userJson) : null;

    // Check if logged in and is admin
    if (user && user.role === 'ADMIN') {
      return true; // allow to proceed
    }

    // Not admin (or not logged in): redirect to login page
    return this.router.parseUrl('/login');
  }
}
