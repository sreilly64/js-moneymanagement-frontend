import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from './../services/accounts/account.service';

@Component({
  selector: 'app-account-preview',
  templateUrl: './account-preview.component.html',
  styleUrls: ['./account-preview.component.scss']
})
export class AccountPreviewComponent implements OnInit {
  @Input() user: any;

  accounts: any = null;

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.accountService
      .accounts
      .subscribe(accountsList => {
        this.accounts = accountsList;
      })
  }

}
