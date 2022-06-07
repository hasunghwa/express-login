"use strict";

const UserStorage = require("./UserStorage");
const hash = require("../config/crypto");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      const user = await UserStorage.getUserInfo(client.id);
      
      const password = await hash.makePasswordHashed(user.salt, client.psword);
      
      if (user) {
        if (user.id === client.id && user.psword === password) {
          return { success: true };
        }
        return { success: false, msg: "비밀번호가 틀렸습니다." };
      }
      return { success: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
      return { success: false, err };
    }   
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch(err) {
      return { success: false, err };
    }
  }
}

module.exports = User;