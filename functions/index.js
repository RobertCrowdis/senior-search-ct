const functions = require('firebase-functions');
const admin = require('firebase-admin');
let serviceAccount;

try {
  serviceAccount = require('./serviceAccountKey.json');
} catch (e) { }

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://' + serviceAccount['project_id'] + '.firebaseio.com'
  });
} else {
  admin.initializeApp(functions.config().firebase);
}

const centers = require('./centers').centers;
const gmaps = require('./centers').gmaps;

exports.centers = centers;
exports.gmaps = gmaps;