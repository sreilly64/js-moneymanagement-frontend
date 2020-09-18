import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  url = 'http://localhost:8080/api'

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | any {
    const userId = sessionStorage.getItem('userId');
    const jwt = sessionStorage.getItem('jwt');
    const authHeader = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      })
    };

    if(userId && jwt){
      return this.http.get(`${this.url}/users/${userId}`, authHeader).pipe(
        map(res => {
          if(res['userId'] === Number(userId)) {
            console.log("returned true")
            return true;
          } else {
            console.log("get without error but returned false")
            this.router.navigateByUrl('');
            return false;
          }
        }),
        catchError((err) => {
          console.log(err.message)
          console.log("error, returned false")
          return of(false);
        })
      );
    } else {
      console.log("no jwt or userId, returned false")

      this.router.navigateByUrl('');
      return false;
    }
  }
}

 

