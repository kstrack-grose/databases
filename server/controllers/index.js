var models = require("../models");
var bluebird = require("bluebird");
var utils = require("../utils/utils.js");
var db = require("../db/index.js");
var bodyParser = require("body-parser");


module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      // db.connection.query("insert into `messages` (`userid`, `message`, `room`) value (2, '" + req.body.message +
      //    "', '" + req.body.roomname + "')", 
      //   function(err, results) {
      //     if (err) {console.log(err); } 
      //     else {console.log(results); } 
      //   });

      db.connection.query("insert into `messages` (message) value ('red the blood of angry men')",
        function(err, results) {
          if (err) {console.log(err);}
          else {console.log("callback from insert into messages");}
        });

    res.sendStatus(201).send();  
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      db.connection.query("insert into `users` (username) value ('Marius')", 
        function(err, results) {
          if (err) {console.log(err); } 
          else {console.log("callback from insert into users"); } 
        });

      res.sendStatus(201).send();
    }
  }
};


