import Ember from 'ember';
const { computed } = Ember;
const { oneWay } = computed;

export default Ember.Controller.extend({
  currentUser: oneWay('session.content.currentUser')
});

