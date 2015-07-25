var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat'
});

exports.connection.connect();

/*** SEQUELIZE ***/

var Sequelize = require('sequelize');
exports.sequelize = new Sequelize('chat', 'root', '');

exports.User = exports.sequelize.define("User", {
  username : Sequelize.STRING
});

exports.Message = exports.sequelize.define("Message", {
  message : Sequelize.STRING,
  room : Sequelize.STRING
});

exports.Message.belongsTo(exports.User, {constraints: false});
exports.User.hasMany(exports.Message, {constraints: false});

exports.User.sync({force: true}).then(function() {
  var newUser = exports.User.build({username: "Jean Valjean"});
  newUser.save().then(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    exports.User.findAll({ where: {username: "Jean Valjean"} }).then(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});

exports.Message.sync({force: true}).then(function() {
  console.log('we successfully synced the sequelized object.');
});



