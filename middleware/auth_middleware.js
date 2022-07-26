const undici = require("undici");


var  iotHost =  global.config.data['iot_host']



const  callAuth = async (token) => {

       var  url = iotHost + '/jeecg-boot/sys/token/verify?X-Access-Token=' + token
        const {
            statusCode
        } = await  undici.request(url, {
            method: 'GET'
        });
        if (statusCode == 200 ) {
            return false
        }
        return true
}


async function hasPermission(token) {
     return await callAuth(token).then( res => {
        return res;
    }).catch( error => {
            return false
        }
    )
}


// token 验证， 从header中获取token, 并调用业务系
async function auth(req, res, next) {

    var envMode = req.headers['env_mode']
    if (envMode && envMode === 'dev') {
        next();
        return
    }


    var token  =  'test'//todo  req.headers['X-Access-Token']
    var permission = true // todo , 修改未false

    // await  hasPermission(token).then(
    //     (res )=>{
    //         permission = res
    //     }
    // )

    if ( token && permission ) {
        next();
    } else {
        next(new Error('Unauthorized'));
    }
}

exports.auth = auth