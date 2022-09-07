const fs = require("fs");
const path = require("path");

const profileHome = (req, res, next) => {
  /* file path change to dot dot and jion */
  res.sendFile(path.join(__dirname + "/../views/index.html"));
};

const profileAddress = (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/address.html"));
};
const profileOrderHistory = (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/history.html"));
};
const profileEducation = (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/education.html"));
};

module.exports = {
  profileHome,
  profileAddress,
  profileOrderHistory,
  profileEducation
};
