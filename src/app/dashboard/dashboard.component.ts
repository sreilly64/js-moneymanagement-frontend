import { Component, OnInit } from '@angular/core';
import { AccountPreviewComponent } from '../account-preview/account-preview.component';
import { ActivatedRoute } from '@angular/router';
//import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = null;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: {user: any }) => {
      this.user = data.user;
    })
  }

}
