'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {model: 'Users'},
        onDelete: 'CASCADE' //when a user is deleted, all their created spots should be deleted
      },
      address: {
        type: Sequelize.STRING,
        allownull: false
      },
      city: {
        type: Sequelize.STRING,
        allownull: false
      },
      state: {
        type: Sequelize.STRING,
        allownull: false
      },
      country: {
        type: Sequelize.STRING,
        allownull: false
      },
      lat: {
        type: Sequelize.FLOAT,//float instead of decimal because of the level of precision
        allowNull: false
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allownull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING(5000),
        allownull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allownull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.dropTable(options);
  }
};
