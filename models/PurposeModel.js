import { Sequelize } from "sequelize";
import database from "../config/Database.js";
import Division from "./DivisionModel.js";

const { DataTypes } = Sequelize;

const Purpose = database.define(
  "purpose",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Division.hasOne(Purpose);
Purpose.belongsTo(Division, { foreignKey: "divisionId" });

export default Purpose;
