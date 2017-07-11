#!/usr/bin/env node

var jwt = require('jsonwebtoken')

if(process.stdin.isTTY && !process.argv[2]) {
  console.log(`
Usage:

  jwt my_token.txt
  cat my_token.txt | jwt

`)
} else {
  var file = process.argv[2]
  if(file) {
    decode(require('fs').readFileSync(file, 'utf8'))
  } else {
    var data = ''
    var self = process.stdin
    self.on('readable', function() {
      var chunk = this.read()
      if(chunk != null) {
        data += chunk
      }
    })
    self.on('end', function() {
      decode(data)
    })
  }
}

function decode(data) {
  var token = data.replace(/\r?\n$/,'')
  var decoded = jwt.decode(token, {complete: true})
  process.stdout.write(JSON.stringify(decoded, null, 2))
}
