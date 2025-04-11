"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dokter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dokter.init(
    {
      doctor_id: DataTypes.STRING,
      doctor_name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "dokter",
    }
  );
  return dokter;
};
