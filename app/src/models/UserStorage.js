"use strict";

const db = require("../config/db");
class UserStorage {
  // static getUsers(isAll, ...fields) { // 인자로 넘겨받은 필드만
  // }

  static getUserInfo(id) {
    // 인자로 받은 id값에 대한 유저정보
    return new Promise((resolve, reject) => {      
      const query = "SELECT * FROM users WHERE id = ?;"; 
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]);
      });
    });
  }

  static async save(userInfo) {     
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";
      db.query(
        query, 
        [userInfo.id, userInfo.name, userInfo.psword], 
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        });
    });
  }
}

module.exports = UserStorage;