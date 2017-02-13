const fs = require('fs'); // pull in the file system module

const home = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getPage = (request, response, file, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(file);
  response.end();
};

const getIndex = (request, response) => {
  getPage(request, response, home, 'text/html');
};

const getCSS = (request, response) => {
  getPage(request, response, css, 'text/css');
};

module.exports = {
  getIndex,
  getCSS,
};