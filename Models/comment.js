
var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var comment = new Schema({
	"formId": Schema.Types.ObjectId,
	"userId": String,
	"commentText": String
});

module.exports = mongoose.model("Comment", comment);