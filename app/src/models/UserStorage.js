"use strict";

class UserStorage {
  static #users = {
    id: ["나개발", "김팀장"],
    psword: ["1234", "123456"],
    name: ["나개발", "김팀장"],
  };

  static getUsers(...fields) { // 인자로 넘겨받은 필드만 
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }
  
  static getUserInfo(id) { // 인자로 받은 id값에 대한 유저정보
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users);
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {})

    return userInfo;
  }
}

module.exports = UserStorage;