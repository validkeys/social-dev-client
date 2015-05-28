import * as Models from '../../src/app/models';
import _ from 'lodash';
import Faker from 'faker';

let modelAttributeNames = _.keys(Models.User.attributes);

let define = (factory) => {
  factory.define('user', Models.User, {
    firstName:  Faker.name.firstName(),
    lastName:   Faker.name.lastName(),
    email:      Faker.internet.email(),
    username:   Faker.name.firstName(),
    password:   Faker.internet.password()
  });
};

export default function(factory) {
  define(factory);
};