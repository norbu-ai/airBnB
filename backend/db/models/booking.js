'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
  
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {foreignKey: 'id', onDelete: 'CASCADE'}); 
	    Booking.belongsTo(models.Spot, {foreignKey: 'id', onDelete: 'CASCADE'});
    }
  }
  Booking.init({
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    }, 
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {model: 'Spots', key: 'id'}, //optional
      onDelete: 'CASCADE'
    }, 
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {model: 'Users', key: 'id'}, //optional
      onDelete: 'CASCADE'
    }, 
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    }, 
    endDate: {
      type: DataTypes.DATE, 
      allowNull: false 
    }, 
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};