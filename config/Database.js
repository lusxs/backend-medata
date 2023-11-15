import { Sequelize } from "sequelize";

const database = new Sequelize("db_medata", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default database;
