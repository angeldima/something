import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');

  constructor() {}

  ngOnInit() {}

  logInUser() {
    const loginUser = {
      username: this.username.value,
      password: this.password.value
    };

    Auth.signIn(loginUser)
      .then(user => {
        console.log(user);
        alert('Utente Verificato!');
      })
      .catch(err => console.log(err));
  }
}
