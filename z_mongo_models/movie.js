var mongoose = require("mongoose");
var movie_schema = require("../z_mongo_schemas/movie");

var movie_model = mongoose.model("movie_model", movie_schema);

module.exports = movie_model;
