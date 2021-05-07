"use strict";

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

const dotenv = require("dotenv");
const dotenvParseVariables = require("dotenv-parse-variables");

// read and parse .env file.
let env = dotenv.config({});
if (env.error) throw env.error;
process.env = dotenvParseVariables(env.parsed);

const connection = mysql.createConnection({ host: "localhost", port: 3306, user: process.env.DATABASE_USERNAME, password: process.env.DATABASE_PASSWORD });
connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE_NAME}\` DEFAULT CHARACTER SET utf8;`);

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
  dialectOptions: { decimalNumbers: true },
  logging: false,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
