# Angular Todo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Installation

1. Install angular cli globally.
2. Do npm install at root folder to install all angular 5 specific modules.
3. go to api folder using `cd api` then do `npm install`. It will install all restify and mongodb related modules.
4. Install mongodb server on your system.

## Development server

Run `npm start` 


The above command uses concurrently node module and executes below three commands at a single shot.

1. Runs `mongod` command and starts MongoDB server on port=27017.
2. Runs `ng serve --proxy-config proxy.conf.json --open` For a dev server at root floder. Applicaion will be navigated to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
3. Navigates to api folder using `cd api` then run `npm start` to run restify server.

## Reference

https://ng-bootstrap.github.io/#/home


https://github.com/cornflourblue/angular2-registration-login-example