import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.authenticatedRoute('index', {
    path: '/'
  });
  this.authenticatedRoute('repos');
  this.route('login');
});

export default Router;
