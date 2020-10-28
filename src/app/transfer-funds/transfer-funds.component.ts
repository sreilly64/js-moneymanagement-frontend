import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/accounts/account.service';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss']
})
export class TransferFundsComponent implements OnInit {  
  transactionType: string = "withdraw";
  accountToTransferTo: number = 0;
  dollarAmount: string = null;
  amountIsValid: boolean = false;
  user: any = null;
  error: any = null;
  transactionHistory: any = null;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: any }) => {
      this.user = data.user;
    })
    this.accountService.errorMessage.subscribe(errorMessage => {
        this.error = errorMessage;
    })
    this.accountService.getTransactionHistory(sessionStorage.getItem('accountNumber'));
    this.accountService.transactionHistory.subscribe(transactions => {
      this.transactionHistory = transactions;
    })
    console.log(this.transactionHistory)
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

  generateBannerMessage(): string{
    let accountType = sessionStorage.getItem('accountType')
    let displayedType = accountType.charAt(0) + accountType.slice(1).toLowerCase();

    let message: string = `${displayedType} - Account #${sessionStorage.getItem('accountNumber')} - Balance: $${parseFloat(sessionStorage.getItem('accountBalance')).toFixed(2)}`
    return message;
  }

  logout(){
    sessionStorage.clear();
  }

  onKey(event: any){
    this.dollarAmount = event.target.value;
    this.validateAmount();
  }

  validateAmount(){
    const dollarAmountPattern = RegExp(/^\d+\.\d{2}$/);
    this.amountIsValid = dollarAmountPattern.test(this.dollarAmount)
  }

  updateTransactionType(type: string){
    this.transactionType = type;
  }

  updateAccountToTransferTo(accountNumber: number){
    this.accountToTransferTo = accountNumber;
  }

  onSubmit(){
    if(this.amountIsValid){
      if(this.transactionType === 'withdraw'){
        this.accountService.withdraw(this.dollarAmount);
      }else if(this.transactionType === 'deposit'){
        this.accountService.deposit(this.dollarAmount);
      }else{
        this.accountService.transfer(this.dollarAmount, this.accountToTransferTo);
      }
    } else {
      this.error = "Invalid dollar amount"
    }
  }

  clearError(){
    this.accountService.errorSubject.next(null);
  }

}
