var lruCache = require('lru-cache')

var options = {
    max:500,
    length:function(n) {
        return n * 2
    },
    dispose:function(key, n) {
        //console.log('Disposing cache for', key)
    },
    maxAge: 60 * 60 * 5
    //maxAge: 1000 * 2
    //60 * 60 * 5
}

var cache = lruCache(options)

exports.set = function (key, value) {
    cache.set(key,value)
}

exports.get = function (key) {
    return cache.get(key)
}

exports.keys = function () {
    return cache.keys()
}