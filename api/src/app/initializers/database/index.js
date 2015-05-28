var dbConfig  = require('../../config').database[process.env.NODE_ENV || 'development'],
    thinky    = require('thinky')(dbConfig),
    r         = thinky.r;

exports.register = function(server, options, next) {

  thinky._onDbReady.push(function() {
    console.info("Database ("+dbConfig.db+") Is Connected on port: " + dbConfig.port);
    next();
  });

}

exports.register.attributes = {
  pkg: require('./package.json')
}

exports.thinky  = thinky;
exports.r       = r;