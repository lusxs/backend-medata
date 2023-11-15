import { Sequelize } from "sequelize";
import database from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Division = database.define("division", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(Division);
Division.belongsTo(User, { foreignKey: "userId" });

export default Division;
