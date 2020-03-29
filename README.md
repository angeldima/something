#Serverless User Authentication based on AWS Cognito and Amplify With Angular
In this project we have implemented a serverless User Authentication solution, using:
- AWS Amplify framework
- AWS Cognito
- Angular 8
- Amplify JavaScript Libraries

The result is fully-functioning web application that includes:
- User registration
- Verify registration
- User log in
- User log out

This application demonstrate how to build and provision AWS elements used in user authentication and how fast is to integrate Amplify functionality in an Angular application.

### Installing and configure Amplify CLI
```shell
	npm install -g @aws-amplify/cli
```

### Creating Angular Project
```shell
	npm install -g @angular/cli
	ng new aws-amplify-cognito-authentication
	cd aws-amplify-cognito-authentication
	ng serve
```

### Installing Amplify Libraries
```shell
	npm install aws-amplify aws-amplify-angular
```

### Configure and provisioning the Auth Back End
```shell
	amplify
	amplify configure
	amplify init
	amplify --help
	amplify auth add
	amplify push
```

### Setup Angular Project and use Amplify Libraries
https://aws-amplify.github.io/docs/js/angular
