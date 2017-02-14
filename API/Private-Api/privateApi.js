
var express = require('express'),
	jwt = require("jsonwebtoken");

var privateApi = function (app, modelsArr) {
	// for Routing
	var privateRouter = express.Router();

	// middleware to verify token, if token is valid it will call
	// the route which is access by api
	privateRouter.use(function(req, res, next) {
		var token = req.body.token || req.headers['token'];
		if (token) {
			// varifying token and secret
			jwt.verify(token, app.get('secret'), function(err, decoded) {
				if(err){
					if (err.message === "jwt expired") {
						return res.status(401).json({success:false, token: "Token expired"});
					}
					console.log("error 5000")
					return res.status(500).json({success: false, token: err});
				}

				if (req.body.token) {
					delete req.body.token;
				}
				req.decoded = req;
				next();
			});

		} else {
			return res.status(500).json({success: false, token: "Token not found"});
		}
	});

	privateRouter.get('/', function (req, res) {
		// "<h1>You are in private API.</h1>"
		res.json(req.decoded);
	});

	// post a donation forms
	privateRouter.post('/donationforms', function(req, res){
		var donateForm = new modelsArr[0](req.body);
		donateForm.save(function(err) {
			if (err){
				console.log("error 500");
				return res.status(500).json({success: false, error: err});
			}
			else
				res.status(201).json({success: true, donateForm: donateForm});
		});
	});

	// post a comment
	privateRouter.post('/comments', function(req, res) {
		var comment = new modelsArr[1](req.body);
		comment.save(function (err) {
			if (err) 
				return res.status(500).json({success: false, error: err});
			else
				res.status(201).json({success: true, comment: comment});
		});
	});

	return privateRouter;
}

module.exports = privateApi;