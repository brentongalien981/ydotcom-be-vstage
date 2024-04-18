'use strict';

const { generateUserAttribs, hashPassword } = require('../factories/userFactory');
const My = require('../utils/My');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const usersAttribs = [];

    // My defined users.
    usersAttribs.push({ id: My.generateUuid(), username: "a", email: "a@a.com", password: await hashPassword("abcd1234") });
    usersAttribs.push({ id: My.generateUuid(), username: "dddd", email: "dddd@a.com", password: await hashPassword("abcd1234") });


    // Random users.
    for (let id = 0; id < 10; id++) {
      const userData = await generateUserAttribs();
      usersAttribs.push(userData);
    }

    await queryInterface.bulkInsert("Users", usersAttribs, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
