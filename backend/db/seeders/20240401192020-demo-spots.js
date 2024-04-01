'use strict';

/** @type {import('sequelize-cli').Migration} */
const { User, Spot, SpotImage } = require('../models');
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
    await Spot.bulkCreate([
      {
        ownerId:1,
        address: '1328 Oxford drive',
        city:'Laurel',
        state:'Maryland',
        country: 'United States',
        lat: 30.28,
        lng: -120.326,
        name:'Shady Villa One',
        description:'Very sketchy place. Do not recommend',
        price: 348,
      },
      {
        ownerId: 2,
        address: '1200 Marlow BLVD',
        city: 'Ikega',
        state:'Lagos',
        country:'Nigeria',
        lat: 8.6753,
        lng: 9.0820,
        name:'Bobrisky Mummy of Lagos',
        description:'Even sketchier than the first',
        price:1763,
      },
      {
        ownerId: 2,
        address: '121 Oxford St',
        city:'Accra',
        state:'N/A',
        country: 'Ghana',
        lat:7.9465,
        lng:1.0232,
        name:'Nkrumah Villa',
        description:'Why are you still here?',
        price:50,
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
    options.tableName = 'Spots'
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      name:{[Op.in]:['Shady Villa One','Bobrisky Mummy of Lagos','Nkrumah Villa']}
    }, {})
  }
};
