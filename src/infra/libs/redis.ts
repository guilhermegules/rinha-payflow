import { createClient } from "redis";

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on("error", (err) => console.error("Redis client Error", err));

export async function connectRedis() {
  await redisClient.connect();
}

export async function getValue(key: string): Promise<string | null> {
  const redisValue = await redisClient.get(key);
  return redisValue;
}

export async function setValue(
  key: string,
  value: string,
  ttlSeconds?: number
): Promise<string | null> {
  if (ttlSeconds) {
    return await redisClient.set(key, value, {
      expiration: { type: "EX", value: ttlSeconds },
    });
  }

  return await redisClient.set(key, value);
}

export async function push(key: string, value: any) {
  await redisClient.rPush(key, JSON.stringify(value));
}

/**
 *
 * @param key
 * @returns the first item on the list
 *
 * This is blocking until have the item
 */
export async function pop(key: string) {
  return await redisClient.blPop(key, 5);
}
