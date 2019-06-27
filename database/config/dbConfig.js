require("dotenv").config();

const Sequelize = require("sequelize");

const connector = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: "postgres" }
);

connector
  .authenticate()
  .then(() =>
    console.log(`Authentication to ${process.env.DB_NAME} was a success!`)
  )
  .catch(error =>
    console.error(`Couldn't authenticate connection to ${process.env.DB_NAME}`)
  );

module.exports = {
  Sequelize,
  connector
};