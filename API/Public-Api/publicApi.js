
var express = require("express"),
	jwt = require("jsonwebtoken"),
	htmlResponse = "<h1>You are in Public Api.</h1>\
					<a href='http://localhost:8000/api/public/donationForms'>\
					Donation Forms</a>";

var publicApi = function (app, modelsArr) {
	// for routing
	var	publicRouter = express.Router();

	publicRouter.get('/', function (req, res) {
		res.send(htmlResponse);
	});

	// get all donation forms
	publicRouter.get('/donationForms', function(req, res){
		modelsArr[0].find({}, function(err, forms){
			if (err)
				return res.status(500).json({success: false, error: err});
			else
				res.status(201).json({success: true, forms: forms});
		});
	});

	// get all comments according to their donation forms 
	publicRouter.get('/comments/:formId', function(req, res){
		var query = req.params.formId;
		modelsArr[1].find({formId: query}, function(err, comments){
			if (err)
				return res.status(500).json({success: false, error: err});
			else
				res.status(201).json({success: true, comments: comments});
		});
	});

	// register a user
	publicRouter.post('/register', function(req, res) {
		var data = req.body;
		// if you don't find a user then register it
		if (data.username && data.email && data.password && data.bloodGroup) {
			modelsArr[3].find({username: data.username, email: data.email}, function(err, user){
				console.log(user);
				if (err)
					return res.status(500).json({success: false, error: err});
				if (user.length < 1) {
					var User = new modelsArr[3](data);
					User.save(function (err) {
						if (err)
							return res.status(500).json({success: false, error: err});
						else
							res.status(201).json({success: true, user: User});
					});
				} else {
					res.json({success: false, user: "This credentials already have used."});
				}
			});
		} else {
			res.json({success: false, requirement: "incomplete"});
		}
	});

	// for logging in 
	publicRouter.post('/login', function(req, res) {
		var data = req.body;
		// if user found send a signed token, 
		modelsArr[3].findOne({username: data.username}, function(err, user) {
			if (err)
				return res.status(500).json({success: false, error: err});
			if (!user)
				return res.status(203).json({success: false, user: "Invalid username/email"});
			else if (user) {
				if (user.password != data.password) {
					console.log(user.password + " " + user + " : " + data.password);
					return res.status(401).json({success: false, user: "Invalid password"});
				} else {
					// generating and signing a token
					var Token = jwt.sign(user, app.get('secret'), {expiresIn: 300});
					console.log({"Token":Token});
					res.status(201).json({
						"success": true,
						"token": Token,
						"user": user
					});
				}
			}
		});
	});

	return publicRouter;
};
module.exports = publicApi;