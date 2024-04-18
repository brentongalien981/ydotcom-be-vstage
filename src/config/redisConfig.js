require("dotenv").config();

export default {
  development: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    // Add more Redis configurations if needed
  },
  production: {

  },
  test: {

  }
  // Add more configurations for other environments if needed
};
