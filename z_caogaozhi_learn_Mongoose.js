var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");

var TestSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    email: {type: String},
    time: {type: Date, default: Date.now}
});

var TestModel = db.model("table1", TestSchema);

var TestEntity = new TestModel({
    name: "LXT",
    age: 20,
    email: "lxt@gmail.com"
});


TestEntity.save(function(err, doc){
    if(err){
        console.log("lxt's error is: " + err);
    } else {
        console.log(doc);
    }
});
