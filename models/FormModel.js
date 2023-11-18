import { Sequelize } from "sequelize";
import database from "../config/Database.js";
import Division from "./DivisionModel.js";
import Purpose from "./PurposeModel.js";

const { DataTypes } = Sequelize;

const Form = database.define(
  "form",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Form.belongsTo(Division, { foreignKey: "divisionId" });
Division.hasOne(Form, { foreignKey: "divisionId" });

Form.belongsTo(Purpose, { foreignKey: "purposeId" });
Purpose.hasOne(Form, { foreignKey: "purposeId" });

export default Form;
