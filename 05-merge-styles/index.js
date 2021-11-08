const fs = require('fs');
const path = require('path');
const pathToStartDir = path.join('./05-merge-styles', '/styles');
const pathToEndDir = path.join('./05-merge-styles', '/project-dist');

fs.readdir(pathToStartDir, {withFileTypes: true}, (err, data) => {
  if (err) throw err;

  data.forEach(file => {
    if (path.extname(file.name) === '.css') {
      const content = fs.readFileSync(`${pathToStartDir}/${file.name}`).toString();
      fs.appendFile(`${pathToEndDir}/bundle.css`, content, err => {
        if (err) throw err;
      });
    }
  });
});