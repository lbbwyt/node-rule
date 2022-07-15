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








