const redis = require("redis");
const redisConfig = require("./redisConfig.js");

const redisClient = redis.createClient(redisConfig[process.env.NODE_ENV || 'development']);

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error(`Redis connection error: ${err}`);
});

module.exports = redisClient;
