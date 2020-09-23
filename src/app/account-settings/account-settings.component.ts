import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/accounts/account.service';
import { identifierModuleUrl } from '@angular/compiler';

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
  transactionType: string = '';
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

  updateSelection(selection: any) {
    this.selection = selection;
  }

  updateCurrentAccount(index: any) {
    this.accountBalance = this.user.accounts[index].balance;
    sessionStorage.setItem('accountNumber', this.user.accounts[index].accountNumber);
  }

  listOfOtherAcccounts(): any {
    let currentAccount = sessionStorage.getItem('accountNumber');
    let otherAccounts: Array<any> = [];
    for(let i = 0; i < this.user.accounts.length; i++){
      if(this.user.accounts[i].accountNumber != currentAccount){
        otherAccounts.push(this.user.accounts[i]);
      }
    }
    return otherAccounts;
  }

  updateTransactionType(transactionType: any) {
    this.transactionType = transactionType;
  }

  updateAccountToTransferTo(accountNumber: number){
    this.accountToTransferTo = accountNumber;
  }

  onSubmit() {
    if(this.accountBalance === 0) {
      sessionStorage.setItem('notification', 'Your account was successfully deleted');  
      this.accountService.delete(sessionStorage.getItem('accountNumber'));  
    } else if(this.transactionType === 'transfer' && this.accountToTransferTo != null && this.accountBalance > 0){
      this.accountService.transfer(this.accountBalance, this.accountToTransferTo);
      this.accountService.delete(sessionStorage.getItem('accountNumber'));
    } else if(this.transactionType === 'withdraw' && this.accountBalance > 0){
      if(this.user.accounts.length > 1) {
        this.accountService.withdraw(this.accountBalance);
        this.accountService.delete(sessionStorage.getItem('accountNumber'));
      } else {
        this.error = "You cannot delete your only account.";
      }
      
    } else if (this.accountBalance < 0) {
      this.error = "Your balance is below $0.00, you cannot delete your account.";
    } 
  }
}
