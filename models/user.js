const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		match: /[a-zA-Z][0-9a-zA-Z_-]{3,20}/,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	email: {
		type: String,
	},
	status: Boolean, // true: 正常， false: 禁用
	createAt: {
		type: Date,
		default: Date.now
	},
	avatar: String,
	// image: String,
	// profile: {
	// 	sex: Boolean, // true : 男, false: 女
	// 	qq: String,
	// 	weixin: String,
	// }
});

const UserModel = mongoose.model("user", UserSchema, "user");

module.exports = UserModel;