'use strict';

const { generateProfileAttribs } = require('../factories/profileFactory');
const db = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Query all seeded users and create profiles for them.
    const users = await db.User.findAll();
  
    const profileAttribs = [];
    for (const u of users) {
      profileAttribs.push(generateProfileAttribs(u))
    }

    await db.Profile.bulkCreate(profileAttribs);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
