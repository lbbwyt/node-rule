const util = require('../utils');
const {request} = require("@blueshit/request");
const e = require("express");



const  callAuth = async (token) => {
    // const res = await request({
    //     method: "POST",
    //     url: "http://exmple.com/xxx",
    //     qs: {},
    //     body: { token: token},
    //     json: true,
    // });
    // console.log("status=%s, body=%j", res.statusCode, res.body);

    await  console.log("......")


    return true

}


async function hasPermission(token) {
     return await callAuth(token).then( res => {
        console.log( '请求成功',  res);
        return res;
    }).catch( error => {
            console.log('请求失败', error)
            return false
        }
    )
}


// token 验证， 从header中获取token, 并调用业务系
async function auth(req, res, next) {

    console.log(util.toJsonStr(req.headers))

    var token  = req.headers['host']

    var permission = false

    await  hasPermission(token).then(
        (res )=>{
            permission = res
        }
    )
    if ( token && permission ) {
        next();
    } else {
        next(new Error('Unauthorized'));
    }
}

exports.auth = auth