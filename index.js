// libraries
var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	jsonWebToken = require("jsonwebtoken"),
	morgan = require("morgan"),
	app = express();

// making a connection to database
mongoose.connect("mongodb://localhost/final_project");
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function () {
	console.log('Connected to mongodb');
})*/

// port
//var port = process.env.PORT || 8000;

// bodyParser to deal with json data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// to log request to console
app.use(morgan('dev'));
app.set("secret", "finalYearProject");

// accessing Schema's modules 
var DonateForm = require("./Models/donationForm");
	Comment = require("./Models/comment"),
	Donor = require("./Models/donor"),
	User = require("./Models/user");

// api module for public api's and private api's*
var api = require("./API/api")(app, [DonateForm, Comment, Donor, User]);


// main route
app.get('/', function (req, res) {
	res.send("<h1>Hello world</h1><style>h1{font-size: 100px;}</style>");
});

// public and private route
app.use('/api/public', api.public);
app.use('/api/private', api.private);

// running the server
app.listen(process.env.PORT || 3000, function() {
	console.log("I am running on port " + port);
});
