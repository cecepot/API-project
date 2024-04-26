'use strict';

/** @type {import('sequelize-cli').Migration} */
const {Spot} = require('../models');
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
        address: '1200 Uzumaki Way',
        city:'Hidden Leaf',
        state:'Uzukage District',
        country: 'Hinokoku',
        lat: 30.28,
        lng: -120.326,
        name:'Hidden Leaf Village Homestay',
        description:"Train like a ninja and experience the spirit of Konohagakure! Relax in a comfy apartment styled after Naruto's world. (Ramen not included, but recommended nearby!)",
        price: 348,
      },
      {
        ownerId: 2,
        address: '47 Nara Clan Road',
        city: 'Sannin Peak Trail',
        state:' Valley of the End',
        country:'Hinokoku',
        lat: 8.6753,
        lng: 9.0820,
        name:'Valley View Homestay',
        description:"Escape the hustle and bustle of the city at this charming Uzumaki-inspired farmhouse! This family-run B&B offers comfortable lodgings, hearty breakfasts made with fresh local produce, and a warm, welcoming atmosphere reminiscent of Naruto's childhood home.",
        price:1763,
      },
      {
        ownerId: 2,
        address: '121 Kazekage Crescent',
        city:'Kuni',
        state:'Sunagakure',
        country: 'Kazekoku',
        lat:7.9465,
        lng:1.0232,
        name:'Hidden Sand Oasis',
        description:"Experience the tranquility of the desert at this Hidden Sand Village-inspired homestay! Located near the Sunagakure Outskirts, this unique B&B offers comfortable accommodations, delicious meals featuring desert delicacies, and the chance to learn about Sunagakure's rich culture from your friendly hosts.",
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
      name:{[Op.in]:['Hidden Leaf Village Homestay','Valley View Homestay','Hidden Sand Oasis']}
    }, {})
  }
};
