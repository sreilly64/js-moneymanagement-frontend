import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login/login.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any = null;
  error: any = null;
  firstName: string = null;
  lastName: string = null;
  street: string = null
  city: string = null;
  state: string = null;
  zip: string = null;
  email: string = null;
  phoneNumber: string = null;
  oldPassword: string = null;
  newPassword: string = null;
  confirmPassword: string = null;
  
  valid = {
    firstName: true,
    lastName: true,
    street: true,
    city: true,
    zip: true,
    email: true,
    phoneNumber: true,
    newPassword: false,
    confirmPassword: false,
  };

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: any }) => {
      this.user = data.user;
    });
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.street = this.user.street;
    this.city = this.user.city;
    this.state = this.user.state;
    this.zip = this.user.zip;
    this.email = this.user.email;
    this.phoneNumber= this.user.phoneNumber;
    this.loginService
      .errorMessage
      .subscribe(errorMessage => {
        this.error = errorMessage;
    });
  }

  logout(){
    sessionStorage.clear();
  }

  clearError(): void {
    this.loginService.errorSubject.next(null);
  }

  onChange(event: any){
    this.state = event.target.options[event.target.options.selectedIndex].text;
  }

  onKey(event: any, type: string) {
    if(type === 'firstName') {
      this.firstName = event.target.value;
    } else if(type === 'lastName') {
      this.lastName = event.target.value;
    } else if(type === 'street') {
      this.street = event.target.value;
    } else if(type === 'city') {
      this.city = event.target.value;
    } else if(type === 'zip') {
      this.zip = event.target.value;
    } else if(type ==='phoneNumber') {
      this.phoneNumber = event.target.value;
    } else if(type === 'oldPassword') {
      this.oldPassword = event.target.value;
    } else if(type === 'newPassword') {
      this.newPassword = event.target.value;
    } else if(type === 'confirmPassword') {
      this.confirmPassword = event.target.value;
    } else if(type === 'email') {
      this.email = event.target.value;
    }
    this.validate(type);
  }

  validate(type: string) {
    const usernamePattern = RegExp(/^[\w-.]*$/);
    const emailPattern = RegExp(/\S+@\S+\.\S+/);
    const phoneNumberPattern = RegExp(/^[2-9]\d{2}-\d{3}-\d{4}$/);
    const passwordPattern = RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&#])[a-zA-Z0-9!@#$%^&*]{8,}$/);
    const zipcodePattern = RegExp(/^\d{5}$/);
    if(type === 'email') {
      this.valid.email = emailPattern.test(this.email);
    } else if(type === 'phoneNumber') {
      this.valid.phoneNumber = phoneNumberPattern.test(this.phoneNumber); 
    } else if(type === 'newPassword') {
      this.valid.newPassword = passwordPattern.test(this.newPassword);
    }else if(type === 'confirmPassword') {
      this.valid.confirmPassword = this.newPassword === this.confirmPassword;
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

  onSubmitDetails(){
    if(this.valid.firstName && this.valid.lastName && this.valid.email && this.valid.phoneNumber && this.valid.street && this.valid.city && this.valid.zip){
      let address = this.street + ", " + this.city + ", " + this.state + " " + this.zip;
      this.loginService.updateUserDetails(this.firstName, this.lastName, this.email, this.phoneNumber, address);
    }else {
      //this.error = "One or more of your inputs are invalid";
      alert("Update failed. One or more of your inputs are invalid.")

    }
  }

  onSubmitPassword(){
    if(this.oldPassword != null && this.valid.newPassword && this.valid.confirmPassword){
      this.loginService.updatePassword(this.oldPassword, this.newPassword);
    }else {
      //this.error = "New password is invalid";
      alert("Update failed. New password is invalid.")
    }
  }

}
