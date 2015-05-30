import _ from 'lodash';
import { User } from '../../models';
import Boom from 'boom';
import UserSerializer from '../../serializers/user';

export default {

  show: function(req, reply) {
    reply({user: new UserSerializer(req.data.User).serialize()});
  },

  create: function(req, reply) {
    let user = new User(_.pick(req.payload, this._userParams));

    user
      .save()
      .then((res) => {
        reply({user: new UserSerializer(res).serialize()});
      })
      .catch((err) => {
        if (err.isBoom) {
          reply(err);
        } else {
          reply(Boom.wrap(err, 422));
        }
      });
  },

  // TODO: I shoud only be able to update my own record
  update: function(req, reply) {

    let user = req.data.User;

    user
      .merge(_.pick(req.payload, this._userParams))
      .save()
      .then((updatedResult) => {
        reply({user: new UserSerializer(updatedResult).serialize()});
      })
      .catch((e) => {
        reply(Boom.wrap(e, 422));
      });
  },

  // Private

  _userParams: ['firstName', 'lastName', 'email', 'password', 'username']

}