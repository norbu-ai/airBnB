'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
  
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId'}); 
      Review.belongsTo(models.User, {foreignKey: 'id', onDelete: 'CASCADE'}); 
      Review.belongsTo(models.Spot, {foreignKey: 'id', onDelete: 'CASCADE'}); 
    }
  }
  Review.init({
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
    review: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    stars: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      validate: {
        isInt: true, 
        min: 1, 
        max: 5
      }
    }, 
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};