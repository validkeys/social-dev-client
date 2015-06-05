export function initialize(container, application) {
  application.inject('component:content-publisher', 'store', 'store:main');
}

export default {
  name: 'store-to-components',
  initialize: initialize
};
