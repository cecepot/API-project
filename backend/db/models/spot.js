'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
        {
          as: 'Owner',
          foreignKey: 'ownerId'
        }
      )

      Spot.hasMany(
        models.SpotImage,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      )

      Spot.hasMany(
        models.Review,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      )

      Spot.hasMany(
        models.Booking,
        {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      )

      // Spot.belongsToMany(
      //   models.User,
      //   {
      //     through: models.Review,
      //     foreignKey: 'spotId',
      //     otherKey: 'userId'
      //   }
      // )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users' },
      onDelete: 'CASCADE' //when a user is deleted, all their created spots should be deleted
    },
    address: {
      type: DataTypes.STRING,
      allownull: false,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allownull: false,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allownull: false,
      validate: {
        notEmpty: true
      }
    },
    country: {
      type: DataTypes.STRING,
      allownull: false,
      validate: {
        notEmpty: true
      }
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -90,
        max: 90,
        notEmpty: true
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -180,
        max: 180,
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
      validate: {
        len: [2, 50],
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING(5000),
      allownull: false,
      validate: {
        notEmpty: true,
        len: [30, 5000]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allownull: false,
      validate: {
        notEmpty: true,
        min: 1
      }
    },
  },

    {
      sequelize,
      modelName: 'Spot',
    });
  return Spot;
};
