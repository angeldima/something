# Serverless User Authentication based on AWS Cognito and Amplify With Angular

In this project we have implemented a serverless User Authentication solution, using:

- AWS Amplify framework
- AWS Cognito
- Angular 9
- Amplify JavaScript Libraries

The result is fully-functioning web application that includes:

- User registration
- Verify registration
- User log in
- User log out

## Creating Angular Project

Install angular cli and inizialize new project

```shell
	npm install -g @angular/cli
	ng new something-app
	cd new something-app
	ng serve
```

let create the project structure

```shell
  mkdir src/app/pages
  mkdir src/app/ui-template
  mkdir src/app/guards

  ng generate component pages/homepage
  ng generate component pages/login
  ng generate component pages/page1
  ng generate component pages/page2
  ng generate component pages/page3
  ng generate component pages/register

  ng generate component ui-template/footer
  ng generate component ui-template/header
  ng generate component ui-template/layout
```

### Create App Routing fir new pages

Add new routest in _app.routing.modules.ts_. Replace thw _routes_ list with the following

```javascript
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/homepage', pathMatch: 'full' },
      { path: 'homepage', component: HomepageComponent },
      { path: 'page1', component: Page1Component },
      { path: 'page2', component: Page2Component },
      { path: 'page3', component: Page3Component }
    ]
  }
];
```

### Configura Boostrap for the UI

We will use _Boostrap_ navbar component in order to create the header and the footer of the web page.

Copy-paste the stylesheet _link_ into your _index.html_ _head_ before all other stylesheets to load our CSS.

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
  integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
  crossorigin="anonymous"
/>
```

Place the following _scripts_ near the end of your pages, right before the closing _body_ tag, to enable them. jQuery must come first, then Popper.js, and then our JavaScript plugins.

```html
<script
  src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
  integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
  crossorigin="anonymous"
></script>
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
  integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
  crossorigin="anonymous"
></script>
<script
  src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
  integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
  crossorigin="anonymous"
></script>
```

### Create UI template

First of all add the _logo.png_ image in the assets directory (src/app).

Add this code in _header.component.html_

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" routerLink="/home"
    ><img src="/assets/logo.png" class="img-responsive" alt="Responsive image"
  /></a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" routerLink="/homepage" routerLinkActive="active"
          >Home <span class="sr-only">(current)</span></a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/page1" routerLinkActive="active"
          >Page1</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/page2" routerLinkActive="active"
          >Page2</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          routerLink="/page3"
          routerLinkActive="active"
          disabled
          >Page3</a
        >
      </li>
    </ul>
  </div>
</nav>
```

Add this code in _header.component.scss_

```css
.navbar-brand img {
  height: 90px;
  margin: 10px;
}
```

Add this code in _footer.component.html_

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
  <div class="navbar-expand m-auto navbar-text">
    Made by ...
  </div>
</nav>
```

Add this code in _layout.component.html_

## Create Authorization process with Amplify

The Amplify Framework provides a set of libraries and UI components and a command line interface to build mobile backends and integrate with your iOS, Android, Web, and React Native apps. The Amplify CLI allows you to configure all the services needed to power your backend through a simple command line interface. The Amplify library makes it easy to integrate your code with your backend using declarative interfaces and simple UI components.

### Installing and configure Amplify CLI

```shell
	npm install -g @aws-amplify/cli
```

### Installing Amplify Libraries

```shell
	npm install aws-amplify aws-amplify-angular
```

Currently, the newest versions of Angular (6+) do not include shims for ‘global’ or ‘process’ which were provided in previous versions. Add the following to your _polyfills.ts_ file to recreate them:

```javascript
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
```

### Setup and provisioning the Amplify Auth Backend

Create a backend configuration with the Amplify CLI and import the generated configuration file.

In this project we will enable Authentication with Amazon Cognito User Pools as well as Amazon S3 Storage. This will create an aws-exports.js configuration file under your projects src directory.

```shell
	amplify configure #only if tou need to configure the AWS credentials for Amplify CLI
	amplify init
	amplify add auth
	amplify push
```

After creating your backend a configuration file will be generated in your configured source directory you identified in the amplify init command.

When working with underlying _aws-js-sdk_, the “node” package should be included in types compiler option. update your _src/tsconfig.app.json_:

```javascript
"compilerOptions": {
    "types" : ["node"]
}
```

### Configuring the Amplify provider with every Amplify JS module

Import the configuration file and load it in _main.ts_:

```javascript
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

In the app module _src/app/app.module.ts_ import the* Amplify Module and Service*:

```javascript
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

@NgModule({
	  ...
	  imports: [
		...
		AmplifyAngularModule
	  ],
	  ...
	  providers: [
		...
		AmplifyService
	  ]
	  ...
});
```

Since currently, Angular 9 is not supported as this is a newer version of Angular that has come out recently. At the moment there are issues with template checking and/or ivy renderer. You could try switching off Ivy and disabling _"fullTemplateTypeCheck"_ in your angularCompilerOptions in _tsconfig.json_

### Create Login page

Import _ReactiveFormsModule_ in your Angular project. In _app.module.ts_ add:

```javascript
import { ReactiveFormsModule } from '@angular/forms';

...

imports: [
    ...
    ReactiveFormsModule,
    ...
  ],
```

Replace the file _login.component.ts_ with the followiong code:

```javascript
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
```

Replace the file _login.component.html_ with the followiong code:

```html
<div class="container mt150">
  <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <h1>Login</h1>
      <br />
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          [formControl]="username"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          [formControl]="password"
        />
      </div>
      <button type="submit" class="btn btn-secondary" (click)="logInUser()">
        LogIn
      </button>
      <button
        type="submit"
        class="btn btn-secondary ml-2"
        routerLink="/register"
      >
        Register
      </button>
    </div>
    <div class="col-3"></div>
  </div>
</div>
```

Replace the file _login.component.scss_ with the followiong code:

```css
.mt150 {
  margin-top: 150px;
}
```

### Create Register page

Replace the file _register.component.ts_ with the followiong code:

```javascript
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
```

Replace the file _register.component.html_ with the followiong code:

```html
<div class="container mt150">
  <div class="row">
    <div class="col-3"></div>
    <div class="col-6" *ngIf="registrationVisible">
      <h1>Register new user</h1>
      <br />
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          [formControl]="username"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          [formControl]="password"
        />
      </div>
      <button type="submit" class="btn btn-secondary" (click)="signUpUser()">
        Register
      </button>
    </div>
    <div class="col-6" *ngIf="verifyRegistrationVisible">
      <h1>Verify new user</h1>
      <br />
      <div class="form-group">
        <label for="exampleInputEmail1">Verify code</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter verify code"
          [formControl]="verifyString"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Insert verify string we sent on your email address.</small
        >
      </div>
      <button type="submit" class="btn btn-secondary" (click)="verifyUser()">
        Verify
      </button>
    </div>
    <div class="col-3"></div>
  </div>
</div>
```

Replace the file _register.component.scss_ with the followiong code:

```css
.mt150 {
  margin-top: 150px;
}
```

### Create Angular AuthGuard to validate loggedin users

Create _auth.guard.ts_ file in _guards_ directory, and replace content with the following code:

```javascript
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Auth } from 'aws-amplify';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user);
        return true;
      })
      .catch(err => {
        console.log(err);
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      });
  }
}
```

import _AuthGuard_ in app.module.ts

```javascript
import { AuthGuard } from './guards/auth.guard';

...

providers: [
    ...
    AuthGuard,
    ...
  ],
```

### Modify app-routing to protect our web app with authentication process

Replace the content of _app-routing.module.ts_ file with the followiong code:

```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { LayoutComponent } from './ui-template/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/homepage', pathMatch: 'full' },
      { path: 'homepage', component: HomepageComponent },
      { path: 'page1', component: Page1Component },
      { path: 'page2', component: Page2Component },
      { path: 'page3', component: Page3Component }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

## Test your app

```shell
ng serve
```
