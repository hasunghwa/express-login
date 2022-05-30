"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser")
const app = express();

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`))
app.use(bodyParser.json());
// URL을 통해 전달되는 값이 한글, 공백같은 문자 처리 안되는거 해결
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home); // use -> 미들웨어

module.exports = app;