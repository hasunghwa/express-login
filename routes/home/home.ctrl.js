"use strict";

const home = (req, res) => {
  res.render("index");
};

const login = (req, res) => {
  res.render("login");
}

module.exports = {
  home,
  login,
};