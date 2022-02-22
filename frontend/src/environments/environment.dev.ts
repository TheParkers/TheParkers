// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/* istanbul ignore next */
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAdrl7xM1APVmZwrBm1iXISqkD9YGkj3sA",
    authDomain: "theparkers-59b45.firebaseapp.com",
    projectId: "theparkers-59b45",
    storageBucket: "theparkers-59b45.appspot.com",
    messagingSenderId: "111997111938",
    appId: "1:111997111938:web:39e0c8e1909756dcde6e9b",
    measurementId: "G-S566XNQGE2"
  },
  apiServer: 'https://parkersdev-api-nixgrdwaba-ue.a.run.app',
  apiUrls: {
    registerUser: '/users/register/',
    loginUser: '/signin/',
    user: {
        userbyid: '/users/',
        userDetails:'/signin/user'
    }
  },
  actionSheetConfig: (service: any)=> {
      return {
        cssClass: 'my-custom-class',
        translucent: false,
        buttons: [{
          text: 'Bookings',
          role: 'bookings',
          icon: 'cart-outline',
          id: 'delete-button',
          data: {
            type: 'delete'
          },
          handler: () => {
            console.log('Bookings clicked');
          }
        }, {
          text: 'Rentals',
          icon: 'car-sport-outline',
          data: 10,
          handler: () => {
            console.log('Rentals clicked');
          }
        }, {
          text: 'Profile',
          icon: 'person-circle-outline',
          data: 'Data value',
          handler: () => {
            service.logout();
            console.log('control sheet profile clicked');
          }
        }]
      }
  }
};
1
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
