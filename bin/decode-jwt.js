#!/usr/bin/env node

const jwt = require('jsonwebtoken')

if (process.stdin.isTTY && !process.argv[2]) {
  console.log(`
Usage:

  jwt my_token.txt
  cat my_token.txt | jwt

`)
} else {
  const file = process.argv[2]
  if (file) {
    decode(require('fs').readFileSync(file, 'utf8'))
  } else {
    let data = ''
    const self = process.stdin
    self.on('readable', function () {
      const chunk = this.read()
      if (chunk !== null) {
        data += chunk
      }
    })
    self.on('end', () => {
      decode(data)
    })
  }
}

function decode(data) {
  const token = data.replace(/\r?\n$/, '')
  const decoded = jwt.decode(token, {complete: true})
  process.stdout.write(JSON.stringify(decoded, null, 2))
}
