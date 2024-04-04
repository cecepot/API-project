'use strict';

/** @type {import('sequelize-cli').Migration} */


const { Review } = require('../models');
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Review.bulkCreate([
      {
        spotId:2,
        userId:1,
        review:'review one',
          stars: 3
      },
      {
        spotId:3,
        userId:2,
        review:'review two',
          stars: 4
      },
      {
        spotId:1,
        userId:3,
        review:'review three',
          stars: 1
      },
      {
        spotId:1,
        userId:3,
        review:'review four',
          stars: 3
      }
    ],{ validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Reviews'
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      review:{[Op.in]:['review one','review two','review three', 'review four']}
    }, {})
  }
};
