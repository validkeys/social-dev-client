import { database } from '../../config/';
import thinky from 'thinky';

let dbConfig  = database[process.env.NODE_ENV || 'development'],
    thinkyInstance    = thinky(dbConfig),
    r         = thinkyInstance.r;

exports.register = function(server, options, next) {

  thinkyInstance._onDbReady.push(function() {
    console.info("Database ("+dbConfig.db+") Is Connected on port: " + dbConfig.port);
    next();
  });

}

exports.register.attributes = {
  pkg: require('./package.json')
}

export thinky;
export r;