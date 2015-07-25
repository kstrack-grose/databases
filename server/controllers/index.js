var models = require("../models");
var bluebird = require("bluebird");
var utils = require("../utils/utils.js");
var db = require("../db/index.js");
var bodyParser = require("body-parser");


module.exports = exports = {
  messages: {
    get: function (req, res) {
      db.Message.findAll({
        include : [db.User]
      }).then(function(results) {

        var messages = results.map(function(result) {
          return result.dataValues;
        });

        res.send(JSON.stringify(messages));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {

      db.User.findAll({
        where: {
          username: req.body.username
        }
      }).then(function(users) {
        if (users.length === 0) {
          exports.users.post(req, res, true, function(user) {
            console.log('INSIDE CALLBACK ------------------------>', user);
            var message = db.Message.build({
              UserId: user.dataValues.id,
              message: req.body.text,
              room: req.body.roomname
            });
            message.save().then(function() {
              console.log('message has been saved');
            });

          });
        } else {
          var message = db.Message.build({
            UserId: users[0].id,
            message: req.body.text,
            room: req.body.roomname
          });
          message.save().then(function() {
            console.log('message has been saved');
          });
        }
      });

    res.sendStatus(201).send();  
    }, // a function which handles posting a message to the database
    options: function(req, res) {
      res.sendStatus(200).send();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res, status, callback) {
      var newUser = db.User.build({username: req.body.username});
      newUser.save().then(function(err, results) {
        if (err) { 
          console.log('-------------------------> THERE HAS BEEN AN ERROR');
          console.log(err); 
        } 
        console.log('RIGHT BEFORE CALLBACK ------------------------>', newUser);
        callback(newUser); 
      });

      if (!status) {
        res.sendStatus(201).send();
      }
    }
  }
};


