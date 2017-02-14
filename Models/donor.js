
var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var donor = new Schema({
	"hasGiven": Boolean,
	"formid": Schema.Types.ObjectId,
	"userId": String
});

module.exports = mongoose.model("Donor", donor);