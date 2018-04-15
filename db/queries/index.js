/**
 * Created by bhavyaagg on 02/04/18.
 */
const fs = require('fs');
const files = fs.readdirSync(__dirname)

module.exports = files.reduce((prev, filename) => {
  if (filename.split('.')[0] !== 'index') {
    prev[filename.split('.')[0]] = require(`./${filename}`)
  }
  return prev
}, {})