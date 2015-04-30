var express = require('express')
var cache = require('../helper')
var bodyParser = require('body-parser')

var router = express.Router()
var jsonParse = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// router.use(express.bod)

/* GET users listing. */
router.post('/', urlencodedParser, function(req, res) {
	console.log(req.body)
	console.log(req.body.id)
	res.json({success: true})
})

module.exports = router;
