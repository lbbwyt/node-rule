var assert = require('assert');

var undici = require('undici')

var config = require('../config/config')


describe('Config', function () {
    describe('#init()', function () {
        it('ok', function () {

            config.init()
            console.log(config.data)


        });
    });
});




describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});




describe('utils', function () {
    describe('#http_get()', function () {
        it('ok', async function () {
            const {
                statusCode,
                headers,
                trailers,
                body
            } = await undici.request('http://localhost:3000/users/1', {
                method: 'GET'
            });
            console.log('response received', statusCode)
            console.log('headers', headers)
            for await (const data of body) {
                console.log('data', data.toString());
            }
            console.log('trailers', trailers)
            assert.equal(statusCode, 200);
        });
    });
});



describe('iot', function () {
    describe('#auth()', function () {
        it('ok', async function () {
            const {
                statusCode,
                headers,
                trailers,
                body
            } = await undici.request('http://172.19.8.211:8085/jeecg-boot/sys/token/verify?X-Access-Token=234', {
                method: 'GET'
            });
            console.log('response received', statusCode)
            console.log('headers', headers)
            for await (const data of body) {
                console.log('data', data.toString());
            }
            console.log('trailers', trailers)
            assert.equal(statusCode, 200);
        });
    });
});






describe('List', function () {
    describe('#foreach()', function () {
        it('ok', async function () {
            var list = JSON.parse(`[
                {
                    "id": "129f25fa4bd8371b",
                    "type": "tab",
                    "disabled": true
                },
                {
                    "id": "ade2897ab964dadc",
                    "type": "tab",
                    "label": "流程 2",
                    "disabled": true,
                    "info": "",
                    "env": []
                },
                {
                    "id": "9e0b47783b0adb0e",
                    "type": "mqtt in",
                    "z": "129f25fa4bd8371b",
                    "name": "",
                    "topic": "",
                    "qos": "2",
                    "datatype": "auto",
                    "nl": false,
                    "rap": true,
                    "rh": 0,
                    "inputs": 0,
                    "x": 390,
                    "y": 280,
                    "wires": [
                        [
                            "d9adee99aec3ffc6"
                        ]
                    ]
                },
                {
                    "id": "d9adee99aec3ffc6",
                    "type": "mqtt out",
                    "z": "129f25fa4bd8371b",
                    "name": "",
                    "topic": "",
                    "qos": "",
                    "retain": "",
                    "respTopic": "",
                    "contentType": "",
                    "userProps": "",
                    "correl": "",
                    "expiry": "",
                    "x": 670,
                    "y": 460,
                    "wires": []
                },
                {
                    "id": "8bcdd5f939c75f16",
                    "type": "http in",
                    "z": "ade2897ab964dadc",
                    "name": "",
                    "url": "",
                    "method": "get",
                    "upload": false,
                    "x": 190,
                    "y": 400,
                    "wires": [
                        [
                            "948801dadbbc309c"
                        ]
                    ]
                },
                {
                    "id": "948801dadbbc309c",
                    "type": "http request",
                    "z": "ade2897ab964dadc",
                    "name": "",
                    "method": "GET",
                    "ret": "txt",
                    "paytoqs": false,
                    "url": "",
                    "persist": false,
                    "authType": "",
                    "senderr": false,
                    "x": 600,
                    "y": 320,
                    "wires": [
                        []
                    ]
                },
                {
                    "id": "5a9aee6c6d6ee3c8",
                    "type": "http in",
                    "z": "ade2897ab964dadc",
                    "name": "",
                    "url": "",
                    "method": "get",
                    "upload": false,
                    "x": 210,
                    "y": 520,
                    "wires": [
                        [
                            "948801dadbbc309c"
                        ]
                    ]
                }
            ]`)

            list.forEach((e) =>{
                if (e.id === '129f25fa4bd8371b') {
                    console.log(e.disabled)
                    e.disabled = false
                }
            })

            list.forEach((e) =>{
                if (e.id === '129f25fa4bd8371b') {
                   console.log(e.disabled)
                }
            })







        });
    });
});






