
var flowService = require('../service/flow_service')
const {json} = require("express");

/**
 * 启用或者停用流程
 * @param req
 * @param res
 * @param next
 */
function onOff(req, res, next) {

    var flowId = req.params.id   //取url路径中的id
    var disabled = req.query.disabled // 取查询参数
    //获取流程详情
    flowService.getAllFlowDetail().then(r => {
        if (!r) {
            res.send({
                "success": false,
                "detail" :  'get all flow detail error'
            })
            return
        }
        // 通过id过来要修改数流程新增，
        r.forEach((e) =>{
            if (e.id === flowId) {
                e.disabled = disabled
            }
        })
        // //修改并重新发布流程
        flowService.updateFlow(r).then( data => {
                res.send({
                    "success": true,
                    "detail" : data
                })
        }
        ).catch(e => {
            console.log(e)
            res.send({
                "success": false,
                "detail" :  e
            })
        })
    }).catch(e => {
        console.log(e)
        res.send({
            "success": false,
            "detail" :  e
        })
    })
}

exports.onOff = onOff;