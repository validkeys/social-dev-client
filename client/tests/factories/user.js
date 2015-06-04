import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('user', {

  sequences: {
    userFirstName: (n) => `First ${n}`,
    userLastName:  (n) => `Last ${n}`,
    userEmail:     (n) => `email-${n}@gmail.com`,
    userUsername:  (n) => `username${n}`
  },

  default: {
    firstName: FactoryGuy.generate('userFirstName'),
    lastName:     FactoryGuy.generate('userLastName'),
    email:        FactoryGuy.generate('userEmail'),
    username:     FactoryGuy.generate('userUsername'),

    createdAt: new Date(),
    updatedAt: new Date()
  }

});

export default {};