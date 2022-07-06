const Sequelize = require("sequelize");
const sequelize = new Sequelize("proyecto_4_movie_node_db", "", "", {
  dialect: "sqlite",
  host: "./proyecto_movie_node.db",
});

module.exports = sequelize;
