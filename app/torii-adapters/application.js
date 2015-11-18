import Ember from 'ember';

export default Ember.Object.extend({
  fetch(authentication) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      let access_token = Ember.$.cookie('access_token');
      if (!access_token) {
        reject(false);
        return false;
      }
      Ember.$.ajaxSetup({
        headers: {
          "Authorization": `token ${access_token}`
        }
      });
      Ember.$.ajax({
        url: 'https://api.github.com/user',
        dataType: 'JSON',
      }).then(user => {
        resolve({
          currentUser: user
        });
      }, error => {
        reject(error);
      });
    });
  },

  open(authentication) {
    let authorizationCode = authentication.authorizationCode;
    Ember.$.cookie('authorizationCode', authorizationCode);
    console.log(authentication);
      return Ember.$.ajax({
        url: 'login/oauth/access_token',
        type: 'POST',
        dataType: 'JSON',
        data: {
          'client_id': '2ea030a9fbacfc7c6a63',
          'client_secret': 'ada5b0532b20761b645eae8ed69f8162f4b5547d',
          'code': authorizationCode,
        }
      }).then(response => {
        console.log(response);
        Ember.$.cookie('access_token', response.access_token);
        Ember.$.ajaxSetup({
          headers: {
            "Authorization": `token ${response.access_token}`
          }
        });
        return Ember.$.ajax({
          url: 'https://api.github.com/user',
          dataType: 'JSON',
        }).then(user => {
          return {
            currentUser: user
          };
        });
      });
  }
});
