import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = null;
  password: string = null;
  isUsernameValid: boolean = true;
  error: any = null;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginService
      .errorMessage
      .subscribe(errorMessage => {
        this.error = errorMessage;
    })
  }

  validateUsername(): void {
    const pattern = RegExp(/^[\w-.]*$/);
    if (pattern.test(this.username)) {
        this.isUsernameValid = true;    
    } else {
        this.isUsernameValid = false;
    }
  }

  onKey(event: any, type: string) {
    if (type === 'username') {
        this.username = event.target.value;
        this.validateUsername();
    } else if (type === 'password') {
        this.password = event.target.value;
    }
  }

  keyDown(event: any){
    if(event.keyCode === 13){
      this.onSubmit();
    }
  }

  onSubmit(){
    if(this.isUsernameValid){
      this.loginService.login(this.username, this.password);
    }
  }

  clearError(){
    //this.error = null;
    this.loginService.errorSubject.next(null);
  }

}
