'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jatwal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  jatwal.init({
    doctor_id: DataTypes.STRING,
    day: DataTypes.DATE,
    time_start: DataTypes.TIME,
    time_finish: DataTypes.TIME,
    status: DataTypes.BOOLEAN,
    doctor_name: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'jatwal',
  });
  return jatwal;
};