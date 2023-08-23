import IORedis from "ioredis";
import logger from "../../../../utils/logger";
require('dotenv').config();

export default class RedisConnector {
  client: IORedis;
  constructor() {
    this.client = this.connect();
  }

  connect() {
    let client = new IORedis({
      host: process.env.REDIS_HOST,
      port: 6379,
      retryStrategy(times) {
        var delay = Math.min(times * 100, 2000);
        return delay;
      },
      maxRetriesPerRequest: 3
    });

    client.on("connect", () => {
      logger.info("Connected to redis");
    });

    client.on("error", err => {
      logger.error(`Redis error: ${err}`);
    });

    return client;
  }


  async get(key) {
    return await this.client.get(key);
  }
  async set(key, value) {
    await this.client.set(key, value);
    await this.client.expire(key, 900);
  }
}
