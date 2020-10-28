import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router'
import { AccountService } from '../services/accounts/account.service';


@Component({
  selector: 'app-account-preview',
  templateUrl: './account-preview.component.html',
  styleUrls: ['./account-preview.component.scss']
})

export class AccountPreviewComponent implements OnInit {
  @Input() user: any;

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    
  }

  setDecimalPlaceToTwo(amount: string): string{
    return parseFloat(amount).toFixed(2);
  }

  transfer(index: any){
    sessionStorage.setItem('accountNumber', this.user.accounts[index].accountNumber);
    sessionStorage.setItem('accountType', this.user.accounts[index].type);
    sessionStorage.setItem('accountBalance', this.user.accounts[index].balance);
    this.accountService.getTransactionHistory(this.user.accounts[index].accountNumber);
    this.router.navigateByUrl('/transfers');
  }

}
