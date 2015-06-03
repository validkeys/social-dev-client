import Ember from 'ember';

export function initialize(application) {
  console.log("Initializing!!!");
  var session = application.container.lookup("simple-auth-session:main"),
      store   = application.container.lookup("store:main");
  
  session.reopen({
    currentUser:    null,
    tokenData:      {},
    setCurrentUser: function(){
      console.log("HELLO!");
      var token     = this.get('token'),
          tokenData = (token && token !== null) ? JSON.parse(atob(this.get('token').split('.')[1])) : null;

      console.log("GOT TOKEN", token, tokenData);

      this.set("tokenData", tokenData);
      var _this = this;

      if (!token || token === null) { return; }

      Ember.run(this, function() {
        console.log("Fetching user...");
        var appIsReady = application.container.lookup("controller:application").get("isReady");
        if (!appIsReady) {
          application.deferReadiness();
        }
        store
          .find('user', tokenData.user.id)
          .then(function(user) {
            _this.set("currentUser", user);
          })
          .catch(function(err) {
            console.warn("ERROR FETCHING CURRENT USER!", err);
          })
          .finally(function() {
            if (!appIsReady) {
              return application.advanceReadiness();
            }
          });
        });
    }.observes('token').on('init')
  });
}

export default {
  name:       'session',
  initialize: initialize
};
