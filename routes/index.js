var express = require('express')
var request = require('request')
var fs = require('fs');
var cache = require('../helper')
var router = express.Router()
/* GET home page. */
router.get('/', function(req, res) {
	var message = cache.get(req.path)
	if (!message) {
		request({url : 'http://quiroa.me/wp-json/wp/v2/posts/', json: true},	function(err, response, body){
			if (err) res.render('error', {error: err.message})
			if (response.statusCode == 200) {
				message = {posts: body}
				cache.set(req.path, message)
				console.log('cache: ', cache.keys())
				res.render('index', message)
			}
		})
	}else{
		res.render('index', message)
	}
})

function fail (res, err) {
	
}
module.exports = router
