
var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var donationForm = new Schema({
	"contactNo": Number,
	"patientName": String,
	"bloodGroup": String,
	"units": Number,
	"city": String,
	"country": String,
	"hospital": String,
	"unitsGiven": Boolean,
	"info": String,
	"userId": String,
	"emali": String,
	"inDays": Number
});

module.exports = mongoose.model("DonationForm", donationForm);