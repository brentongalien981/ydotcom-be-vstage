const { faker } = require("@faker-js/faker");
const bcryptjs = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const db = require("../models");




async function hashPassword(password) {

  // Generate bcryptjs salt with 10 rounds.
  const salt = await bcryptjs.genSalt(10);

  const hashedPassword = await bcryptjs.hash(password, salt);

  return hashedPassword;
}


async function generateHashedPassword() {

  // Generate bcryptjs salt with 10 rounds.
  const salt = await bcryptjs.genSalt(10);

  const password = faker.internet.password();
  const hashedPassword = await bcryptjs.hash(password, salt);

  return hashedPassword;
}


async function generateUserAttribs() {
  return {
    ...(await generateUserAttribsWithoutId()),
    id: uuidv4()
  };
}


async function generateUserAttribsWithoutId() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: await generateHashedPassword()
  };
}


async function generateUser() {
  const userAttribs = await generateUserAttribsWithoutId();
  const user = await db.User.create(userAttribs);
  return user;
}


async function generateUsers(numUsers = 1) {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const userAttribs = await generateUserAttribsWithoutId();
    const user = await db.User.create(userAttribs);
    users.push(user);

  }
  return users;
}


module.exports = {
  hashPassword,
  generateUserAttribs,
  generateUserAttribsWithoutId,
  generateHashedPassword,
  generateUser,
  generateUsers
};