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

export class AccountService {
  url: any = 'http://localhost:8080/api/accounts';
  // accountSubject: any = new BehaviorSubject<any>(null);
  // accounts: any = this.accountSubject.asObservable();
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  withdraw(dollarAmount: string){
    const fromAccount = sessionStorage.getItem('accountNumber');
    const jwt = sessionStorage.getItem('jwt');
    const authHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      })
    };
    
    this.http.put(`${this.url}/${fromAccount}/update/-${dollarAmount}`, {}, authHeader).toPromise().then((res: any) => {
      if(res){
        this.errorSubject.next(null);
        this.router.navigateByUrl('/dashboard');
      }
    }).catch((err: HttpErrorResponse) => {
      this.errorSubject.next(err.error.message)
    });
  }

  deposit(dollarAmount: string){
    const fromAccount = sessionStorage.getItem('accountNumber');
    const jwt = sessionStorage.getItem('jwt');
    const authHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      })
    };
    
    this.http.put(`${this.url}/${fromAccount}/update/${dollarAmount}`, {}, authHeader).toPromise().then((res: any) => {
      if(res){
        this.errorSubject.next(null);
        this.router.navigateByUrl('/dashboard');
      }
    }).catch((err: HttpErrorResponse) => {
      this.errorSubject.next(err.error.message)
    });
  }

  transfer(dollarAmount: string, targetAccount: string){
    
  }

}
