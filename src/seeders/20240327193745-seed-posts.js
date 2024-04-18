'use strict';

const { generatePostAttribsForUserId } = require('../factories/postFactory');
const db = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Get all users
    const users = await db.User.findAll();


    // Create 3 posts for every user.
    for (let i = 0; i < users.length; i++) {
      const u = users[i];

      const postsAttribs = generatePostAttribsForUserId(3, u.id);
     
      await db.Post.bulkCreate(postsAttribs);
    }    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts");
  }
};
