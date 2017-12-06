var express = require('express');
var register = express.Router();
const { UserModel }=require("../models");
const getCcap = require("../utils/getCaptcha");
const hmac = require("../utils/hash");

/* GET home page. */
register.get("/", function(req, res, next) {
	/*console.log("Session :", req.session);
	console.log("Session Id:", req.session.id)
	console.log("Cookie :", req.cookies.Carp)
	let username = ""
	if (req.session.username) {
		username = req.session.username;
	}*/
	getCcap(function(cap){
		console.log("Cap text: ", cap.text);
		req.session.captcha=cap.text;
		res.render("register",{captcha: cap.buffer});
	});
	
});
register.post("/",function(req,res,next){
	const form=req.body;
	var check={};
	console.log(form);
	const hashPass=hmac(form.password);
	const user=new UserModel({
		username: form.username,
		password: hashPass,
		phone: form.phone,
		email: form.email,
	})
	console.log(user);
	user.save((err,doc)=>{
		if(err){
			console.log("Err::::",err);

		}

		
		if (req.session.captcha !== form.captcha) {
			return getCcap((cap) => {
				console.log("Cap text: ", cap.text);
				req.session.captcha = cap.text;
				res.render("register", {
					captcha: cap.buffer,
					errMessage: "验证码错误，请重新输入",			
				});

			})
		}
		/*if (err.message.indexOf('duplicate key error') !== -1) {
			check.userErr = "用户名已经存在";
			// console.log("Check", check);
			// res.render("register", {checkk: "用户名已经存在"});
		}*/
		// res.render("register", {check: check});
		if(!err){
			// console.log(form);
			req.session.userId = doc._id;
			req.session.username = doc.username;
			res.redirect("/");
			console.log("user");
			return
		}
		/*if(err){
			console.log(err);
		}*/

		res.redirect("/login");
		// res.render("register",{check: check});
	})

	})

	/*console.log(form);
	const form1=new UserModel(form);
	form1.save((err,doc)=>{
		if(err){
			console.log(err);
		}
		console.log("Doc: ",doc);
		res.redirect("/login");
	})

})*/

module.exports = register;