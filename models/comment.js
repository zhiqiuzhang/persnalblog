const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	content: {
		type: String,
	},
	author: {
		type: String,
		required: true
	},
	artical: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
	},
	createAt: {
		type: Date,
		default: Date.now
	}
	
});

const Commentodels = mongoose.model("comment", UserSchema, "comment");

/*ArticalModel.methods.findAuthor = function(cb) {
	UserModle.findById(this.author).then((doc) => {
		cb(doc)
	})
}*/
// art UserModle.findById(art.author, (err, doc))

// ArticalModel.find({autor: user._id})

module.exports = Commentodels;