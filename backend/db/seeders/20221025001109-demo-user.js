"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "Users";

const UsersData = [
  {
    email: "demo@user.io",
    username: "demolition",
    firstName: "Demo",
    lastName: "User",
    hashedPassword: bcrypt.hashSync("password1"),
  },
  {
    email: "akyeshi@google.com",
    username: "akyeshi",
    firstName: "Achok Khenrap",
    lastName: "Yeshi",
    hashedPassword: bcrypt.hashSync("scientist"),
  },
  {
    email: "michael@user.io",
    username: "michael345",
    firstName: "Michael",
    lastName: "Johnson",
    hashedPassword: bcrypt.hashSync("password2"),
  },
  {
    email: "alexvski@user.io",
    username: "alexvolski",
    firstName: "Alexander",
    lastName: "Volkanoski",
    hashedPassword: bcrypt.hashSync("password3"),
  },
  {
    email: "leonedward@user.io",
    username: "leon5edward",
    firstName: "Leon",
    lastName: "Edwards",
    hashedPassword: bcrypt.hashSync("password5"),
  },
  {
    email: "francisNganou@user.io",
    username: "francisNgannou",
    firstName: "Francis",
    lastName: "Ngannou",
    hashedPassword: bcrypt.hashSync("password6"),
  },
  {
    email: "charlesoliveria@user.io",
    username: "oliver4king",
    firstName: "Charles",
    lastName: "Oliveira",
    hashedPassword: bcrypt.hashSync("password7"),
  },
  {
    email: "jonnybonejones@user.io",
    username: "jonnybone",
    firstName: "Jon",
    lastName: "Jones",
    hashedPassword: bcrypt.hashSync("password10"),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, UsersData, {});
  },

  async down(queryInterface, Sequelize) {
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  },
};
