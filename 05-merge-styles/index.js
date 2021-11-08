const fs = require('fs');
const path = require('path');
const pathToStartDir = path.join('./05-merge-styles', '/styles');
const pathToEndDir = path.join('./05-merge-styles', '/project-dist');
const stream = fs.createWriteStream(`${pathToEndDir}/bundle.css`);

fs.readdir(pathToStartDir, {withFileTypes: true}, (err, data) => {
  if (err) throw err;

  data.forEach(file => {
    if (path.extname(file.name) === '.css') {
      const readline = require('readline').createInterface({
        input: fs.createReadStream(`${pathToStartDir}/${file.name}`),
        output: stream
      });

      readline.on('line', data => {
        stream.write(data);
      });
    }
  });
});