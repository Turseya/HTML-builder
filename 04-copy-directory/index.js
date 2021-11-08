const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const pathToCopyDir = path.join('./04-copy-directory', '/files-copy');
const pathToDir = path.join('./04-copy-directory', '/files');

fs.mkdir(pathToCopyDir, {recursive: true}, err => {
  if (err) throw err;
  console.log('Папка "files-copy" успешно создана');
});


fs.readdir(pathToDir,{withFileTypes: true}, (err, data) => {
  if (err) throw err;
  data.forEach(file => {
    fsPromises.copyFile(`${pathToDir}/${file.name}`, `${pathToCopyDir}/${file.name}`).then(function () {
      console.log('Done');
    }).catch(err => {
      console.log(err);
    });
  });
});