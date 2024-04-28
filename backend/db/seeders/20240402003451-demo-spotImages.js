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
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270986/image_2_aq5hu5.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270986/image_2_aq5hu5.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270986/image_2_aq5hu5.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270986/image_2_aq5hu5.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270986/image_2_aq5hu5.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270968/image_3_fnmadl.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272356/image_24_c1qqqz.jpg',
        preview: true,
      }, {
        spotId: 2,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272227/image_32_ag84nm.jpg',
        preview: true,
      }, {
        spotId: 2,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270968/image_3_fnmadl.jpg',
        preview: true,
      }, {
        spotId: 2,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272490/image_18_redsce.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270954/image_4_ifapp1.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272356/image_24_c1qqqz.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272227/image_32_ag84nm.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270954/image_4_ifapp1.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272490/image_18_redsce.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270942/image_5_yg4klw.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272369/image_23_chm7xv.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272210/image_33_kbgq0u.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272306/image_27_weyqcc.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272283/image_29_fxmfmb.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270931/image_6_ftwyoj.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272369/image_23_chm7xv.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272210/image_33_kbgq0u.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272306/image_27_weyqcc.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270931/image_6_ftwyoj.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272283/image_29_fxmfmb.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270917/image_7_k4ft7u.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272446/image_21_txta6c.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272342/image_25_y6zwbg.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270917/image_7_k4ft7u.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272227/image_32_ag84nm.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270903/image_8_cobtyq.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272446/image_21_txta6c.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272342/image_25_y6zwbg.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270903/image_8_cobtyq.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272227/image_32_ag84nm.jpg',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270890/image_9_m0unli.jpg',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272454/image_20_wqp62e.jpg',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272291/image_28_zeq3ih.jpg',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270890/image_9_m0unli.jpg',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272271/image_30_heejkw.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270878/image_10_sqy7tt.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272454/image_20_wqp62e.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272291/image_28_zeq3ih.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270878/image_10_sqy7tt.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272271/image_30_heejkw.jpg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270857/image_11_zjz7zg.jpg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270857/image_11_zjz7zg.jpg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270857/image_11_zjz7zg.jpg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270857/image_11_zjz7zg.jpg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270857/image_11_zjz7zg.jpg',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270821/image_12_trkbf4.jpg',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270821/image_12_trkbf4.jpg',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270821/image_12_trkbf4.jpg',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270821/image_12_trkbf4.jpg',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270821/image_12_trkbf4.jpg',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270809/image_13_y2rdqb.jpg',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270809/image_13_y2rdqb.jpg',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270809/image_13_y2rdqb.jpg',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270809/image_13_y2rdqb.jpg',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270809/image_13_y2rdqb.jpg',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270801/image_14_xsefmd.jpg',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270801/image_14_xsefmd.jpg',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270801/image_14_xsefmd.jpg',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270801/image_14_xsefmd.jpg',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270801/image_14_xsefmd.jpg',
        preview: true,
      },
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
        [Op.in]: ['https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270986/image_2_aq5hu5.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270968/image_3_fnmadl.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272356/image_24_c1qqqz.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272227/image_32_ag84nm.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272490/image_18_redsce.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270954/image_4_ifapp1.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272369/image_23_chm7xv.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272306/image_27_weyqcc.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272283/image_29_fxmfmb.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272210/image_33_kbgq0u.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272446/image_21_txta6c.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272342/image_25_y6zwbg.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272227/image_32_ag84nm.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272454/image_20_wqp62e.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272291/image_28_zeq3ih.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714272271/image_30_heejkw.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270942/image_5_yg4klw.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270931/image_6_ftwyoj.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270917/image_7_k4ft7u.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270903/image_8_cobtyq.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270890/image_9_m0unli.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270878/image_10_sqy7tt.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270857/image_11_zjz7zg.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270821/image_12_trkbf4.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270809/image_13_y2rdqb.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270801/image_14_xsefmd.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270809/image_13_y2rdqb.jpg',
          'https://res.cloudinary.com/dv9oyy79u/image/upload/v1714270801/image_14_xsefmd.jpg'
        ]
      }
    }, {})
  }
};
