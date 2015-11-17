import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    let currentUser = this.get('session.content.currentUser');
    return Ember.$.ajax({
      url: currentUser.repos_url,
      dataType: 'JSON'
    });
  }
});
