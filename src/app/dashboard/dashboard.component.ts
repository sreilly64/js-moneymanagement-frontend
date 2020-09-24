import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/accounts/account.service';
import { AccountPreviewComponent } from './../account-preview/account-preview.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = null;
  notification: string = null;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: any }) => {
      this.user = data.user;
    })
    this.accountService
      .notification
      .subscribe(notification => {
        this.notification = notification;
    })
  }

  logout(){
    sessionStorage.clear();
  }

}
