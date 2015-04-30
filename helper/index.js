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
exports.getById = function(id, obj){
    var results = []
    if(!obj) return results
    var searchField = "id"
    var searchVal = id
    var length = obj.length
    for (var i=0;  i < length;  i++)
    {
        if (obj[i][searchField] == searchVal) {
            results.push(obj[i])
            return results
        }
    }
    return results
}
exports.getByField = function(field, value, obj){
    var results = []
    if(!obj) return results
    var searchField = field
    var searchVal = value
    var length = obj.length        
    for (var i=0 ; i < length ; i++)
    {
        if (obj[i][searchField] == searchVal) {
            results.push(obj[i])
        }
    }
    return results
} 