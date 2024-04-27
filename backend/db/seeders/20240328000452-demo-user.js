'use strict';

/** @type {import('sequelize-cli').Migration} */
const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        //ADD FIRSTNAME AND LASTNAME TO SEED
        firstName: 'Demo',
        lastName: 'Lition'
      },
      {
        email: 'naruto@leafvillage.io',
        username: 'NarutoUzumaki',
        hashedPassword: bcrypt.hashSync('nine-tails'),
        firstName: 'Naruto',
        lastName: 'Uzumaki'
      },
      {
        email: 'sasuke@uchiha.io',
        username: 'SasukeUchiha',
        hashedPassword: bcrypt.hashSync('revenge123'),
        firstName: 'Sasuke',
        lastName: 'Uchiha'
      },
      {
        email: 'sakura@haruno.io',
        username: 'SakuraHaruno',
        hashedPassword: bcrypt.hashSync('innerstrength'),
        firstName: 'Sakura',
        lastName: 'Haruno'
      },
      {
        email: 'ichigo@kurosaki.io',
        username: 'IchigoKurosaki',
        hashedPassword: bcrypt.hashSync('zangetsu'),
        firstName: 'Ichigo',
        lastName: 'Kurosaki'
      },
      {
        email: 'rukia@kuchiki.io',
        username: 'RukiaKuchiki',
        hashedPassword: bcrypt.hashSync('sode no shirayuki'),
        firstName: 'Rukia',
        lastName: 'Kuchiki'
      },
      {
        email: 'byakuya@kuchiki.io',
        username: 'ByakuyaKuchiki',
        hashedPassword: bcrypt.hashSync('senbonzakura'),
        firstName: 'Byakuya',
        lastName: 'Kuchiki'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'NarutoUzumaki', 'SasukeUchiha', 'SakuraHaruno', 'RukiaKuchiki', 'ByakuyaKuchiki'] }
    }, {});
  }
};
