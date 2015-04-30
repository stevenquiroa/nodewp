var express = require('express');
var cache = require('../helper')
var router = express.Router()

/* GET users listing. */
router.get('/:id', function(req, res) {
	// console.log(req.params
  // console.log('keys: ' , cache.keys())
  res.send('respond with a resource')
});

module.exports = router;
