var JwtService = global.reqlib('/app/services/jwt'),
    User       = global.reqlib('/app/models/user').User,
    Boom       = require('boom');

var checkForJwt = function(request, reply, next) {

  var req           = request.raw.req,

      // grab the header
      authorization = req.headers.authorization;

  // if the header is not there, we'll just continue
  if (!authorization){ return next(null, true); }

  var parts = authorization.split(/\s+/);

  // Invalid header format
  if (parts.length !== 2) { return next(null, true); }

  if (parts[0].toLowerCase() !== 'bearer') {
    return next(null, true);
  }

  if (parts[1].split('.').length !== 3) {
    // Also invalid header format
    return next(null, true);
  }

  var token = parts[1],
      decodedToken = JwtService.verify(token);

  if (decodedToken) {
    // request.currentUser = decodedToken;
    User
      .get(decodedToken.id)
      .run()
      .then(function(user) {
        request.currentUser = user;
        next(null, true);
      })
      .catch(function(e) {
        next(Boom.notFound('The token you are authenticated with could not be found'), false);
      });
  } else {
    next(null, true);
  }
}

module.exports = checkForJwt;