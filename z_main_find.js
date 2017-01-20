
var model1 = require("./z_model1");


model1.find({}, function(err, users) {
  if (err) throw err;

  // object of the user
  console.log(users);
});


model1.findById(587439b747b34291191659a8, function(err, user) {
    if (err) throw err;

    console.log(user);
});
