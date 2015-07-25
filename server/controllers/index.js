var models = require("../models");
var bluebird = require("bluebird");
var utils = require("../utils/utils.js");
var db = require("../db/index.js");
var bodyParser = require("body-parser");


module.exports = exports = {
  messages: {
    get: function (req, res) {
      // db.sequelize.findAll({
      //   where: {
      //     userid: 
      //   }
      // });


      db.connection.query("select * from messages, users where messages.userid = users.id", function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send(JSON.stringify(result));
        }
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {

      db.User.findAll({
        where: {
          username: req.body.username
        }
      }).then(function(users) {
        if (users.length === 0) {
          exports.users.post(req, res, true);
        } else {
          var message = db.Message.build({
            UserId: users[0].id,
            message: req.body.message,
            room: req.body.room
          });
        }
      });



      // db.connection.query("select id from users where username = ?", [req.body.username], function(err, results) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     if (results.length === 0) {
      //       exports.users.post(req, res, true);

      //       db.connection.query("select id from users where username = ?", [req.body.username], function(err, results) {
      //         if (err) {
      //           console.log(err);
      //         } else {
      //           db.connection.query("insert into `messages` (`userid`, `message`, `room`) value (?, ?, ?)", 
      //             [results[0].id, req.body.text, req.body.roomname],
      //             function(err, results) {
      //               if (err) {console.log(err); } 
      //               else {} 
      //           });  
      //         }
      //       });
      //     } else {
      //       db.connection.query("insert into `messages` (`userid`, `message`, `room`) value (?, ?, ?)", 
      //         [results[0].id, req.body.text, req.body.roomname],
      //         function(err, results) {
      //           if (err) {console.log(err); } 
      //           else {} 
      //       }); 
      //     }
      //   }
      // });




    res.sendStatus(201).send();  
    }, // a function which handles posting a message to the database
    options: function(req, res) {
      res.sendStatus(200).send();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res, status) {
      console.log('--------------->', req.body.username);
      var newUser = db.User.build({username: req.body.username});
      newUser.save().then(
        function(err, results) {
          if (err) {console.log(err); } 
          else {} 
        });

      if (!status) {
        res.sendStatus(201).send();
      }
    }
  }
};


