import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router'


@Component({
  selector: 'app-account-preview',
  templateUrl: './account-preview.component.html',
  styleUrls: ['./account-preview.component.scss']
})

export class AccountPreviewComponent implements OnInit {
  @Input() user: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    
  }

  setDecimalPlaceToTwo(amount: string): string{
    return parseFloat(amount).toFixed(2);
  }

  transfer(index: any){
    sessionStorage.setItem('accountNumber', this.user.accounts[index].accountNumber)
    this.router.navigateByUrl('/transfers');
  }

}
