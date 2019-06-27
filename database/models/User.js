const { connector, Sequelize } = require("../config/dbConfig");

module.exports = connector.define("user", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  location: Sequelize.STRING,
  phone: Sequelize.STRING
});
