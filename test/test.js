var assert = require('assert');

var undici = require('undici')


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