var Lab       = require('lab'),
    lab       = exports.lab = Lab.script(),
    Glue      = require('glue'),
    reqlib    = require('app-root-path').require,
    AppConfig = reqlib('/app/config');

global.reqlib   = require('app-root-path').require;

var glueOptions = {
  relativeTo: require('app-root-path').resolve('/app')
};

Glue.compose(AppConfig.manifest, glueOptions, function(err, server) {

  if (err){ console.log("Glue Error!", err); }

  server.start(function() {
    
    lab.experiment('Users', function() {
      lab.test('user get endpoint works', function(done) {

        var options = { method: "GET", url: "/users/761e7a03-c731-4d5c-918a-ed8690cf32f2" };

        server.inject(options, function(response) {
          var result = response.result;
          lab.expect(result.status).to.equal(200);
          done();
        });

      });
    });

  });

});