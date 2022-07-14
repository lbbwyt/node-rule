const util = require('../utils');


function hasPermission(token) {
    if (token == "localhost:3000") {
        return  true
    }
    return false;
}




// token 验证， 从header中获取token, 并调用业务系
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