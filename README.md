# ModCon
ModCon Vanity

This project is based on AngularFire and NgrxFire

- `git https://github.com/codediodeio/ngrx-fire.git ngrxFire`
- `git https://github.com/codediodeio/angular-firestarter`

## Usage

#### Clone repository and prepare to build:

Use the following terminal commands to prepare to build your application:

- `git clone https://github.com/Robbie106gti/ModCon`
- `cd ModCon`
- `npm install`

#### Create a Firebase account

*  Create a Firebase account at https://firebase.google.com/. 
*  Configure Authentication for the web app:
  >  ![firebaseauth](https://user-images.githubusercontent.com/210413/30171158-b036b8dc-93b6-11e7-9698-b355544d0c00.png)
*  Sample for Firebase database can be found in the root in this file sample-db.json
   
*  Gather your Firebase configuration information:
  >  ![firebaseconfig](https://user-images.githubusercontent.com/210413/30178188-b219c6b4-93cd-11e7-854d-788a2c2d99b1.jpg)
*  Create the environment file below `/src/environments/environment.ts`.
```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'APIKEY',
    authDomain: 'DEV-APP.firebaseapp.com',
    databaseURL: 'https://DEV-APP.firebaseio.com',
    storageBucket: 'DEV-APP.appspot.com'
  }
};
```
*  And finally `ng serve`


## Additional Details

* For build use `ng build pwa` = "pwa": "ng build --prod && sw-precache --root=dist --config=precache-config.js"

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

It uses AngularFire2 v4.0
