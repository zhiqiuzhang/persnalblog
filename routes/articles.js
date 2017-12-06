const express = require("express");
const articles= express.Router();
const AModels= require("../models/author");
const Commentodels= require("../models/comment");

articles.get("/:id", function(req, res, next) {
	// /article/?id=1231serst
	const id = req.params.id;
	console.log(id);
	AModels.findById(id)
	.then((doc) => {
		Commentodels.find({artical: id})
		.then((docs) => {
			console.log(id);
			console.log("Docs",docs);
			res.render("articles", {articles: docs,atical: doc,username: req.session.username});
		})
		// res.render("articles", {atical: doc});
	})
	.catch((e) => {
		console.log("Error:", e);	
		next(e);
	})
});
articles.post("/",function(req,res,next){
	const form=req.body;
	console.log(form);
	console.log(req.header("Referer"));
	const referer=req.get("Referer");
	const lastPath=referer.lastIndexOf("/");
	const id=referer.substr(lastPath+1);

	const com = new Commentodels({
		author: req.session.username || "游客", 
		content: form.content,
		artical: id,
	})
	com.save((err,doc)=>{
		if(err){
			return console.log("Error::",err);

			}
		res.redirect('back');    
		// res.location("back");
 		// res.redirect("/");
		// console.log("Doc",doc)
		// const id = req.session.userId;
		// console.log(id);
		// let author=doc.author;
		// let content=doc.content;
		// Commentodels.findById({artical: doc._id})
		// .then((docs) => {
		// 	console.log(id);
		// 	console.log(docs);
		// 	res.render("articles", {articles: docs});
		// })
		// .catch((e) => {
		// 	console.log("Error:", e);	
		// 	next(e);
		// })
	})

})


module.exports = articles;