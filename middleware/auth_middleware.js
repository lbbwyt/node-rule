const util = require('../utils');


function hasPermission(token) {
    if (token == "localhost:3000") {
        return  true
    }
    return false;
}


function auth(req, res, next) {

    console.log(util.toJsonStr(req.headers))

     var token  = req.headers['host']
    if ( token && hasPermission(token) ) {
        next();
    } else {
        next(new Error('Unauthorized'));
    }
}

exports.auth = auth