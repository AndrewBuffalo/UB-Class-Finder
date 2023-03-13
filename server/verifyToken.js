const jwt = require('jsonwebtoken');
require("dotenv/config");

function verifyToken(req,res,next){
	req.anonymous = true;
	req.JWTBody = {};
	if(typeof req.cookies.token === 'undefined' || !req.cookies.token || req.cookies.token == ''){
		next();
	} else {
		if(typeof req.cookies.token !== 'undefined'){
			jwt.verify(req.cookies.token, process.env.SECRET, function(err, decoded) {
				if(err){
					console.error(err);
				} else {
					req.anonymous = false;
					req.JWTBody = decoded;
					next();
				}
			});
		} else {
			res.status(403).send(null);
		}
	}
}
module.exports = verifyToken;