const fs = require('fs');
const path = require('path');

const patToFile = path.join('./01-read-file', '/text.txt');

const stream = fs.createReadStream(patToFile);

stream.on('data', function (chunk) {
  console.log(chunk.toString());
});