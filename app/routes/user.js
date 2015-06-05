import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    return this.store.findOne('user', { username: params.username });
  },

  serialize: function(model) {
    return { username: model.get('username') };
  }

});
