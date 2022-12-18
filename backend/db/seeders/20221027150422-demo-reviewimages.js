'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'ReviewImages'; 

const ReviewImagesData = [
  {
    reviewId: 1, 
    url: 'https://images.unsplash.com/photo-1665823331780-c6f91eb23ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzY5fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
  }, 
  {
    reviewId: 1, 
    url: 'https://images.unsplash.com/photo-1633250307378-5604b26a164b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzg4fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
  }, 
  {
    reviewId: 2, 
    url: 'https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzkyfHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
  }, 
  {
    reviewId: 3, 
    url: 'https://images.unsplash.com/photo-1472224371017-08207f84aaae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODQ1fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }, 
  {
    reviewId: 5, 
    url: 'https://images.unsplash.com/photo-1660361339525-d24a9965119b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODQ2fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }, 
  {
    reviewId: 5, 
    url: 'https://images.unsplash.com/photo-1526315251174-de0107e28fb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODU1fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }, 
  {
    reviewId: 8, 
    url: 'https://images.unsplash.com/photo-1629877053418-f278601c9428?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTA0fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }, 
  {
    reviewId: 8, 
    url: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTQ2fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }, 
  {
    reviewId: 9, 
    url: 'https://images.unsplash.com/photo-1565629196891-2ddb37c9e9fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAxMnx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  }, 
  {
    reviewId: 10, 
    url: 'https://images.unsplash.com/photo-1599409637219-d04e9a2db432?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAyM3x8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  }, 
  {
    reviewId: 4, 
    url: 'https://images.unsplash.com/photo-1585544314038-a0d3769d0193?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzgyfHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }, 
  {
    reviewId: 11, 
    url: 'https://images.unsplash.com/photo-1613368889129-9ca726d84391?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzc3fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }, 
  {
    reviewId: 7, 
    url: 'https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDAyfHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }, 
  {
    reviewId: 6, 
    url: 'https://images.unsplash.com/photo-1618168138573-fb0ca752e4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDA5fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  }
]; 

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, ReviewImagesData); 
  },

  async down (queryInterface, Sequelize) {
    // const Op = Sequelize.Op; 
    await queryInterface.bulkDelete(options, null, {})
      // reviewId: {[Op.in]: [1, 2, 3, 5, 8, 9, 10]}}
  }
};
