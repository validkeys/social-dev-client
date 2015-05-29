import _ from 'lodash';
import { User } from '../../models';
import Boom from 'boom';
import UserSerializer from '../../serializers/user';

export default {

  show: function(req, reply) {
    console.log(req.data.User.constructor.name);
    // reply(new UserSerializer(req.data.User).serialize());
    reply(req.data.User);
  },

  create: function(req, reply) {
    let user = new User(_.pick(req.payload, this._userParams));

    user
      .save()
      .then((res) => {
        reply({user: res});
      })
      .catch((err) => {
        console.log(err);
        reply(Boom.wrap(err, 422));
      });
  },

  // TODO: I shoud only be able to update my own record
  update: function(req, reply) {

    let user = req.data.User;

    user
      .merge(req.payload)
      .save()
      .then((updatedResult) => {
        reply({user: updatedResult});
      })
      .catch((e) => {
        reply(Boom.wrap(e, 422));
      });
  },

  // Private

  _userParams: ['firstName', 'lastName', 'email', 'password', 'username']

}