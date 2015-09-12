'use strict';

let vars = require('../variables');

// Production config
module.exports = {
  db: vars.db,
  secret: vars.secret,
  facebook: {
    clientID: 'XXX',
    clientSecret: 'XXX',
    callbackURL: `${vars.url}/api/auth/facebook/callback`
  },
  google: {
    clientID: 'XXX',
    clientSecret: 'XXX',
    callbackURL: `${vars.url}/api/auth/google/callback`
  }
};