import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/accounts/account.service';

@Component({
  selector: 'app-accountsettings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  accountBalance: any = null;
  error = null;
  user: any = null;
  selection: string = '';
  withdrawOrTransfer: string = '';
  accountToTransferTo: number = 0;


  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: any}) => {
      this.user = data.user;
    })
    this.accountService
      .errorMessage
      .subscribe(errorMessage => {
        this.error = errorMessage;
      })
  }

  logout(): void {
    sessionStorage.clear();
  }

  clearError(): void {
    this.accountService.errorSubject.next(null);
  }

  listOfAcccounts(): any {
    let allAccounts: Array<any> = [];
    for(let i = 0; i < this.user.accounts.length; i++){
        allAccounts.push(this.user.accounts[i]);
    }
    return allAccounts;
  }

  updateSelection(selection: any) {
    this.selection = selection;
  }

  updateAccountBalance(accountBalance: any) {
    this.accountBalance = accountBalance;
  }

  listOfOtherAcccounts(): any{
    let currentAccount = sessionStorage.getItem('accountNumber');
    let otherAccounts: Array<any> = [];
    for(let i = 0; i < this.user.accounts.length; i++){
      if(this.user.accounts[i].accountNumber != currentAccount){
        otherAccounts.push(this.user.accounts[i]);
      }
    }
    return otherAccounts;
  }

  updateWithdrawOrTransfer(withdrawOrTransfer: any) {
    this.withdrawOrTransfer = withdrawOrTransfer;
  }

  updateAccountToTransferTo(accountNumber: number){
    this.accountToTransferTo = accountNumber;
  }


}
