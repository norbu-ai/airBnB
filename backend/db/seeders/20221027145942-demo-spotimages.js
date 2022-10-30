'use strict';

const SpotImageData = [
  {
    spotId: 1, 
    url: 'https://unsplash.com/photos/2gDwlIim3Uw', 
    preview: true
  }, 
  {
    spotId: 1, 
    url: 'https://unsplash.com/photos/ylyn5r4vxcA', 
    preview: false
  }, 
  {
    spotId: 1, 
    url: 'https://unsplash.com/photos/JvQ0Q5IkeMM', 
    preview: false
  }, 
  {
    spotId: 2, 
    url: 'https://unsplash.com/photos/ujGLsMmXoBg', 
    preview: true
  }, 
  {
    spotId: 2, 
    url: 'https://unsplash.com/photos/5QLCohwVndQ', 
    preview: false
  }, 
  {
    spotId: 2, 
    url: 'https://unsplash.com/photos/3wylDrjxH-E', 
    preview: false
  }, 
  {
    spotId: 3, 
    url: 'https://unsplash.com/photos/koH7IVuwRLw', 
    preview: true
  }, 
  {
    spotId: 3, 
    url: 'https://unsplash.com/photos/gREquCUXQLI', 
    preview: false
  }, 
  {
    spotId: 3, 
    url: 'https://unsplash.com/photos/wR11KBaB86U', 
    preview: false
  }, 
  {
    spotId: 4, 
    url: 'https://unsplash.com/photos/5q1KnUjtjaM', 
    preview: true
  }, 
  {
    spotId: 4, 
    url: 'https://unsplash.com/photos/3_1f0ZGOjIY', 
    preview: false
  }, 
  {
    spotId: 4, 
    url: 'https://unsplash.com/photos/jn7uVeCdf6U', 
    preview: false
  }, 
  {
    spotId: 5, 
    url: 'https://unsplash.com/photos/iRiVzALa4pI', 
    preview: true
  }, 
  {
    spotId: 5, 
    url: 'https://unsplash.com/photos/jTCLppdwSEc', 
    preview: false
  }, 
  {
    spotId: 5, 
    url: 'https://unsplash.com/photos/FqqiAvJejto', 
    preview: false
  }, 
  {
    spotId: 6, 
    url: 'https://unsplash.com/photos/_r80LCluvVM', 
    preview: true
  }, 
  {
    spotId: 6, 
    url: 'https://unsplash.com/photos/CwTfKH5edSk', 
    preview: false
  }, 
  {
    spotId: 6, 
    url: 'https://unsplash.com/photos/AB-q9lwCVv8', 
    preview: false
  }, 
  {
    spotId: 7, 
    url: 'https://unsplash.com/photos/MP0bgaS_d1c', 
    preview: true
  }, 
  {
    spotId: 7, 
    url: 'https://unsplash.com/photos/nI4aC1kaTRc', 
    preview: false
  }, 
  {
    spotId: 7, 
    url: 'https://unsplash.com/photos/XCCAVA3BjhM', 
    preview: false
  }, 
  {
    spotId: 8, 
    url: 'https://unsplash.com/photos/idXQEOxhmvU', 
    preview: true
  }, 
  {
    spotId: 8, 
    url: 'https://unsplash.com/photos/7pCFUybP_P8', 
    preview: false
  }, 
  {
    spotId: 8, 
    url: 'https://unsplash.com/photos/6GruB-1L9kE', 
    preview: false
  }, 
  {
    spotId: 9, 
    url: 'https://unsplash.com/photos/yWwob8kwOCk', 
    preview: true
  }, 
  {
    spotId: 9, 
    url: 'https://unsplash.com/photos/LMq-rTluKfQ', 
    preview: false
  }, 
  {
    spotId: 9, 
    url: 'https://unsplash.com/photos/KUYZJUcviI4', 
    preview: false
  }, 
  {
    spotId: 10, 
    url: 'https://unsplash.com/photos/9vvp_nuVaJk', 
    preview: true
  }, 
  {
    spotId: 10, 
    url: 'https://unsplash.com/photos/1SbJCq-vHpI', 
    preview: false
  }, 
  {
    spotId: 10, 
    url: 'https://unsplash.com/photos/aeTexYQKsuk', 
    preview: false
  }
 
]; 

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', SpotImageData)
  },

  async down (queryInterface, Sequelize) {
    // const Op = Sequelize.Op; 
    await queryInterface.bulkDelete('SpotImages', null, {})
    // {spotId: {[Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}}
  }
};
