'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');
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

    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'http://foo1.com',
        preview:true,
      },
      {
        spotId: 1,
        url: 'http://foo2.com',
        preview:true,
      },
      {
        spotId: 2,
        url: 'http://foo3.com',
        preview:true,
      },
      {
        spotId: 2,
        url: 'http://foo4.com',
        preview:true,
      },
      {
        spotId: 3,
        url: 'http://foo5.com',
        preview:true,
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages'
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      url:{[Op.in]:['https://foo1.com', 'https://foo2.com', 'https://foo3.com', 'https://foo4.com', 'https://foo5.com']}
    }, {})
  }
};
