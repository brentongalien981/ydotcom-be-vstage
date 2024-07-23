'use strict';
const { generateRandomUserRelationships } = require('../factories/userRelationshipFactory');
const db = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Generate user relationships attribs.
    const users = await db.User.findAll();
    const userRelationshipsAttribs = generateRandomUserRelationships(users);

    // Bulk insert user relationships.
    await queryInterface.bulkInsert("UserRelationships", userRelationshipsAttribs, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserRelationships", null, {});
  }
};
