import {
  BaseFactory as Factory
} from '../../setup';

import Lab from 'lab';
import Code from 'code';
import sinon from 'sinon';
import _ from 'lodash';
import {startDatabase, stopDatabase} from '../../support/initializers/database';
import { User } from '../../../src/app/models';
import moment from 'moment';
import * as PasswordService from '../../../src/app/services/password';

let lab     = Lab.script(),
expect      = Code.expect,
beforeEach  = lab.beforeEach,
before      = lab.before,
after       = lab.after,
afterEach   = lab.afterEach,
test        = lab.test;

lab.experiment('user model', function() {

  before(function(done) {
    startDatabase(() => done());
  });

  after(function(done) {
    stopDatabase(done);
  });

  lab.test('I should be able to get a user', function(done) {
    let user;
    Factory.create('user', function(err, newUser) {
      if (err) { console.log(err, newUser); }
      user = newUser;
      expect(user).to.not.equal(undefined);
      user.delete().then(function() {
        done();
      });
    });
  });

  lab.experiment('validation', function() {

    let validUser;

    beforeEach(function(done) {
      Factory.create('user', (err, newUser) => {
        if (err) { console.log(err); }
        validUser = newUser;
        done();
      })
    });

    afterEach(function(done) {
      validUser.delete().then(() => done());
    });


    lab.test('it should require a valid email address', function(done) {
            
      validUser
        .merge({ email: "asdf" })
        .save()
        .catch(function(err) {

          let isEmail = _.chain(err)
            .values()
            .any(val => val.indexOf("Value for [email] must be a valid email") > -1)
            .value();

          expect(err).to.not.equal(undefined);
          expect(isEmail).to.be.true();
          done();
        })
        .error(function(err) {
          done();
        });
    });

  });

  lab.experiment('hooks', function() {

    let validUser;

    beforeEach(function(done) {
      Factory.create('user', (err, newUser) => {
        if (err) { console.log(err); }
        validUser = newUser;
        done();
      })
    });

    afterEach(function(done) {
      validUser.delete().then(() => done());
    });

    test('it should update the updatedAt field', function(done) {
      setTimeout(function() {
        let before = moment(validUser.updatedAt);
        validUser.merge({firstName: "boo"}).save()
          .then((updatedUser) => {
            let now = moment(updatedUser).utc();
            expect(now.diff(before)).to.not.equal(0);
            done();
          })
          .catch(function(e) {
            console.log("GOT AN ERROR!", e);
          });
      }, 1);

    });

    test('it should automatically encrypt the password', function(done) {
      Factory.build('user', function(err, user) {
        let currentPassword = user.password;

        user
          .save()
          .then(function(newUser) {
            expect(newUser.password).to.not.equal(currentPassword);
            expect(PasswordService.compare(currentPassword, newUser.password)).to.be.true();
            user.delete().then(() => done());
          });
      });
    }); 

  });

});


export { lab };