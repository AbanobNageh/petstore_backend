const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const dotenvParseVariables = require("dotenv-parse-variables");

// read and parse .env file.
let env = dotenv.config({});
if (env.error) throw env.error;
process.env = dotenvParseVariables(env.parsed);

const routes = require("./app/V1/routes/index");
const commonUtils = require("./app/common utils/index");
const logUtils = commonUtils.logUtils;

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 8080;
const LOG_ALL_REQUESTS = process.env.LOG_ALL_REQUESTS || false;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (LOG_ALL_REQUESTS) {
  app.use(async (req, res, next) => {
    await logUtils.logRequest(req);
    next();
  });
}

// user routes.
app.use("/V1/user", routes.userRoutes);
app.use("/V1/pet", routes.petRoutes);

const httpServer = http.createServer(app);

module.exports = httpServer.listen(HTTP_PORT, async () => {
  try {
    console.log("------------------ HTTP Server ------------------");
    console.log("We are live on port " + HTTP_PORT);
  } catch (error) {
    console.log(error);
  }
});
