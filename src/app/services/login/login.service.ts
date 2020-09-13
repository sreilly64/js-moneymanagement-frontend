import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'

const httpOption = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: any = 'http://localhost:8080/api/authenticate';
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();
  userSubject: any = new BehaviorSubject<any>(null);
  user: any = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(Username: string, Password: string): any {
    this.http.post(this.url, { "username": Username, "password": Password }, httpOption).toPromise().then((res: any) => {
      if (res && res.jwt) {
        sessionStorage.setItem('jwt', res.jwt);
        this.errorSubject.next(null);
        this.getUserData(res.jwt);
        this.router.navigateByUrl('/dashboard');
      } 
    }) .catch((err: HttpErrorResponse) => {
      this.errorSubject.next(err.error.message)
    });
  }

  getUserData(jwt: string): void {
    httpOption.headers = httpOption.headers.set('Authorization', 'Bearer '.concat(jwt));
    this.http.get('http://localhost:8080/api/users/2', httpOption).toPromise().then((res: any) => {
      this.userSubject.next(res.username);
    })
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('jwt')) {
      return true;
    } else {
      return false;
    }
  }

}
