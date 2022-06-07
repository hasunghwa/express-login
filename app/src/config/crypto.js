const crypto = require('crypto');

const createSalt = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("base64"));
    });
  });

const hash = {
  createHashedPassword: (plainPassword) =>
    new Promise(async (resolve, reject) => {
      const salt = await createSalt(); // 소금 만들어서 대입
      crypto.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
        if (err) reject(err);
        resolve({ password: key.toString("base64"), salt });
      });
    }),

  makePasswordHashed: (salt, plainPassword) =>
    new Promise(async (resolve, reject) => {        
      // 위에서 가져온 salt와 plainPassword를 다시 해시 암호화 시킴. (비교하기 위해)
      crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve(key.toString('base64'));
      });
    })
}
 
module.exports = hash;

