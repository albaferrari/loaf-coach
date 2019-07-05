const { connector, Sequelize } = require("../config/dbConfig");

module.exports = connector.define("groceries", {
  name: Sequelize.STRING,
  points: Sequelize.INTEGER
});
