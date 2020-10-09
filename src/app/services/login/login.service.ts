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
  url: any = 'http://localhost:8080/api';
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();
  userSubject: any = new BehaviorSubject<any>(null);
  user: any = this.userSubject.asObservable();
  notificationSubject: any = new BehaviorSubject<any>(null);
  notification: any = this.notificationSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(Username: string, Password: string): any {
    this.http.post(`${this.url}/authenticate`, { "username": Username, "password": Password }, httpOption).toPromise().then((res: any) => {
      if (res.jwt && res.userId) {
        sessionStorage.setItem('jwt', res.jwt);
        sessionStorage.setItem('userId', res.userId);
        this.errorSubject.next(null);
        this.userSubject.next(res);
        this.router.navigateByUrl('/dashboard');
      } 
    }).catch((err: HttpErrorResponse) => {
      this.errorSubject.next(err.error.message)
    });
  }

  getUser() {
    const userId = sessionStorage.getItem('userId');
    const jwt = sessionStorage.getItem('jwt');
    const authHeader = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      })
    };
    return this.http.get(`http://localhost:8080/api/users/${userId}/accounts`, authHeader);
  }

  register(FirstName: string, LastName: string, SSN: string, Email: string, PhoneNumber: string, Username: string, Password: string, Address: string) {
    this.http.post(`${this.url}/users`, { "firstName": FirstName, "lastName": LastName, "ssn": SSN, "email": Email, "phoneNumber": PhoneNumber, "username": Username, "password": Password, "address": Address}, httpOption).toPromise().then((res: any) => {
      if (res.jwt && res.userId) {
        sessionStorage.setItem('jwt', res.jwt);
        sessionStorage.setItem('userId', res.userId);
        this.errorSubject.next(null);
        this.router.navigateByUrl('/account-selection');
      } 
    }) .catch((err: HttpErrorResponse) => {
      this.errorSubject.next(err.error.message)
    });  
  }

  updatePassword(oldPassword: string, newPassword: string){
    const userId = sessionStorage.getItem('userId');
    const jwt = sessionStorage.getItem('jwt');
    const authHeader = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      })
    };
    this.http.put(`${this.url}/users/${userId}/password`, { "oldPassword": oldPassword, "newPassword": newPassword }, authHeader).toPromise().then((res: any) => {
      if(res && res.userId) {
        this.errorSubject.next(null);
        this.router.navigateByUrl('/dashboard');
        alert("Password successfully updated!")
      }
    }).catch((err: HttpErrorResponse) => {
      alert(`Update failed. ${err.error.message}`);
    });
  }

  updateUserDetails(firstName: string, lastName: string, email: string, phoneNumber: string, address: string){
    const userId = sessionStorage.getItem('userId');
    const jwt = sessionStorage.getItem('jwt');
    const authHeader = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      })
    };
    this.http.put(`${this.url}/users/${userId}`, {"firstName": firstName, "lastName": lastName, "email": email, "phoneNumber": phoneNumber, "address": address}, authHeader).toPromise().then((res: any) => {
      if (res && res.userId) {
        this.errorSubject.next(null);
        this.router.navigateByUrl('/dashboard');
        alert("Details successfully updated!")
      } 
    }).catch((err: HttpErrorResponse) => {
      alert(err.error.message);
    });
  }

}
