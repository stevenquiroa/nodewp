var express = require('express')
var request = require('request')
var fs = require('fs');
var cache = require('../helper')
var WP = require( 'wordpress-rest-api' );

var router = express.Router()
var wp = new WP({ endpoint: 'http://quiroa.me/wp-json/wp/v2' });
/* GET home page. */
router.get('/', function(req, res) {
	var message = cache.get(req.path)
	if (!message) {
		wp.posts().get(function( err, data ) {
		    if (err) res.render('error', {error: err.message})
			message = {posts: data}
			cache.set(req.path, message)

			res.render('index', message)
		
		})
	}else{
		res.render('index', message)
	}
})

function fail (res, err) {
	
}
module.exports = router
