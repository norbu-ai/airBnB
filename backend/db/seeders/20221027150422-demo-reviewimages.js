'use strict';

const ReviewImagesData = [
  {
    reviewId: 1, 
    url: 'https://unsplash.com/photos/OtXADkUh3-I'
  }, 
  {
    reviewId: 1, 
    url: 'https://unsplash.com/photos/DZrZhVd_wR0'
  }, 
  {
    reviewId: 2, 
    url: 'https://unsplash.com/photos/0SSPeyokubs'
  }, 
  {
    reviewId: 3, 
    url: 'https://unsplash.com/photos/xtDpXi_a-YQ'
  }, 
  {
    reviewId: 5, 
    url: 'https://unsplash.com/photos/9vvp_nuVaJk'
  }, 
  {
    reviewId: 5, 
    url: 'https://unsplash.com/photos/tHkJAMcO3QE'
  }, 
  {
    reviewId: 8, 
    url: 'https://unsplash.com/photos/9LMRQdVv7hw'
  }, 
  {
    reviewId: 8, 
    url: 'https://unsplash.com/photos/JDBVXignFdA'
  }, 
  {
    reviewId: 9, 
    url: 'https://unsplash.com/photos/cTOY_XallpY'
  }, 
  {
    reviewId: 10, 
    url: 'https://unsplash.com/photos/SxBca4GcC9k'
  }
]; 

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', ReviewImagesData); 
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op; 
    await queryInterface.bulkDelete('ReviewImages', {
      reviewId: {
        [Op.in]: [1, 2, 3, 5, 8, 9, 10]
      }
    })
  }
};
