var express = require('express');
var router = express.Router();


var flowHandler = require('../handler/flow_handler')


router.put('/:id', flowHandler.onOff);

module.exports = router;
