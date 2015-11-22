import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    let currentUser = this.get('session.content.currentUser');
    return Ember.$.ajax({
      url: 'https://api.github.com/user/repos?per_page=100&sort=pushed',
      dataType: 'JSON'
    });
  }
});
