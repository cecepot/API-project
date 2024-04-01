'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImage.belongsTo(
        models.Spot,
        {foreignKey: 'spotId'}
      )
    }
  }


  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: { model: 'Spots' }, //foreign key
      onDelete: 'CASCADE',//{when a spot is deleted, its associated images must be deleted too}
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isUrl:true
      }
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },

    {
      sequelize,
      modelName: 'SpotImage',
    });
  return SpotImage;
};
