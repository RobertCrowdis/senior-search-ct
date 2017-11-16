# SeniorSearchCT [![Build Status](https://travis-ci.org/RobertCrowdis/senior-search-ct.svg?branch=master)](https://travis-ci.org/RobertCrowdis/senior-search-ct)

Senior Search CT invites senior aged users to learn about restaurants, events and gyms around the senior centers they may visit.

This project is live and available at [https://senior-search-ct.firebaseapp.com](https://senior-search-ct.firebaseapp.com).

## Installing Dependencies

Run the command `npm install` to obtain all the required project dependancies. 

You may need to add two global packages as well: The Angular CLI and Firebase Tools. Both of these can be obtained with the following commands: `npm install -g @angular/cli` and `npm install -g firebase-tools`.


## Firebase Configuration

You will need a Firebase application set up in order to use this app. You can create one on the [Firebase website](https://firebase.com/). After you have created an application, copy the Firebase web configuration into the `environment.ts` and `environment.prod.ts` files, found in `./src/evironments`, as the `firebase` object.

You will also need to set the `api` field in the environments of both files to `https://us-central1-<APPID>.cloudfunctions.net/`.

Make sure that the file in the root directory of this project, `.firebaserc` has the `default` (and `dev`) field appropriately set as the ID of your Firebase project.

You'll need additional configuration for your functions, specifically for a few third-party APIs. You will need to get/set an API key for the [Google Places API](https://developers.google.com/places/) as well as create an application on to use the [Yelp Fusion APIs](https://www.yelp.com/developers/documentation/v3/get_started) (specificall you will need your `client_id`, `client_secret` keys).

```
firebase functions:config:set google.api="GOOGLE PLACES API KEY" yelp.client_id="YELP CLIENT KEY" yelp.client_secret="YELP CLIENT SECRET"
```

After you are sure that you have configured this correctly, launch `npm run deploy`, which will deploy your application as well as set up Firebase Functions and Database Rules.

To load default data, make a get request to the Firebase Function called `centers`. The url would be `https://us-central1-<APPID>.cloudfunctions.net/centers`.

## Starting App
To test the application locally, simply run the command `npm run start`.


## Documentation
This documentation is live and available at [https://senior-search-ct.firebaseapp.com/docs](https://senior-search-ct.firebaseapp.com/docs)