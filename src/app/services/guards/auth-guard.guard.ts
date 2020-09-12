import { Injectable } from '@angular/core';
//import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private login: LoginService,
    private router: Router
  ) { }
  
  canActivate(): boolean {
    if (!this.login.isAuthenticated()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
   
}

 

