const crypto = require("crypto");
const secret = "120283qlalksdjglajglajhlka09385058ljdlj";

const hmac = function(str) {
	const hmac1 = crypto.createHmac("sha256", secret);
	hmac1.update(str);
	return hmac1.digest("hex");
}


module.exports = hmac;