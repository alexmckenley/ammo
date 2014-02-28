var loginHelpers = require('../loginHelpers');
var dbHelpers = require('../dbHelpers');

/* ======== User Controllers ========*/

module.exports = {

  login: function(req, res){
    loginHelpers.validateUser(req.body.code, req.cookies['ammoio.sid'])
    .then(function(user){
      res.send(user);
    })
    .fail(function(err){
      console.log('why the error', err);
      res.send(500);
    });
  },

  logout: function(req, res){
    loginHelpers.closeSession(req.params.username)
    .then(function(username){
      res.send("Successfully logged out User:", username);
    })
    .fail(function(err){
      console.log("Error logging out: ", err);
      res.send(500);
    });
  },

  getUser: function(req, res){
    dbHelpers.getUser({sessionId: req.cookies['ammoio.sid']})
    .then(function(user){
      console.log(user);
      res.send(user);
    })
    .fail(function(err){
      res.send(500);
    });
  }

};