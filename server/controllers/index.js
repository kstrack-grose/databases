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

      db.User.findOrCreate({
        where: {
          username: req.body.username
        }
      }).then(function(user) {
        var message = db.Message.build({
          UserId: user[0].dataValues.id,
          message: req.body.text,
          room: req.body.roomname
        });
        message.save().then(function() {
          console.log('message has been saved');
          res.sendStatus(201).send();
        });
      });
  
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
          console.log(err); 
        } 
        callback(newUser); 
      });

      if (!status) {
        res.sendStatus(201).send();
      }
    }
  }
};


