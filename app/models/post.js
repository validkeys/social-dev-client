import DS from 'ember-data';

export default DS.Model.extend({

  type: DS.attr('string'),
  body: DS.attr('string'),

  user: DS.belongsTo('user', { inverse: 'posts', async: true }),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')

});