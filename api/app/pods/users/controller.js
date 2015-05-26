var _               = require('lodash'),
    User            = require('../../models/user').User,
    Boom            = require('boom'),
    PasswordService = require('../../services/password');

module.exports = {

  show: function(req, reply) {
    reply({user: req.data.User});
  },

  create: function(req, reply) {
    var user = new User(_.pick(req.payload, this._userParams))

    user
      .save()
      .then(function(res) {
        reply({user: res});
      })
      .catch(function(err) {
        console.log(err);
        reply(Boom.wrap(err, 422));
      });
  },

  // TODO: I shoud only be able to update my own record
  // TODO: user should have to be logged in
  update: function(req, reply) {

    var user = req.data.User,
        _this = this;

    var payload = _.pick(req.payload, _this._userParams);

    if (payload.password) {
      if (!PasswordService.compare(payload.password, user.password)) {
        console.log("HERE?");
        payload.password = PasswordService.encrypt(payload.password);
      } else {
        // the password has not changed so don't update
        delete payload.password;
      }
    }

    user
      .merge(payload)
      .save()
      .then(function(updatedResult) {
        reply({user: updatedResult});
      })
      .catch(function(e) {
        reply(Boom.wrap(e, 422));
      });
  },


  _userParams: ['firstName', 'lastName', 'email', 'password', 'username']

}