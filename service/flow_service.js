const undici = require("undici");


var flowService = {
   
};


var  port =  global.config.data['port']

var  nodeHost = 'http://localhost:' + port


/**
 * 获取流程详情
 * @param flowId
 * @returns {Promise<any>}
 */
flowService.getFlowDetail = async function (flowId) {

    var url = nodeHost + '/red/flow/' + flowId

    const {
        statusCode,
        body
    } = await undici.request(url, {
        method: 'GET',
        headers: {
            'env_mode': 'dev' //开发者模式，
        },
    });
    if (statusCode !== 200) {
        console.log(statusCode, '请求失败')
        return
    }
    return  await  body.json()
}


/**
 * 获取全部流程用于重新发布
 * @param flowId
 * @returns {Promise<any>}
 */
flowService.getAllFlowDetail = async function () {

    var url = nodeHost + '/red/flows'

    const {
        statusCode,
        body
    } = await undici.request(url, {
        method: 'GET',
        headers: {
            'env_mode': 'dev' //开发者模式，
        },
    });
    if (statusCode !== 200) {
        console.log(statusCode, '请求失败')
        return
    }
    return  await  body.json()
}







flowService.updateFlow = async function (flowData) {
    var url = nodeHost + '/red/flows'
    const rsp = await undici.fetch(url, {
        method: 'POST',
        headers: {
            'env_mode': 'dev', //开发者模式，
            'content-type': 'application/json'
        },
        body: JSON.stringify(flowData)
    })
    if (rsp.statusCode > 299)  {
        console.log(rsp.status, '请求失败')
        throw  new Error(rsp.statusText)
        return
    }
    if (!rsp) {
        return await rsp.json()
    }
}



module.exports = flowService
