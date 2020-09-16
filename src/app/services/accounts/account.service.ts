import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': ''
  })
};

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  url: any = 'http://localhost:8080/api/accounts';
  accountSubject: any = new BehaviorSubject<any>(null);
  accounts: any = this.accountSubject.asObservable();
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  login() {
    const userId = sessionStorage.getItem('userId');
    const jwt = sessionStorage.getItem('jwt');
    const authHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      })
    };

    this.http.get(`${this.url}/user/${userId}`, authHeader).toPromise().then((res: any) => {
      if(res && res.length){
        this.accountSubject.next(res)
      }
    }).catch((err: HttpErrorResponse) => {
      this.errorSubject.next(err.error.message)
    });
  }

}
