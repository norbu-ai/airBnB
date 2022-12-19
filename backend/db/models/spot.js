'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
  
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'id', onDelete: 'CASCADE'}); 
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId'}); 
      Spot.hasMany(models.Booking, {foreignKey: 'spotId'}); 
      Spot.hasMany(models.Review, {foreignKey: 'spotId'}); 
      Spot.belongsToMany(models.User, {through: models.Booking, foreignKey: 'spotId', otherKey: 'userId', onDelete: 'CASCADE'});
      Spot.belongsToMany(models.User, {through: models.Review, foreignKey: 'spotId', otherKey: 'userId', onDelete: 'CASCADE'}); 
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: {model: 'Users', key: 'id'}, //optional
      onDelete: 'CASCADE'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [1, 255]
      }
    }, 
    city: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [1, 255]
      }
    }, 
    state: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [1, 255]
      }
    }, 
    country: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [1, 255]
      }
    }, 
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false, 
      validate: {
        min: -90, 
        max: 90
      }
    }, 
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false, 
      validate: {
        min: -180, 
        max: 180
      }
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [1, 50]
      }
    }, 
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    }, 
    price: {
      type: DataTypes.DECIMAL, 
      allowNull: false, 
      validate: {
        isInt: true, 
        min: 1
      }
    }, 
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};