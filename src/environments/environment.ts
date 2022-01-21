// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  L_TileLayer:
    'https://api.mapbox.com/styles/v1/{id}/{z}/{x}/{y}?access_token={accessToken}',
  L_Attribution:
    'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,  <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> , Imagery © <a href="http://mapbox.com">Mapbox</a>',
  L_Id: 'mapbox/satellite-streets-v10/tiles/256',
  L_AccessToken:
    'pk.eyJ1IjoiYnJhbmRvbmRldiIsImEiOiJjajFwNjNmODAwMDBnMzFwbDJ4N21yZmFmIn0.YC44JxjiM36-I54e-hVQUA'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
