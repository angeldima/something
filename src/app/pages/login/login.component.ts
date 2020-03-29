import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router) {}

  ngOnInit() {}

  logInUser() {
    const loginUser = {
      username: this.username.value,
      password: this.password.value
    };

    Auth.signIn(loginUser)
      .then(user => {
        console.log(user);
        alert('LogIn success!');
        this.router.navigate(['/homepage']);
      })
      .catch(err => {
        console.log(err);
        alert('LogIn failed!');
      });
  }
}
