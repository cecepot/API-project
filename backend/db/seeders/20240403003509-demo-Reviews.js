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
        spotId: 2,
        userId: 1,
        review: 'Loved this place. Only downside was the absence of WIFI',
        stars: 3
      },
      {
        spotId: 4,
        userId: 2,
        review: "This place is amazing! It's like stepping into a dream. The training grounds are perfect for practicing my jutsu, and the hot springs are so relaxing after a long day. Definitely coming back!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 2,
        review: "It was decent, but it lacked the excitement of my world. The garden was nice, but I prefer a view of the village. Overall, an average stay.",
        stars: 3
      },
      {
        spotId: 6,
        userId: 2,
        review: "Impressive! The gardens were beautiful, and the traditional atmosphere was calming. However, the spiritual energy felt a bit too intense for my liking.",
        stars: 4
      },
      {
        spotId: 7,
        userId: 2,
        review: "This was a peaceful escape! The meditation areas were perfect for reflection, and the scenic landscapes were breathtaking. Definitely a place to find inner peace.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: "Very disappointing. It lacked the authenticity of our village and felt more like a tourist trap. Not worth the stay.",
        stars: 2
      },
      {
        spotId: 3,
        userId: 3,
        review: "I wouldn't recommend staying here. Bedbugs, no WIFI. Doesn't look like the pictures",
        stars: 1
      },
      {
        spotId: 4,
        userId: 3,
        review: "Too peaceful for my taste. It's not a place for someone seeking power and revenge. I won't be returning.",
        stars: 2
      },
      {
        spotId: 5,
        userId: 3,
        review: "So suffocating. The elegance felt more like a prison than a retreat. I suggest looking elsewhere for accommodation.",
        stars: 1
      },
      {
        spotId: 6,
        userId: 3,
        review: "Peaceful, but that's not what I seek. The tranquility was unsettling, and I found no solace here. Not recommended.",
        stars: 2
      },
      {
        spotId: 1,
        userId: 7,
        review: "Exudes a quaint charm, suitable for those seeking a rustic experience. However, the lack of refinement and elegance may deter discerning travelers.",
        stars: 3
      },
      {
        spotId: 2,
        userId: 7,
        review: "Unique experience for those interested in ninja training. While the atmosphere is authentic, the accommodations are modest at best.",
        stars: 3
      },
      {
        spotId: 4,
        userId: 7,
        review: "Serene environment for relaxation. However, the simplicity of the surroundings may not appeal to those accustomed to more opulent settings.",
        stars: 4
      },
      {
        spotId: 5,
        userId: 7,
        review: "The Kuchiki Clan Estate is a fine example of traditional architecture and landscaping. Nevertheless, the lack of modern amenities may deter those seeking a more comfortable stay.",
        stars: 4
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

    options.tableName = 'Reviews'
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 7] }
    }, {})
  }
};
