var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");

var schema1 = new mongoose.Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    updated_at: Date,
    created_at: Date
});

schema1.pre("save", function(func1_Name) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    func1_Name();
});

var model1 = mongoose.model("shuyu", schema1);
module.exports = model1;
