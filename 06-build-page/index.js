const fs = require('fs');
const path = require('path');
const pathToStartDir = path.join('./06-build-page', '/styles');
const pathToEndDir = path.join('./06-build-page', '/project-dist');
const fsPromises = require('fs').promises;

fs.mkdir(pathToEndDir, {recursive: true}, err => {
  if (err) throw err;
  const stream = fs.createWriteStream(`${pathToEndDir}/style.css`);
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

  fs.mkdir(`${pathToEndDir}/assets`, {recursive: true}, err => {
    if (err) throw err;
    fs.mkdir(`${pathToEndDir}/assets/fonts`, {recursive: true}, err => {
      if (err) throw err;
      fs.readdir('./06-build-page/assets/fonts',{withFileTypes: true}, (err, data) => {
        if (err) throw err;
        data.forEach(file => {
          fsPromises.copyFile(`./06-build-page/assets/fonts/${file.name}`, `${pathToEndDir}/assets/fonts/${file.name}`).then(function () {
            console.log('Done');
          }).catch(err => {
            console.log(err);
          });
        });
      });
    });

    fs.mkdir(`${pathToEndDir}/assets/img`, {recursive: true}, err => {
      if (err) throw err;
      fs.readdir('./06-build-page/assets/img',{withFileTypes: true}, (err, data) => {
        if (err) throw err;
        data.forEach(file => {
          fsPromises.copyFile(`./06-build-page/assets/img/${file.name}`, `${pathToEndDir}/assets/img/${file.name}`).then(function () {
            console.log('Done');
          }).catch(err => {
            console.log(err);
          });
        });
      });
    });

    fs.mkdir(`${pathToEndDir}/assets/svg`, {recursive: true}, err => {
      if (err) throw err;
      fs.readdir('./06-build-page/assets/svg',{withFileTypes: true}, (err, data) => {
        if (err) throw err;
        data.forEach(file => {
          fsPromises.copyFile(`./06-build-page/assets/svg/${file.name}`, `${pathToEndDir}/assets/svg/${file.name}`).then(function () {
            console.log('Done');
          }).catch(err => {
            console.log(err);
          });
        });
      });
    });
  });
  // const htmlWrite = fs.createWriteStream(`${pathToEndDir}/index.html`);

  fs.readFile('./06-build-page/template.html', 'utf8', (err, data) => {
    if (err) throw err;
    let result = '';
    const articles = fs.readFileSync('./06-build-page/components/articles.html').toString();
    const header = fs.readFileSync('./06-build-page/components/header.html').toString();
    const footer = fs.readFileSync('./06-build-page/components/footer.html').toString();
    result = data.replace(/{{articles}}/g, articles);
    result = result.replace(/{{header}}/g, header);
    result = result.replace(/{{footer}}/g, footer);

    fs.writeFile(`${pathToEndDir}/index.html`, result, 'utf8', err => {
      if (err) throw err;
    });

  });
});

