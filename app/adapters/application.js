import DS from 'ember-data';

DS.RESTAdapter.reopen({
  coalesceFindRequests: true
});

export default DS.RESTAdapter.extend({
});
