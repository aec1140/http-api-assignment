// function to send a json object
const respondJSON = (request, response, status, object) => {
  // set status code and content type
  response.writeHead(status, { 'Content-Type': 'application/json' });

  // stringify the object
  response.write(JSON.stringify(object));

  // send the response
  response.end();
};

// function to show a success status code
const success = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'This is a successful response',
  };

  // send our JSON with a success status code
  respondJSON(request, response, 200, responseJSON);
};

// function to show badRequests
const badRequest = (request, response, params) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  // if the parameter is here, send JSON with a success status code
  return responseJSON(request, response, 200, responseJSON);
};

// function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  notFound,
};
