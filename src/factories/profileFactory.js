const { faker } = require("@faker-js/faker");
const My = require("../utils/My");
const db = require("../models");

async function generateProfileForUser(user) {
  const profileAttribs = generateProfileAttribs(user);
  return await db.Profile.create(profileAttribs);
}


function generateProfileAttribs(user) {
  return {
    userId: user.id,    
    country: faker.location.country(),
    hobby: generateRandomHobby(),
    profession: generateRandomProfession(),
    photoSource: generateRandomPhotoSource()
  };
}


function generateRandomHobby() {  

  const hobbies = [
    "piano", "guitar", "drums", "music", "video games", "anime", "baking", "cooking", "drawing", "painting", "browsing",
    "gym", "football", "basketball", "soccer", "baseball", "hockey", "slacking", "coding"
  ];

  const randomNum = My.getRandomNumber(0, hobbies.length - 1);

  return hobbies[randomNum];
}


function generateRandomProfession() {  

  const professions = [
    "nurse", "doctor", "teacher", "customer service", "real-estate agent", "entrepreneur", "software engineer",
    "IT manager", "chef", "baker", "store manager", "IT director", "marketing agent", "sales agent", "CEO", "CFO",
    "accountant", "dentist", "psychologist", "soldier"
  ];

  const randomNum = My.getRandomNumber(0, professions.length - 1);

  return professions[randomNum];
}


function generateRandomPhotoSource() {  

  const photoSources = [
    "penguin.jpg", "penguin2.jpg", "penguin3.png", "mrbean.jpeg", "lady.png", "greenrobot.png", "boy1.png", "skull.png",
    "man2.jpg", "man3.jpg", "boy4.jpg", "pika.jpg", "panda.jpeg", "panda2.jpg", "girl5.jpg", "lady3.jpg", "dog2.jpeg",
    "pixel.gif", "hoodie1.png", "girl6.jpeg", "bear2.jpg", "dog3.jpg", "girl7.jpg", "bag1.jpeg", "luffy.jpeg", "cork.png"
  ];

  const randomNum = My.getRandomNumber(0, photoSources.length - 1);

  return photoSources[randomNum];
}


module.exports = {
  generateProfileForUser,
  generateProfileAttribs
};