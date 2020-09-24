import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName: string = null;
  lastName: string = null;
  ssn: string = null;
  street: string = null;
  city: string = null;
  state: string = "Alabama";
  zip: string = null;
  email: string = null;
  phoneNumber: string = null;
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  address: string = null;
  valid = {
    firstName: false,
    lastName: false,
    ssn: false,
    street: false,
    city: false,
    zip: false,
    email: false,
    phoneNumber: false,
    username: false,
    password: false,
    confirmPassword: false,
  };
  error = null;

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

  validate(type: string): void {
    const usernamePattern = RegExp(/^[\w-.]*$/);
    const emailPattern = RegExp(/\S+@\S+\.\S+/);
    const phoneNumberPattern = RegExp(/^[2-9]\d{2}-\d{3}-\d{4}$/);
    const ssnPattern = RegExp(/^\d{3}-\d{2}-\d{4}$/);
    const passwordPattern = RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&#])[a-zA-Z0-9!@#$%^&*]{8,}$/);
    const zipcodePattern = RegExp(/^\d{5}$/);

    if(type === 'username') {
      this.valid.username = usernamePattern.test(this.username);
    } else if(type === 'email') {
      this.valid.email = emailPattern.test(this.email);
    } else if(type === 'phoneNumber') {
      this.valid.phoneNumber = phoneNumberPattern.test(this.phoneNumber); 
    } else if(type === 'ssn') {
      this.valid.ssn = ssnPattern.test(this.ssn);
    } else if(type === 'password') {
      this.valid.password = passwordPattern.test(this.password);
    } else if(type === 'confirmPassword') {
      this.valid.confirmPassword = this.password === this.confirmPassword;
    } else if(type === 'firstName') {
      this.valid.firstName = this.firstName.length > 0;
    } else if(type === 'lastName') {
      this.valid.lastName = this.lastName.length > 0;
    } else if(type === 'street') {
      this.valid.street = this.street.length > 0;
    } else if(type === 'city') {
      this.valid.city = this.city.length > 0;
    } else if(type === 'zip') {
      this.valid.zip = zipcodePattern.test(this.zip);
    }
}

  

  onKey(event: any, type: string) {
    if(type === 'firstName') {
      this.firstName = event.target.value;
    } else if(type === 'lastName') {
      this.lastName = event.target.value;
    } else if(type === 'ssn') {
      this.ssn = event.target.value;
    } else if(type === 'street') {
      this.street = event.target.value;
    } else if(type === 'city') {
      this.city = event.target.value;
    } else if(type === 'zip') {
      this.zip = event.target.value;
    } else if(type ==='phoneNumber') {
      this.phoneNumber = event.target.value;
    } else if(type === 'username') {
      this.username = event.target.value;
    } else if(type === 'password') {
      this.password = event.target.value;
    } else if(type === 'confirmPassword') {
      this.confirmPassword = event.target.value;
    } else if(type === 'email') {
      this.email = event.target.value;
    }
    this.validate(type);
  }

  onRegister(): void {
    if(this.valid.firstName && this.valid.lastName && this.valid.ssn && this.valid.street && this.valid.city && this.valid.zip && this.valid.email && this.valid.phoneNumber && this.valid.username && this.valid.password) {
      this.address = this.street + ", " + this.city + ", " + this.state + " " + this.zip; 
      this.loginService
        .register(this.firstName, this.lastName, this.ssn, this.email, this.phoneNumber, this.username, this.password, this.address);
    } else {
      this.error= "One or more of your inputs are invalid.";
    }
  }

  onChange($event) {
    this.state = $event.target.options[$event.target.options.selectedIndex].text;
  }

  clearError(){
    this.loginService.errorSubject.next(null);
  }

}
