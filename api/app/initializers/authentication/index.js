var jwt         = require('jsonwebtoken'),
    User        = global.reqlib('/app/models/user').User,
    Boom        = require('boom'),
    JwtService  = global.reqlib('/app/services/jwt');

var privateKey = JwtService.secret;

var validator = function(decodedToken, cb) {
  console.log("Attempting to validate user");
  // find the user based on decodedToken data
  var error;

  User
    .get(decodedToken.id)
    .run()
    .then(function(result) {
      console.log("User validated: " + result.id);
      return cb(error, true, result);
    }, function(err) {
      error = err;
      return cb(Boom.unauthorized(err), false, {});
    });
}

var Plugin = {
  register: function(server, options, next) {

    server.auth.strategy('token', 'jwt', 'try', {
      key:            privateKey,
      validateFunc:   validator
    });

    next();
  }
};

Plugin.register.attributes = {
  pkg: require('./package.json')
};

module.exports = Plugin;