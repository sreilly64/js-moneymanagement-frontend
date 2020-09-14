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

  constructor(
    private http: HttpClient,
  ) { }

  
}
