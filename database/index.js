'use strict'

const level = require('level')
const ttl = require('level-ttl')
const uuid = require('uuid')
const concat = require('concat-stream')

module.exports = function (options) {
  options = options || {}

  let duration = options.duration || 10 * 60 * 1000
  let limit = options.limit || 10

  const db = ttl(level('./messages.db'), { checkFrequency: 10000 })

  function save (ev, message, callback) {
    let key = `event-${ev}-${Date.now()}-${uuid.v4()}`
    let options = {
      valueEncoding: 'json',
      ttl: duration
    }

    db.put(key, message, options, callback)
  }

  function list (ev, callback) {
    let rs = db.createValueStream({
      limit: limit,
      valueEncoding: 'json',
      reverse: false,
      gt: `event-${ev}`
    })

    rs.pipe(concat(function (messages) {
      callback(null, messages.reverse())
    }))

    rs.on('error', callback)
  }

  return {
    save: save,
    list: list
  }
}
