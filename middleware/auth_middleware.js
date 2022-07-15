const util = require('../utils');
const {request} = require("@blueshit/request");
const e = require("express");
const undici = require("undici");


var  iotHost =  global.config.data['iot_host']



const  callAuth = async (token) => {

       var  url = iotHost + '/jeecg-boot/sys/token/verify?X-Access-Token=' + token
        console.log(url)
        const {
            statusCode
        } = await  undici.request(url, {
            method: 'GET'
        });
        console.log(statusCode)
        if (statusCode != 200 ) {
            return false
        }
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

    var token  = req.headers['X-Access-Token']

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