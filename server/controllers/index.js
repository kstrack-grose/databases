var models = require("../models");
var bluebird = require("bluebird");
var utils = require("../utils/utils.js");
var db = require("../db/index.js");
var bodyParser = require("body-parser");


module.exports = {
  messages: {
    get: function (req, res) {
      db.connection.query("select * from messages", function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send(JSON.stringify(result));
        }
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      db.connection.query("select id from users where username = ?", [req.body.username], function(err, results) {
        if (err) {
          console.log(err);
        } else {
          db.connection.query("insert into `messages` (`userid`, `message`, `room`) value (?, ?, ?)", 
            [results[0], req.body.message, req.body.roomname],
            function(err, results) {
              if (err) {console.log(err); } 
              else {} 
          });
        }
      });

    res.sendStatus(201).send();  
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      db.connection.query("insert into `users` (username) value ( ? )", [req.body.username], 
        function(err, results) {
          if (err) {console.log(err); } 
          else {} 
        });

      res.sendStatus(201).send();
    }
  }
};


