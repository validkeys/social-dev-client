var User            = require('../../models/user').User,
    PasswordService = require('../../services/password'),
    Boom            = require('boom'),
    JwtService      = require('../../services/jwt');

module.exports = {

  token: function(req, reply) {
    // console.log({ email: req.payload.email, password: PasswordService.encrypt(req.payload.password) });
    User
      .filter({ email: req.payload.email, password: PasswordService.encrypt(req.payload.password) })
      .limit(1)
      .run()
      .then(function(res) {
        if (res.length === 0){ return reply(Boom.unauthorized('Invalid email or password')); }
        var user = res[0];
        reply({id: user.id, jwt: JwtService.sign(user.jwtAttributes())});
      })
      .catch(function(e) {
        reply(Boom.wrap(e, 422));
      });
  }

};