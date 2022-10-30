'use strict';
const bcrypt = require('bcryptjs'); 

const UsersData = [
  {
    email: 'demo@user.io', 
    username: 'Demo-lition', 
    firstName: 'fname1', 
    lastName: 'lname1', 
    hashedPassword: bcrypt.hashSync('password1')
  }, 
  {
    email: 'user2@user.io', 
    username: 'FakeUser2', 
    firstName: 'fname2', 
    lastName: 'lname2', 
    hashedPassword: bcrypt.hashSync('password2')
  }, 
  {
    email: 'user3@user.io', 
    username: 'FakeUser3', 
    firstName: 'fname3', 
    lastName: 'lname3', 
    hashedPassword: bcrypt.hashSync('password3')
  }, 
  {
    email: 'user4@user.io', 
    username: 'FakeUser4', 
    firstName: 'fname4', 
    lastName: 'lname4', 
    hashedPassword: bcrypt.hashSync('password4')
  }, 
  {
    email: 'user5@user.io', 
    username: 'FakeUser5', 
    firstName: 'fname5', 
    lastName: 'lname5', 
    hashedPassword: bcrypt.hashSync('password5')
  }, 
  {
    email: 'user6@user.io', 
    username: 'FakeUser6', 
    firstName: 'fname6', 
    lastName: 'lname6', 
    hashedPassword: bcrypt.hashSync('password6')
  }, 
  {
    email: 'user7@user.io', 
    username: 'FakeUser7', 
    firstName: 'fname7', 
    lastName: 'lname7', 
    hashedPassword: bcrypt.hashSync('password7')
  }, 
  {
    email: 'user8@user.io', 
    username: 'FakeUser8', 
    firstName: 'fname8', 
    lastName: 'lname8', 
    hashedPassword: bcrypt.hashSync('password8')
  }, 
  {
    email: 'user9@user.io', 
    username: 'FakeUser9', 
    firstName: 'fname9', 
    lastName: 'lname9', 
    hashedPassword: bcrypt.hashSync('password9')
  }, 
  {
    email: 'user10@user.io', 
    username: 'FakeUser10', 
    firstName: 'fname10', 
    lastName: 'lname10', 
    hashedPassword: bcrypt.hashSync('password10')
  }, 
 ]; 

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Users', UsersData, {})
  },

  async down (queryInterface, Sequelize) {
    // const Op = Sequelize.Op; 
    await queryInterface.bulkDelete('Users', null, {})
  }
};
