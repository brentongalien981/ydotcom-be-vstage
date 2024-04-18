'use strict';

const { generateVideoAttribs } = require('../factories/videoFactory');
const db = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get all posts
    const posts = await db.Post.findAll();

    const videosAttribs = generateVideoAttribs(posts);

    await db.Video.bulkCreate(videosAttribs);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Videos', null, {});
  }
};
