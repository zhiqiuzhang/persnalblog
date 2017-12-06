const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	author:{
        type: mongoose.Schema.Types.ObjectId,
	},
	title: String,
	content: String,
	createAt: {
		type: Date,
		default: Date.now
	},
	
});

const AModels = mongoose.model("atical", UserSchema, "atical");

/*ArticalModel.methods.findAuthor = function(cb) {
	UserModle.findById(this.author).then((doc) => {
		cb(doc)
	})
}*/
// art UserModle.findById(art.author, (err, doc))

// ArticalModel.find({autor: user._id})

module.exports = AModels;