import {
  BaseFactory as Factory
} from '../setup';

import Lab from 'lab';
import Code from 'code';
import Glue from 'glue';
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
    user   = null;

lab.experiment('Users', function() {
  before(function(done) {
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

  });


});

export { lab };