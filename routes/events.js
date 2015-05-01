var express = require('express')
var cache = require('../helper')
var bodyParser = require('body-parser')
var WP = require( 'wordpress-rest-api' );

var router = express.Router()
var wp = new WP({ endpoint: 'http://quiroa.dev/wp-json/wp/v2' });

/* GET users listing. */
router.post('/', function(req, res) {
	console.log(req.body)	
	res.json({success: true})
})

router.get('/', function(req, res){
	// var cachedPost = cache.get(req.path)
	// if (cachedPost) {
	// 	res.render('post', cachedPost)
	// }else{		
		wp.taxonomy('event').then(function( data ) {		    
			// console.log(data)
			res.jsonp(data||{})
		}).catch(function( err ) {
		    res.render('error', {error: err.message})		    
		});
	// }	 
})
module.exports = router;
