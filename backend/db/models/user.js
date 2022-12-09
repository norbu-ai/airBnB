'use strict';
const { Model, Validator } = require('sequelize'); 
const bcrypt = require('bcryptjs'); 

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // all User model instance methods below 

    // return an object with only the User instance-infos safe to be saved to a JWT i.e. id, username, email
    toSafeObject(){
      const { id, username, email, firstName, lastName} = this; // context: User instance 
      return { id, username, email, firstName, lastName }; 
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
    // credential: username or email either would be allowed 
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
    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password); 
      const user = await User.create({
        username, 
        email, 
        hashedPassword, 
        firstName, 
        lastName
      }); 
      return await User.scope('currentUser').findByPk(user.id); 
    }


    static associate(models) {
      // define association here
      User.hasMany(models.Spot, {foreignKey: 'ownerId'}); 
      User.hasMany(models.Booking, {foreignKey: 'userId'}); 
      User.hasMany(models.Review, {foreignKey: 'userId'}); 
      User.belongsToMany(models.Spot, {through: models.Booking, foreignKey: 'userId', otherKey: 'spotId'}); 
      User.belongsToMany(models.Spot, {through: models.Review, foreignKey: 'userId', otherKey: 'spotId'}); 
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
    firstName: {
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: {
        len: [1, 30]
      }
    }, 
    lastName: {
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: {
        len: [1, 30]
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
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt', 'firstName', 'lastName']
      }
    }, 
    scopes: {
      // define a User model scope for currentUser that will exclude only the hashedPassword field
      currentUser: {
        attributes: {
          exclude: ['hashedPassword', 'createdAt', 'updatedAt']
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