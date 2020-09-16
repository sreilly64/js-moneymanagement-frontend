import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-selection',
  templateUrl: './account-selection.component.html',
  styleUrls: ['./account-selection.component.scss']
})
export class AccountSelectionComponent implements OnInit {
  dollarInput: string = null;
  
  amountIsValid: boolean = false; 

  constructor() { }

  ngOnInit(): void {
  }

  validate(): void {
    const dollarPattern = RegExp(/^(([1-9]\d{0,2}(,\d{3})*)|0)?\.\d{1,2}$/);
    this.amountIsValid = dollarPattern.test(this.dollarInput);
    console.log(this.amountIsValid);
  }


  onKey(event: any) {
    this.dollarInput = event.target.value;
    this.validate();
  }

}
