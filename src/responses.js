const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// function to send a json object
const respond = (request, response, status, type, object) => {
  // set status code and content type
  response.writeHead(status, { 'Content-Type': type });

  // stringify the object
  response.write(object);

  // send the response
  response.end();
};

const getResponse = (request, response, message, status, acceptedTypes, id) => {
  const obj = {
    message,
  };

  if (id) {
    obj.id = id;
  }

  // if client's most preferred type is xml
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += `<message>${message}</message>`;
    if (id) responseXML += `<id>${id}</id>`;
    responseXML += '</response>';

    respond(request, response, status, 'text/xml', responseXML);
  } else {
    const responseJSON = JSON.stringify(obj);
    respond(request, response, status, 'application/json', responseJSON);
  }
};

// function to show a success status code
const success = (request, response, acceptedTypes) => {
  const message = 'This is a successful response.';

  // send our JSON with a success status code
  getResponse(request, response, message, 200, acceptedTypes);
};

// function to show badRequests
const badRequest = (request, response, params, acceptedTypes) => {
  // message to send
  let message = 'This request has the required parameters.';

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    message = 'Missing valid query parameter set to true.';
    // give the error a consistent id
    const id = 'badRequest';
    // return our json with a 400 bad request code
    return getResponse(request, response, message, 400, acceptedTypes, id);
  }

  // if the parameter is here, send JSON with a success status code
  return getResponse(request, response, message, 200, acceptedTypes);
};

// function to show unauthorized requests
const unauthorized = (request, response, params, acceptedTypes) => {
  let message = 'This request has the required parameters.';

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    message = 'Missing loggedIn query parameter set to yes';
    const id = 'unauthorized';
    return getResponse(request, response, message, 401, acceptedTypes, id);
  }
  return getResponse(request, response, message, 200, acceptedTypes);
};

// function to show forbidden requests
const forbidden = (request, response, params, acceptedTypes) => {
  const message = 'You do not have access to this content.';
  const id = 'forbidden';
  getResponse(request, response, message, 403, acceptedTypes, id);
};

// function to show internal server error
const internalError = (request, response, params, acceptedTypes) => {
  const message = 'Internal Server Error. Something went wrong.';
  const id = 'internalError';
  getResponse(request, response, message, 500, acceptedTypes, id);
};

// function to show not implemented error
const notImplemented = (request, response, params, acceptedTypes) => {
  const message = 'A get request for this page has not yet been implemented. Check again later for updated content.';
  const id = 'notImplemented';
  getResponse(request, response, message, 501, acceptedTypes, id);
};

// function to show not found error
const notFound = (request, response, params, acceptedTypes) => {
  const message = 'The page you are looking for was not found.';
  const id = 'notFound';
  getResponse(request, response, message, 404, acceptedTypes, id);
};

// function to handle the index page
const getIndex = (request, response) => {
  respond(request, response, 200, 'text/html', index);
};

const getCSS = (request, response) => {
  respond(request, response, 200, 'text/css', css);
};

module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
  notFound,
};
