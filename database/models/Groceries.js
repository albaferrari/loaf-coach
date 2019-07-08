const { connector, Sequelize } = require("../config/dbConfig");
const User = require ("./User")

/* module.exports = connector.define("groceries", {
  name: Sequelize.STRING,
  points: Sequelize.INTEGER
}); */

const Groceries = connector.define("groceries", {
  name: Sequelize.STRING,
  points: Sequelize.INTEGER
})

User.hasMany(Groceries);
Groceries.belongsTo(User);

module.exports = Groceries;