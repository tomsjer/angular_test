# Expero - Angular Dev UI test

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.4.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Getting Started

1. Install NodeJS (8.9 or higher)
2. Install Yarn Package Manager
3. Install Angular CLI ```yarn add global @angular/cli```
4. From this directory run: ```yarn```.  This will download all of the npm dependencies
5. Try ```yarn start``` and make sure you do not see any errors
6. Once the web server is running, visit [http://localhost:4200](http://localhost:4200)  You should see a map.

## Important Code Locations

* src/ - contains the code for the client-side app
* server/ - contains the code for the development web server
* server/api.js - contains the REST API endpoint(s)

It is very unlikely you will need to look at anything outside of these locations.

## Development Workflow

Run ```yarn start``` to start the development web server.
This will automatically compile and bundle all of the client JavaScript.
It will serve the app at http://localhost:4200

It automatically monitors the ```src``` and ```server``` folders for changes.  Anytime you change a file, it will automatically recompile and re-bundle the client and server. Your browser will automatically load the new code and update itself.

## Lint

This project is setup to use ```eslint``` to check the code style.  You can run lint by typing ```yarn run lint```.

# Your Challenge
The bare bones Angular app renders a single "Home" page showing a map that uses leaflet.js. (Note the Counter route has been left as an example but is not actually used):
![Current App](current_app.png)

The repo has the following libraries loaded.  We encourage you to make use of them, or any others you feel you need:

* Angular 6
* NgRx ```@ngrx/store @ngrx/effects @ngrx/router-store @ngrx/store-devtools ngrx-store-freeze```
* Leaflet (for the map rendering)

Implement our new front end design on top of this barebones starter. An API is already available for retrieving port data with some options for filtering, which you may not need to change at all.

We are looking for a working prototype of the design implemented in Angular. It doesn't need to match the design pixel for pixel and we don't have icons from UX yet, so fill the gaps where you need to.

## Design

### Main Screen
![Main Screen](design_main_screen.png)

### Detail View
![Detail View](design_detail_view.png)

### Notes

1. Map Style
   * Keep the existing dark satellite style (ignore the light blue style shown in the design wireframes)
1. Ignore the "Search" feature in the design wireframes
1. Add the left panel that lists the harbors shown in the map.
1. Adjust the layout so that the map compltely fills the right of the page as shown in the wireframes
1. The two toggles on the left panel should filter the data so that it is not shown on the map or in the list
1. Clicking on a harbor in the list should show the popup on the map for that harbor
1. Clicking on a harbor on the map should highlight it in the list
1. Clicking on the "details" icon in the list, or clicking "View details" in the popup should cause the Detail View to be shown
1. The map on the Details view should only show the single harbor location
