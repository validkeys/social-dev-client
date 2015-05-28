import _ from 'lodash';
import { User } from '../../models';
import Boom from 'boom';

export default {

  show: (req, reply) => {
    // console.log(userParams);
    reply({user: req.data.User});
  },

  create: (req, reply) => {
    console.log("THIS", this);
    let user = new User(_.pick(req.payload, this._userParams))

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
  update: (req, reply) => {

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

  userParams: ['firstName', 'lastName', 'email', 'password', 'username']

}