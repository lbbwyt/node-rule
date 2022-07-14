var express = require('express');
var router = express.Router();


var userHandler = require('../handler/user_handler')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.get('/:id', userHandler.loadUser);

module.exports = router;
