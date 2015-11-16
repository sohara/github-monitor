import Ember from 'ember';

export default Ember.Object.extend({
  open: function(authentication){
    var authorizationCode = authentication.authorizationCode;
    console.log(authentication);
    return new Ember.RSVP.Promise(function(resolve, reject){
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
          return Ember.$.ajax({
            url: 'https://api.github.com/user?access_token=' + response.access_token,
            dataType: 'json',
            // success: Ember.run.bind(null, resolve),
            // error: Ember.run.bind(null, reject)
          }).then(user => {
            resolve({
              currentUser: user
            });
          });
        }).catch(error => {
          console.log(error);
        });
    }.bind(this)).then(user => {
      // The returned object is merged onto the session (basically). Here
      // you may also want to persist the new session with cookies or via
      // localStorage.
      console.log("User is");
      console.log(user);
      return {
        currentUser: user
      };
    }).catch(function(error) {
      return(error);
    });
  }
});
