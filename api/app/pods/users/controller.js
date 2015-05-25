var _               = require('lodash'),
    User            = require('../../models/user').User,
    Boom            = require('boom'),
    PasswordService = require('../../services/password');

module.exports = {

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
    var user = null;

    User
      .get(req.params.user_id)
      .run()
      .then(function(res) {
        user        = res;
        var payload = _.pick(req.payload, this._userParams);
        console.log(payload, this._userParams);
        return user.merge(payload).save();
      })
      .then(function(updatedResult) {
        // console.log("User updated!", user.getOldValue());
        reply({user: updatedResult});
      })
      .catch(function(e) {
        reply(Boom.wrap(e, 422));
      });
  },


  _userParams: ['firstName', 'lastName', 'email', 'password', 'username']

}