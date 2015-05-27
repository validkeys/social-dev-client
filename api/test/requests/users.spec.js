var Lab       = require('lab'),
    Code      = require('code'),
    Glue      = require('glue'),
    reqlib    = require('app-root-path').require,
    AppConfig = reqlib('/app/config');

process.env.NODE_ENV = "test";

global.reqlib   = require('app-root-path').require;

// shortcuts
var lab         = exports.lab = Lab.script(),
    expect      = Code.expect
    beforeEach  = lab.beforeEach,
    before      = lab.before;

var glueOptions = {
  relativeTo: require('app-root-path').resolve('/app')
};

var server = null;

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

  lab.test('user get endpoint works', function(done) {
    var options = { method: "GET", url: "/users/761e7a03-c731-4d5c-918a-ed8690cf32f2" };
    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});