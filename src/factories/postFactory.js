const { faker } = require("@faker-js/faker");
const My = require("../utils/My");
const { generateUserAttribsWithoutId } = require("./userFactory");
const db = require("../models");

async function generatePostAttribs(numOfPosts = 1) {

  const user = await db.User.create(await generateUserAttribsWithoutId());
  const postAttribs = [];

  for (let i = 0; i < numOfPosts; i++) {

    const attrib = {
      userId: user.id,
      message: faker.lorem.paragraph()
    };

    postAttribs.push(attrib);

  }

  return postAttribs;
}


function generatePostAttribsForUserId(numOfPosts = 1, userId) {

  const postAttribs = [];

  for (let i = 0; i < numOfPosts; i++) {

    const attrib = {
      userId: userId,
      message: faker.lorem.paragraph()
    };

    postAttribs.push(attrib);

  }

  return postAttribs;
}


async function generatePostForUserId(userId) {
  const postAttribs = generatePostAttribsForUserId(1, userId)[0];
  const post = await db.Post.create(postAttribs);
  return post;
}


module.exports = {
  generatePostAttribs,
  generatePostAttribsForUserId,
  generatePostForUserId
};