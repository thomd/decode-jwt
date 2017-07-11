#!/usr/bin/env node

var fs = require('fs')
var jwt = require('jsonwebtoken')

var file = process.argv[2]
if(file) {
  var token = fs.readFileSync(file, 'utf8')
  token = token.replace(/\r\n$/,'')
  var decoded = jwt.decode(token, {complete: true})
} else {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function(data) {
    var decoded = jwt.decode(data, {complete: true})
  })
}
process.stdout.write(JSON.stringify(decoded))
