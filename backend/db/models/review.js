'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Review.belongsTo(
        models.Spot,
        {foreignKey: 'spotId'}
      )
      Review.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      )
      Review.hasMany(
        models.ReviewImage,
        {foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true}
      )

    }

  }
  Review.init({
    spotId: {
      type:DataTypes.INTEGER
    },
    userId: {
      type:DataTypes.INTEGER,

    },
    review: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    stars: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        min: 1,
        max: 5
      }
    },
  },

  {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
