var express = require('express');
var cache = require('../helper')
var WP = require( 'wordpress-rest-api' );

var router = express.Router()
var wp = new WP({ endpoint: 'http://quiroa.dev/wp-json/wp/v2' });

/* GET users listing. */
router.get('/:id', function(req, res) {
	var cachedPost = cache.get(req.path)
	if (cachedPost) {
		res.render('post', cachedPost)
	}else{		
		wp.posts().id( req.params.id ).get(function( err, data ) {
		    if (err) res.render('error', {error: err.message})
			cache.set(req.path, data)
			res.render('post', data)
		})		
	}	 
})

module.exports = router;
