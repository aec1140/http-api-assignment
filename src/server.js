const http = require('http');
const htmlHandler = require('./htmlResponses.js');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getHome(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    default:
      htmlHandler.getHome(request, response);
      break;
  }
};

http.createServer(onRequest).listen(PORT);
console.log(`Listening on 127.0.0.1: ${PORT}`);
