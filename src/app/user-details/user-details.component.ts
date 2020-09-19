import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login/login.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: any = null;
  error: any = null;

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: any }) => {
      this.user = data.user;
    });
    this.loginService
      .errorMessage
      .subscribe(errorMessage => {
        this.error = errorMessage;
    });
  }

  logout(){
    sessionStorage.clear();
  }

  clearError(): void {
    this.loginService.errorSubject.next(null);
  }

}
