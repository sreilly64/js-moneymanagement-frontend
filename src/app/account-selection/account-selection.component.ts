import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/accounts/account.service';


@Component({
  selector: 'app-account-selection',
  templateUrl: './account-selection.component.html',
  styleUrls: ['./account-selection.component.scss']
})
export class AccountSelectionComponent implements OnInit {
  dollarInput: string = null;
  accountType: string = "CHECKING";
  amountIsValid: boolean = false;
  hasNickname: boolean = false;
  nickname: string = null;
  nicknameIsValid: boolean = true;
  user: any = null;
  error = null; 

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: any }) => {
      this.user = data.user;
    })
    this.accountService
      .errorMessage
      .subscribe(errorMessage => {
        this.error = errorMessage;
    })
  }

  logout(){
    sessionStorage.clear();
  }

  updateNickname(input: any){
    if(input == "false"){
      this.hasNickname = false;
      this.nickname = null;
      this.nicknameIsValid = true;
    }else {
      this.hasNickname = true;
      this.nicknameIsValid = false;
    }
  }

  updateAccountType(accountType: any) {
    this.accountType = accountType;
  }  

  validateDollarAmount(): void {
    const dollarPattern = RegExp(/^\d+\.\d{2}$/);
    let amountEntered = parseFloat(this.dollarInput);
    if(this.accountType === "CHECKING") {
      this.amountIsValid = dollarPattern.test(this.dollarInput) && amountEntered >= 5.00;
    } else{
      this.amountIsValid = dollarPattern.test(this.dollarInput) && amountEntered >= 250.00;
    }
  }

  validateNickname(): void {
    const namePattern =  RegExp(/^[\w-.', ]*$/);
    this.nicknameIsValid = namePattern.test(this.nickname) && this.nickname.length > 0 && this.nickname.length < 25;
  }

  onKey(event: any, type: string) {
    if(type === "amount"){
      this.dollarInput = event.target.value;
      this.validateDollarAmount();
    }else if(type === "nickname"){
      this.nickname = event.target.value;
      this.validateNickname();
    }
  }

  onSubmit(): void {
    if (this.amountIsValid && this.nicknameIsValid) {
      this.accountService.postAccount(this.dollarInput, this.accountType, this.nickname);
    } else {
      if(!this.amountIsValid){
        this.error = "Invalid dollar amount."
      }else if(!this.nicknameIsValid){
        this.error = "Invalid nickname."
      }
      
    }
  }

  clearError(): void {
    this.accountService.errorSubject.next(null);
  }

}
