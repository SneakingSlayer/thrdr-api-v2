import { scrypt, randomBytes, timingSafeEqual } from "crypto";

const keyLength = 32;

export const hash = async (password: string) => {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(16).toString("hex");

    scrypt(password, salt, keyLength, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}.${derivedKey.toString("hex")}`);
    });
  });
};

export const compare = async (password: string, hash: string) => {
  return new Promise((resolve, reject) => {
    const [salt, hashKey] = hash.split(".");
    const hashKeyBuff = Buffer.from(hashKey, "hex");
    scrypt(password, salt, keyLength, (err, derivedKey) => {
      if (err) reject(err);
      resolve(timingSafeEqual(hashKeyBuff, derivedKey));
    });
  });
};
