
export default Ember.Route.extend({
actions: {
    githubSignin: function(){
      let route = this;
      let controller = this.controllerFor('login');
      // The provider name is passed to `open`
      this.get('session').open('github-oauth2').then(function(){
        route.transitionTo('index');
      }, function(error){
        controller.set('error', 'Could not sign you in: ' + error.responseJSON.message);
      });
    }
  }
});
