
var model1 = require("./z_model1");

var sb1 = new model1({
    name: "KaiwenPeng",
    username: "sevilayha",
    password: "password"
});

sb1.save();

var sb2 = model1({
  name: 'Peter Quill',
  username: 'starlord55',
  password: 'password',
  admin: true
});

sb2.save();


User.find({}, function(err, users) {
  if (err) throw err;

  // object of the user
  console.log(users);
});


model1.find({username: "starlord55"}, function(err, user) {
    if (err) throw err;

    console.log(user);
});
