import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationVisible = true;
  verifyRegistrationVisible = false;

  username = new FormControl('');
  password = new FormControl('');
  verifyString = new FormControl('');

  constructor(private router: Router) {}

  ngOnInit() {}

  signUpUser() {
    const user = {
      username: this.username.value,
      password: this.password.value,
      attributes: {
        email: this.username.value
      }
    };
    Auth.signUp(user)
      .then(data => {
        console.log(data);
        alert('Registration success!');
        this.registrationVisible = false;
        this.verifyRegistrationVisible = true;
      })
      .catch(err => {
        alert('Registration failed!');
        console.log(err);
      });
  }

  verifyUser() {
    Auth.confirmSignUp(this.username.value, this.verifyString.value, {
      forceAliasCreation: true
    })
      .then(data => {
        console.log(data);
        alert('Verification success!');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        alert('Verification failed!');
        console.log(err);
      });
  }
}
