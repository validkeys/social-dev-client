import {
  BaseFactory as Factory
} from '../../setup';

import Lab from 'lab';
import Code from 'code';
import sinon from 'sinon';
import _ from 'lodash';
import {startDatabase, stopDatabase} from '../../support/initializers/database';
import { User } from '../../../src/app/models';

let lab     = Lab.script(),
expect      = Code.expect,
beforeEach  = lab.beforeEach,
before      = lab.before,
after       = lab.after,
afterEach   = lab.afterEach;

lab.experiment('user model', function() {

  before(function(done) {
    startDatabase(done);
  });

  after(function(done) {
    stopDatabase(done);
  });

  lab.test('I should be able to get a user', function(done) {
    let user;
    Factory.create('user', function(err, newUser) {
      if (err) { console.log(err); }
      user = newUser;
      expect(user).to.not.equal(undefined);
      user.delete().then(function() {
        done();
      });
    });
  });

  lab.experiment('validation', function() {

    lab.test('it should require a valid email address', function(done) {
      Factory.create('user', { email: "asdf" }, function(err, newUser) {

        let isEmail = _.chain(err)
          .values()
          .any(val => val.indexOf("Value for [email] must be a valid email") > -1)
          .value();

        expect(err).to.not.equal(undefined);
        expect(isEmail).to.be.true();
        done();
      });
    });

  });

  lab.experiment('permissions', function() {

    lab.test('it should work', function(done) {
      expect(1).to.equal(1);
      done();
    });


  });

});


export { lab };