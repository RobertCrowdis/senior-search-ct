// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyAfrJ2zLWeUEdtMJMtU_DZ33GJVFq3flNY',
    authDomain: 'senior-search-ct.firebaseapp.com',
    databaseURL: 'https://senior-search-ct.firebaseio.com',
    projectId: 'senior-search-ct',
    storageBucket: 'senior-search-ct.appspot.com',
    messagingSenderId: '374430659285'
  },
  api: 'https://us-central1-senior-search-ct.cloudfunctions.net/'
};
