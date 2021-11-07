const fs = require('fs');
const path = require('path');
const pathToDir = path.join('./03-files-in-folder', '/secret-folder');

fs.readdir(pathToDir, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      fs.stat(`${pathToDir}/${file.name}`, function (err, stat) {
        if (err) throw err;
        console.log(`${path.basename(file.name)} - ${path.extname(file.name).substring(1)} - ${stat.size}`);
      });
    }
  });
});
