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
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1713634942/Gemini_Generated_Image_7x3g27x3g27x3g27_r78mfv.jpg',
        preview:true,
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1713634942/Gemini_Generated_Image_7x3g27x3g27x3g27_r78mfv.jpg',
        preview:true,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1713634942/Gemini_Generated_Image_7x3g27x3g27x3g27_r78mfv.jpg',
        preview:true,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1713634942/Gemini_Generated_Image_7x3g27x3g27x3g27_r78mfv.jpg',
        preview:true,
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1713634942/Gemini_Generated_Image_7x3g27x3g27x3g27_r78mfv.jpg',
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
      url:{[Op.in]:['https://res.cloudinary.com/dv9oyy79u/image/upload/v1713634942/Gemini_Generated_Image_7x3g27x3g27x3g27_r78mfv.jpg']}
    }, {})
  }
};
