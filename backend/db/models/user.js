'use strict';
const { Model, Validator } = require('sequelize'); 
const bcrypt = require('bcryptjs'); 

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // all User instance methods below 

    // return an object with only the User instance info safe to save to a JWT i.e. id, username, email
    toSafeObject(){
      const { id, username, email } = this; // context: User instance 
      return { id, username, email }; 
    }; 

    // return boolean indicating a match between input password to User instance's hashedPassword
    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString()); 
    }; 

    // return a User with the 'id' using 'currentUser' scope defined on the 'User' model 
    static getCurrentUserById(id){
      return User.scope("currentUser").findByPk(id); 
    }

    // search for User with passed 'credential' & 'password', if found, validate 'password'
    // credential: username or email
    static async login({ credential, password }){
      const { Op } = require('sequelize'); 
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential, 
            email: credential
          }
        }
      }); 
      if (user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id); 
      }
    }; 

    // method accept object {username, email, password}
    // create a User instance with { username, email, hashedPassword}
    // return create 'user' applying 'currentUser' scope to the model instance 
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password); 
      const user = await User.create({
        username, 
        email, 
        hashedPassword
      }); 
      return await User.scope('currentUser').findByPk(user.id); 
    }


    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [4, 30], 
        isNotEmail(value) {
          if(Validator.isEmail(value)) {
            throw new Error("Cannot be an email."); 
          }
        }
      }
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [3, 256], 
        isEmail: true
      }
    }, 
    hashedPassword: {
      type: DataTypes.STRING.BINARY, 
      allowNull: false, 
      validate: {
        len: [60, 60]
      }
    }, 
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    }, 
    scopes: {
      // define a User model scope for currentUser that will exclude only the hashedPassword field
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      }, 
      // define another scope for including all the fields, which should only be used when checking the login credentials of a user.
      loginUser: {
        attributes: {}   //return all fields 
      }
    }

  });
  return User;
};