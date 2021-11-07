const fs = require('fs');
const path = require('path');
const process = require('process');
const pathToFile = path.join('./02-write-file', '/write.txt');
const stream = fs.createWriteStream(pathToFile, {'flags': 'a'});

const readline = require('readline').createInterface({
  input: process.stdin,
  output: stream
});

readline.on('line', data => {
  if (data == 'exit') {
    console.log('Goodbye');
    readline.close();
  } else {
    stream.write(data);
  }
});

process.on('SIGINT', function() {
  console.log('Goodbye');
  process.exit();
});
