'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {model: 'Spots', key: 'id'}, 
        //if you delete booking, spot associated with the booking will be deleted
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {model: 'Users', key: 'id'}, 
        // if you delete booking, user associated with the booking will be deleted 
        onDelete: 'CASCADE'
      },
      startDate: {
        type: Sequelize.DATE, 
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE, 
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
    await queryInterface.dropTable('Bookings');
  }
};