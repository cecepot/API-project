'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      )

      Booking.belongsTo(
        models.Spot,
        {foreignKey: 'spotId'}
      )
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notEmpty: true,
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notEmpty: true,
      }
    },
  },

  {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
