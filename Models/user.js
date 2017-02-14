// User Schema
var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var user = new Schema({
	"email": String,
	"firstName": String,
	"lastName": String,
	"country": String,
	"city": String,
	"contactNo": Number,
	"profilePic": String,
	"password": String,
	"username": String,
	"bloodGroup": String
});

module.exports = mongoose.model("User", user);