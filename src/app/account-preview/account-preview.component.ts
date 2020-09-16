import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-account-preview',
  templateUrl: './account-preview.component.html',
  styleUrls: ['./account-preview.component.scss']
})

export class AccountPreviewComponent implements OnInit {
  @Input() user: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  setDecimalPlaceToTwo(amount: string): string{
    return parseFloat(amount).toFixed(2);
  }

}
