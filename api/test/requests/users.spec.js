import {
  BaseFactory as Factory
} from '../setup';

import Lab from 'lab';
import Code from 'code';
import Glue from 'glue';
import sinon from 'sinon';
import * as AppConfig from '../../src/app/config';
    
// shortcuts
var lab     = Lab.script(),
expect      = Code.expect,
beforeEach  = lab.beforeEach,
before      = lab.before,
after       = lab.after,
afterEach   = lab.afterEach;

let glueOptions = {
  relativeTo: require('app-root-path').resolve('/src/app')
};

let server = null,
    user   = null,
    sandbox = null;

lab.experiment('Users', function() {
  before(function(done) {
    sandbox = sinon.sandbox.create();
    Glue.compose(AppConfig.manifest, glueOptions, function(err, serverInstance) {
      if (err){ console.log("Glue Error!", err); }
      server = serverInstance;
      server.start(function(err) {
        done();
      });
    });
  });

  beforeEach(function( done ) {
    // create a new user
    Factory.create('user', function(err, newUser) {
      if (err) { console.log(err); }
      user = newUser;
      done();
    });
  });

  afterEach(function( done ) {
    sandbox.restore();
    user.delete().then(function(){
      user = null;
      done();
    });
  });

  lab.experiment('(GET) retrieving a user', function() {
    let response;

    lab.test('user get endpoint works', function(done) {
      let options = { method: "GET", url: "/users/" + user.id };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect("user" in response.result);
        done();
      });
    });

    lab.test('the result should not include the user password', function(done) {
      let options = { method: "GET", url: "/users/" + user.id };
      server.inject(options, function(response) {
        expect(response.result.user.password).to.equal(undefined);
        done();
      });
    });

    lab.test('if the user is not found, it should return a 404', function(done) {
      let options = { method: "GET", url: "/users/123" }; 
      server.inject(options, (response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

  });

  lab.experiment('(POST) creating a user', function() {

    lab.test("I should be able to create a valid user", (done) => {
      Factory.build('user', (err, user) => {
        var options = { method: "POST", url: "/users", payload: user };
        server.inject(options, (response) => {
          console.log(response.result);
          expect(response.statusCode).to.equal(200);
          expect("user" in response.result).to.be.true();
          expect("password" in response.result.user).to.equal(undefined);
          done();
        });
      });
    });

    lab.test("I should get a JSON object back of the user (with a user key)", (done) => {
      expect(1, 'TODO').to.equal(2);
      done();
    });

    lab.test("I should get a 422 if email is invalid", (done) => {
      expect(1, 'TODO').to.equal(2);
      done();
    });

    lab.test("I should get a 422 if email already exists", (done) => {
      expect(1, 'TODO').to.equal(2);
      done();
    });

    lab.test("I should get a 422 if username is invalid", (done) => {
      expect(1, 'TODO').to.equal(2);
      done();
    });

    lab.test("I should get a 422 if username already exists", (done) => {
      expect(1, 'TODO').to.equal(2);
      done();
    });

    lab.test("I should get a 500 if I am already logged in (currentUser)", (done) => {
      expect(1, 'TODO').to.equal(2);
      done();
    });


  });


});

export { lab };