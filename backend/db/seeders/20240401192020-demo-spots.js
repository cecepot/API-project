'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require('../models');
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
        ownerId: 1,
        address: '47 Nara Clan Road',
        city: 'Sannin Peak Trail',
        state: ' Hidden Leaf',
        country: 'Hinokoku',
        lat: 8.6753,
        lng: 9.0820,
        name: 'Valley View Homestay',
        description: "Escape the hustle and bustle of the city at this charming Uzumaki-inspired farmhouse! This family-run B&B offers comfortable lodgings, hearty breakfasts made with fresh local produce, and a warm, welcoming atmosphere reminiscent of Naruto's childhood home.",
        price: 1763,
      },
      {
        ownerId: 2,
        address: '1200 Uzumaki Way',
        city: 'Tsunade',
        state: 'Hidden Leaf',
        country: 'Hinokoku',
        lat: 30.28,
        lng: -120.326,
        name: 'Hidden Leaf Homestay',
        description: "Experience the spirit of Konohagakure, live like a true shinobi! Relax in this cozy apartment styled by the greatest Hogake. (Ramen not included, but recommended nearby!)",
        price: 348,
      },
      {
        ownerId: 2,
        address: '128 Konoha Lane',
        city: 'Hatake',
        state: 'Hidden Leaf',
        country: 'Hinokoku',
        lat: 30.305,
        lng: -120.32,
        name: "Sannin Peaks",
        description: "Enjoy the serene atmosphere in a spot that was often visited by Jiraiya Sensei: with access to nearby nature and hot springs.(NO WIFI AVAILABLE !!!)",
        price: 275,
      },
      {
        ownerId: 3,
        address: '230 Uchiha Drive',
        city: 'Orochimaru',
        state: 'Hidden Leaf',
        country: 'Hinokoku',
        lat: 30.29,
        lng: -120.322,
        name: 'Uchiha Clan Residence',
        description: "Experience the legacy of the Uchiha clan! Stay in a traditional Japanese house with a rich history and beautiful garden.",
        price: 400,
      },
      {
        ownerId: 3,
        address: '250 Uchiha Drive',
        city: 'Chidori',
        state: 'Hidden Leaf',
        country: 'Hinokoku',
        lat: 30.291,
        lng: -120.323,
        name: 'The Sharingan',
        description: "Discover the secrets of the Uchiha clan! Stay in a secluded hideout with modern amenities and a view of the village.",
        price: 320,
      },
      {
        ownerId: 4,
        address: '300 Haruno Street',
        city: 'Boruto',
        state: 'Hidden Leaf',
        country: 'Hinokoku',
        lat: 30.295,
        lng: -120.325,
        name: 'Haruno Blossom Retreat',
        description: "Experience the beauty of the Haruno family! Stay in a charming house surrounded by cherry blossoms and tranquility.",
        price: 380,
      },
      {
        ownerId: 4,
        address: '320 Haruno Street',
        city: 'Shikamaru',
        state: 'Hidden Leaf',
        country: 'Hinokoku',
        lat: 30.297,
        lng: -120.326,
        name: 'Haruno Garden Oasis',
        description: "Relax in the serenity of the Haruno garden! Stay in a cozy cottage with a view of the blooming flowers and peaceful surroundings.",
        price: 320,
      },
      {
        ownerId: 5,
        address: '1 Kurosaki Lane',
        city: 'Orihime',
        state: 'Seireitei',
        country: 'Japan',
        lat: 35.67,
        lng: 139.68,
        name: 'Kurosaki Villa',
        description: "Relax in Ichigo Kurosaki's family home! Enjoy a peaceful stay in a cozy room with access to a tranquil garden.",
        price: 300,
      },
      {
        ownerId: 5,
        address: '15 Kurosaki Lane',
        city: 'Karukura',
        state: 'Seireitei',
        country: 'Japan',
        lat: 35.675,
        lng: 139.685,
        name: 'Hueco Mundo',
        description: "Stay in a safe house equipped with spiritual protection and easy access to hotspots of Hollow activity.(Your safety is not 100% guaranteed)",
        price: 280,
      },
      {
        ownerId: 6,
        address: '10 Kuchiki Manor',
        city: 'Urahara',
        state: 'Seireitei',
        country: 'Japan',
        lat: 35.712,
        lng: 139.765,
        name: 'Kuchiki Clan Estate',
        description: "Immerse yourself in the elegance of the Kuchiki clan! Stay in a traditional manor surrounded by beautiful gardens and spiritual tranquility.",
        price: 500,
      },
      {
        ownerId: 6,
        address: '50 Kuchiki Avenue',
        city: 'Kenpachi',
        state: 'Seireitei',
        country: 'Japan',
        lat: 35.714,
        lng: 139.766,
        name: 'Shirayuki Gardens',
        description: "Escape to the peacefulness of the Kuchiki gardens! Stay in a serene environment with access to meditation areas and scenic landscapes.",
        price: 350,
      },
      {
        ownerId: 7,
        address: '60 Kuchiki Avenue',
        city: 'Hitsugaya',
        state: 'Seireitei',
        country: 'Japan',
        lat: 35.715,
        lng: 139.767,
        name: 'Kuchiki Temples',
        description: "Experience the spiritual essence of the Kuchiki temple! Stay in a traditional guesthouse with tranquil surroundings and cultural immersion.",
        price: 380,
      },
      {
        ownerId: 7,
        address: '70 Kuchiki Avenue',
        city: 'Yamamoto',
        state: 'Seireitei',
        country: 'Japan',
        lat: 35.716,
        lng: 139.768,
        name: 'Senbonzakura',
        description: "Immerse yourself in the tranquility of the Kuchiki bamboo grove! Stay in a traditional house with a view of the peaceful bamboo forest.",
        price: 400,
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
      name: { [Op.in]: ['Valley View Homestay','Hidden Leaf Homestay', 'Sannin Peaks', 'Uchiha Clan Residence', 'The Sharingan', 'Haruno Blossom Retreat', 'Haruno Garden Oasis', 'Kurosaki Villa', 'Hueco Mundo', 'Kuchiki Clan Estate', 'Shirayuki Gardens', 'Kuchiki Temples', 'Senbonzakura'] }
    }, {})
  }
};
