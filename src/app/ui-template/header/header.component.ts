import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  logOutUser() {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
}
