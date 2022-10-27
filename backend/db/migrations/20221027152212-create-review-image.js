'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReviewImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {model: 'Reviews', key: 'id'}, 
        // on delete of a reviewImage, cascadingly, reviews associated with the reviewImage will be deleted
        onDelete: 'CASCADE'
      },
      url: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ReviewImages');
  }
};