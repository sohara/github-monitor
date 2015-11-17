import Ember from 'ember';

export default Ember.Object.extend({
  open: function(authentication){
    let authorizationCode = authentication.authorizationCode;
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
