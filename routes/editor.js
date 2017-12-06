const express = require("express");

const editor = express.Router();
const AModels= require("../models/author");
editor.get("/", function(req, res, next) {
	res.render("editor",{username: req.session.username});
});
editor.all("/*", function(req, res, next) {
	if (req.session.userId) {
		next();
	} else {
		res.redirect("/login");
	}
});
editor.post("/", function(req, res, next) {
	const form = req.body;
	console.log("Form :", form);
	const user=new AModels({
		author: req.session.userId,
		title: form.title,
		content: form.content,

	})
	user.save((err,doc)=>{
		if(err){
			console.log("Error::" ,err);
			}

			console.log("Doc",doc)
	})

	// res.send("ok");
	res.redirect("/user");
});

module.exports = editor;