/**
*
* A log method that is used to log a request sent to the server.
* @param {Request} request The request to log.
*
*/
module.exports.logRequest = async (request) => {
  console.log("-------------------- Logging Request --------------------");
  console.log("Request URL: " + request.url.toLowerCase());
  console.log("Request host: " + request.hostname);
  console.log("Request Body:");
  console.log(request.body);
  console.log("Request Query:");
  console.log(request.query);
  console.log("---------------------------------------------------------");
};

