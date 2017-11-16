const functions = require('firebase-functions');
const admin = require('firebase-admin');
const httpRequest = require('request');
const cors = require('cors')({
  origin: true
});

/**
 * Fetches data from state of Connecticut, parses it, and adds it to the database.
 * @param {any} request - HTTP request data.
 * @param {any} response - Function to send response to client.
 */
exports.centers = functions.https.onRequest((request, response) => {
  const centers = admin.database().ref('/centers');
  centers.remove().then(() => {
    httpRequest({
      method: 'GET',
      url: 'https://data.ct.gov/resource/4pk7-jdkg.json'
    }, (err, res, body) => {
      if (err) throw new Error(err);
      const locations = [];
      for (const feature of JSON.parse(body)) {
        if (feature['location_1']) {
          const place = {
            agency: (feature['agency'] || null),
            phone: (feature['email'] || null),
            email: (feature['notes'] || null),
            address: {
              street: (feature['town_city'] || null),
              city: (feature['location_1_city'] || null),
              state: (feature['tel'] || 'CT'),
              zip: (feature['location_1_zip'] || null),
            },
            coordinates: {
              lat: (feature['location_1']['coordinates'][1] || 0),
              lng: (feature['location_1']['coordinates'][0] || 0)
            }
          };
          centers.push(place);
          locations.push(place);
        }
      }
      response.send(JSON.stringify({
        results: locations
      }));
    });
  });
});

/**
 * On creation of a agency/center, fetch from Google Maps for reviews and details.
 * @param {any} event - Event that triggered the onCreate hook.
 */
exports.gmaps = functions.database.ref('/centers/{id}').onCreate((event) => {
  const centers = admin.database().ref('/centers');
  const center = event.data.val();
  httpRequest({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
    qs: {
      key: functions.config().google.api,
      query: center.agency,
      location: center.coordinates.lat + ',' + center.coordinates.lat
    },
  }, (err, res, body) => {
    if (err) {
      throw new Error(err);
    }
    try {
      body = JSON.parse(body);
      if (body.error_message) {
        throw new Error(body.error_message);
      }
      const results = body.results;
      if (Array.isArray(results) && results.length !== 0) {
        const result = results[0];
        return centers.child(event.params.id).update({
          place_id: (result.place_id || null),
          rating: (result.rating || null),
          icon: (result.icon || null)
        });
      } else {
        throw new Error('Invalid map results');
      }
    } catch (e) {
      throw new Error(e);
    }
  });
});


/**
 * Returns about information from Google Maps places API.
 * @param {any} request - HTTP request data.
 * @param {any} response - Function to send response to client.
 */
exports.about = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (request.query.placeid === undefined) {
      response.status(400).send('No place id defined!');
    } else {
      const placeid = request.query.placeid;
      httpRequest({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/details/json',
        qs: {
          key: functions.config().google.api,
          placeid: placeid
        },
      }, (err, res, body) => {
        if (err) {
          throw new Error(err);
        }
        try {
          body = JSON.parse(body);
          if (body.error_message) {
            throw new Error(body.error_message);
          }
          const result = body.result;
          response.send(JSON.stringify({
            result: {
              reviews: result.reviews,
              photos: result.photos,
              website: result.website
            }
          }));
        } catch (e) {
          throw new Error(e);
        }
      });
    }
  });
});
