import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private returnUrl: string | null = null;
  router: any;

  login() {
    this.isAuthenticated = true;
    this.router.navigateByUrl(this.returnUrl || '/');
    this.returnUrl = null;
  }

  setReturnUrl(url: string): void {
    this.returnUrl = url;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}