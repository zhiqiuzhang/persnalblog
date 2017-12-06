var express = require('express');
const multer = require("multer");
var users = express.Router();
const UserModel = require("../models/user");
const AModels = require("../models/author");
const path = require("path");
const upload = express.Router();
const dest = "public/static/img/";
const uploadMid = multer({dest: dest});
// const upload = express.Router();

/* GET users listing. */

users.all("/*", function(req, res, next) {
	if (req.session.userId) {
		next()
	} else {
		res.redirect("/login");
	}
});

users.get("/", function(req, res, next) {
	if (req.session.userId) {
		next()
	} else {
		res.redirect("/login");
	}
}, function(req, res, next) {
	const user = req.session.username;
	const id=req.session.userId;
	console.log("123",user)
	console.log("456",id)
	UserModel.findById(id).then((doc) => {
		const username = doc.username;
		let avatar = doc.avatar;
		if (!avatar) {
			avatar = "/static/img/gd.jpg"
		}

		AModels.find({author: doc._id})
		.then((docs) => {
			res.render("usercenter", {username: user, user: doc, articles: docs,avatar: avatar});
		})

		// res.render("usercenter", {avatar: avatar});
	}).catch((e) => {
		if (e) {
			console.log("Error: ", e);
		}	
		next(e);
	});

	// res.render("usercenter", {username: user});
	// console.log(username);
})

users.post("/setavatar", uploadMid.single("avatar"), function(req, res, next) {
	console.log("File :", req.file);
	// \\\
	const filePath = req.file.path.replace(/\\/g, "/");
	const start = filePath.indexOf("/");
	// 生成前端可以访问到的路径；
	const path = filePath.substr(start);
	console.log(path);
	UserModel.findById(req.session.userId)
	.then((doc) => {
		doc.avatar = path;
		doc.save();
		res.redirect("/user");
	})
	.catch((err) => {
		console.log("Error :", err);	
		next(err);
	})

})



users.get("/logout", function(req, res, next) {
	req.session.destroy();
	res.redirect("/");
})
users.get("/usercenter",function(req,res){
	res.render("usercenter")

})

module.exports = users;
