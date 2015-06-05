import Ember from 'ember';

export default Ember.Controller.extend({
  identification: null,
  password:       null,

  actions: {

    // TODO:
    // This is also used in the signup route
    // should consider DRYing this up
    authenticate: function() {
      var credentials = this.getProperties('identification', 'password'),
        authenticator = 'simple-auth-authenticator:jwt';
      this.get('session').authenticate(authenticator, credentials);
    }
  }
});