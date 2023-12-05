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
      validate: {
        notEmpty: true,
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    citizenNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
