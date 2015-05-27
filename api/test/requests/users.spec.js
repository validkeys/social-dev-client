var Setup     = require(require('app-root-path').resolve('/test/setup'));
    
// shortcuts
var lab         = exports.lab = Lab.script(),
expect      = Code.expect,
beforeEach  = lab.beforeEach,
before      = lab.before,
after       = lab.after,
afterEach   = lab.afterEach;

var glueOptions = {
  relativeTo: require('app-root-path').resolve('/app')
};

var server = null,
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
    // user = new User({firstName: "Test", lastName: "Last", email: "ts@t.com", username: "asdf", password: "password"});
    // user.save().then(function(){ done(); });
  });

  afterEach(function( done ) {
    console.log("after");
    user.delete().then(function(){
      user = null;
      done();
    });
  });

  lab.test('user get endpoint works', function(done) {
    var options = { method: "GET", url: "/users/" + user.id };
    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});