import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.createRecord('user', {firstName: "Tyke"});
  },

  deactivate: function() {
    // TODO
    // remove the model if not already saved
  },

  actions: {
    doSignup: function() {

      let identification = this.currentModel.get('email'),
          password = this.currentModel.get('password'),
          credentials = {
            identification: identification,
            password:       password
          };

      var model = this.currentModel;
      model
        .save()
          .then(() => {
            let authenticator = 'simple-auth-authenticator:jwt';
            this.get('session').authenticate(authenticator, credentials);
          })
          .catch(function(e) {
            alert("ERROR!");
            console.log(e);
          })
    }
  }

});