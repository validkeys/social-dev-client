import Ember from 'ember';

export default Ember.Component.extend({

  type: "message",
  body: "",

  actions: {
    submit: function() {
      let newPost = this.store.createRecord('post');

      newPost.setProperties({
        type: this.get('type'),
        body: this.get('body'),
        uesr: this.get('session.currentUser')
      });

      newPost.save();
    }
  }

});
