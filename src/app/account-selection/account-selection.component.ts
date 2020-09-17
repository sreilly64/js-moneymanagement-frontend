import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-account-selection',
  templateUrl: './account-selection.component.html',
  styleUrls: ['./account-selection.component.scss']
})
export class AccountSelectionComponent implements OnInit {
  dollarInput: string = null;
  accountType: string = "CHECKING";
  amountIsValid: boolean = false;
  user: any = null;
  error = null; 

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: any }) => {
      this.user = data.user;
    })
  }

  updateAccountType(accountType: any) {
    this.accountType = accountType;
  }  

  validate(): void {
    const dollarPattern = RegExp(/^(([1-9]\d{0,2}(,\d{3})*)|0)?\.\d{2}$/);
    let amountEntered = parseFloat(this.dollarInput);
    if(this.accountType === "CHECKING") {
      this.amountIsValid = dollarPattern.test(this.dollarInput)&&amountEntered >= 5.00;
    } else{
      this.amountIsValid = dollarPattern.test(this.dollarInput)&&amountEntered >= 250.00;
    }
    
  }

  onKey(event: any) {
    this.dollarInput = event.target.value;
    this.validate();
  }

  onSubmit(): void {
    if (this.amountIsValid) {
      this.loginService.postAccount(this.dollarInput, this.accountType);
    } else {
      this.error = "Invalid dollar amount."
    }
  }

}
