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
  account: any = null;
  error = null;
  user: any = null;
  selection: string = '';
  transactionType: string = '';
  accountToTransferTo: number = 0;
  newNickname: string = null;
  nicknameIsValid: boolean = this.validateNickname();


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

  onKey(event: any, type: string) {
    if(type === "nickname"){
      this.newNickname = event.target.value;
      this.validateNickname();
    }
  }

  validateNickname(): boolean {
    if(this.newNickname != null){
      const namePattern =  RegExp(/^[\w-.', ]*$/);
      this.nicknameIsValid = namePattern.test(this.newNickname) && this.newNickname.length > 0 && this.newNickname.length < 25;
      return this.nicknameIsValid;
    }else {
      return false;
    }
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
    this.account = this.user.accounts[index]
    this.newNickname = this.account.nickname;
    this.nicknameIsValid = this.validateNickname();
    console.log(this.account.accountNumber);
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
    if(this.selection == "delete"){
      this.deleteAccount();
    }else if (this.selection == "nickname"){
      this.setNickname();
    }else if (this.selection == "removeNickname"){
      this.removeNickname();
    }
  }

  removeNickname(){
    this.accountService.setNickname(this.account.accountNumber, "");
  }

  setNickname() {
    if(this.nicknameIsValid){
      this.accountService.setNickname(this.account.accountNumber, this.newNickname);
    }else {
      this.error = "Invalid nickname";
    }
  }

  deleteAccount() {
    if(this.account.balance === 0) {
      sessionStorage.setItem('notification', 'Your account was successfully deleted');  
      this.accountService.delete(sessionStorage.getItem('accountNumber'));  
    } else if(this.transactionType === 'transfer' && this.account.balance > 0){
      if(this.accountToTransferTo != 0) {
        this.accountService.transfer(this.account.balance, this.accountToTransferTo);
        this.accountService.delete(sessionStorage.getItem('accountNumber'));
      } else {
        this.error = "Please select an account to transfer to.";
      }
      
    } else if(this.transactionType === 'withdraw' && this.account.balance > 0){
      if(this.user.accounts.length > 1) {
        this.accountService.withdraw(this.account.balance);
        this.accountService.delete(sessionStorage.getItem('accountNumber'));
      } else {
        this.error = "You cannot delete your only account.";
      }
    } else if (this.account.balance < 0) {
      this.error = "Your balance is below $0.00, you cannot delete your account.";
    } 
  }
}
