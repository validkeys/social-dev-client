import DS from 'ember-data';

export default DS.Model.extend({
  firstName:  DS.attr('string'),
  lastName:   DS.attr('string'),
  username:   DS.attr('string'),
  email:      DS.attr('string'),

  // password
  password:   DS.attr('string'),

  createdAt:  DS.attr('date'),
  updatedAt:  DS.attr('date')

});
