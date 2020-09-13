import { Component, OnInit } from '@angular/core';
import { AccountPreviewComponent } from '../account-preview/account-preview.component';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = null;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginService.userSubject.subscribe(user => {
      this.user = user;
    });
  }

}
