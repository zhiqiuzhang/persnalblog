const express=require("express");
const multer=require("multer");

const upload=express.Router();
const dest="public/upload/";

const uploadMid=multer({dest: dest});
upload.get("/",function(req,res,next){
	res.render("upload");

});

upload.post("/",uploadMid.single("image1"),function(req,res,next){
	const start = req.file.path.indexOf("\\");
	const path = req.file.path.substr(start);
	console.log(path);

	console.log(start);
	const id=req.session.usedId;
	UserModel.findById(id).then((doc)=>{
		doc.avatar=path;
		doc.save();

	})
	res.render("upload", {imgPath: path});


});
module.exports=upload;