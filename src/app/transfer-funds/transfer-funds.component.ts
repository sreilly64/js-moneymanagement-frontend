import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss']
})
export class TransferFundsComponent implements OnInit {
  transactionType: string = "withdraw";
  dollarAmount: string = null;
  amountIsValid: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userId');
  }

  onKey(event: any){
    this.dollarAmount = event.target.value;
    this.validateAmount();
  }

  validateAmount(){
    const dollarAmountPattern = RegExp(/^(([1-9]\d{0,2}(,\d{3})*)|0)?\.\d{2}$/);
    this.amountIsValid = dollarAmountPattern.test(this.dollarAmount)
  }

  updateTransactionType(type: string){
    this.transactionType = type;
  }

  onSubmit(){

  }

  clearError(){

  }

}
