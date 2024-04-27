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
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255714/Gemini_Generated_Image_2wln802wln802wln_dgtr6c.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714254066/Gemini_Generated_Image_83ijw183ijw183ij_e93rhm.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714253984/Gemini_Generated_Image_2s6oxu2s6oxu2s6o_pwuhsc.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1713894836/Gemini_Generated_Image_69cp8h69cp8h69cp_jkdczb.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1713931325/Gemini_Generated_Image_x1a130x1a130x1a1_t8uaeo.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714254018/Gemini_Generated_Image_bo5c9bo5c9bo5c9b_nx3yvj.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714254006/Gemini_Generated_Image_bo5cabo5cabo5cab_xpwign.jpg',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714254096/Gemini_Generated_Image_83ijw283ijw283ij_uquckj.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255563/Gemini_Generated_Image_rbv1sirbv1sirbv1_co53q4.jpg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255946/Gemini_Generated_Image_84tvki84tvki84tv_gpktie.jpg',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255592/Gemini_Generated_Image_rbv1shrbv1shrbv1_juujey.jpg',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255579/Gemini_Generated_Image_rbv1sjrbv1sjrbv1_g7nk2f.jpg',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255541/Gemini_Generated_Image_nfvd1tnfvd1tnfvd_xagwnt.jpg',
        preview: true,
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
      url: {
        [Op.in]: ['https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255714/Gemini_Generated_Image_2wln802wln802wln_dgtr6c.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714254066/Gemini_Generated_Image_83ijw183ijw183ij_e93rhm.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714253984/Gemini_Generated_Image_2s6oxu2s6oxu2s6o_pwuhsc.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1713894836/Gemini_Generated_Image_69cp8h69cp8h69cp_jkdczb.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1713931325/Gemini_Generated_Image_x1a130x1a130x1a1_t8uaeo.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714254018/Gemini_Generated_Image_bo5c9bo5c9bo5c9b_nx3yvj.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714254006/Gemini_Generated_Image_bo5cabo5cabo5cab_xpwign.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714254096/Gemini_Generated_Image_83ijw283ijw283ij_uquckj.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255563/Gemini_Generated_Image_rbv1sirbv1sirbv1_co53q4.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255946/Gemini_Generated_Image_84tvki84tvki84tv_gpktie.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255592/Gemini_Generated_Image_rbv1shrbv1shrbv1_juujey.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255579/Gemini_Generated_Image_rbv1sjrbv1sjrbv1_g7nk2f.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714255541/Gemini_Generated_Image_nfvd1tnfvd1tnfvd_xagwnt.jpg'
        ]
      }
    }, {})
  }
};
