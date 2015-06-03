import Session from 'simple-auth/session';
import Ember from 'ember';

export function initialize(instance) {
  Session.reopen({
    currentUser:    null,
    tokenData:      {},
    setCurrentUser: function(){
      var token     = this.get('token'),
          tokenData = (token && token !== null) ? JSON.parse(atob(this.get('token').split('.')[1])) : null;

      console.log("GOT TOKEN", token, tokenData);

      this.set("tokenData", tokenData);
      var _this = this;

      if (!token || token === null) { return; }

      Ember.run(this, function() {
        console.log("Fetching user...");
        var appIsReady = instance.container.lookup("controller:application").get("isReady");
        if (!appIsReady) {
          application.deferReadiness();
        }
        instance.container.lookup('store:main')
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
    }.observes('isAuthenticated').on('init')
  });
}

export default {
  name:       'session',
  // before:     'simple-auth',
  initialize: initialize
};
