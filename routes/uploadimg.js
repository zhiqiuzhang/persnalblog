const express = require("express");
const multer = require("multer");

const uploadimg = express.Router();

const uploadMid = multer({ dest: "public/images" })

uploadimg.post("/", uploadMid.single("upload"), function(req, res, next) {
	const funcNum = req.query.CKEditorFuncNum;
	console.log("File :",req.file);
	// 为了兼容windows
	const reqPath=req.file.path.replace(/\\/g, "/");
	const start = reqPath.indexOf("/");
	console.log(reqPath);
	// 生成前端可以访问到的路径；
	const path = reqPath.substr(start);
	res.send(`<script>window.parent.CKEDITOR.tools.callFunction(${funcNum}, '${path}')</script>`);
});

module.exports = uploadimg;