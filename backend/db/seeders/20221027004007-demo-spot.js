'use strict';

const spotData = [
  {
    ownerId: 5, 
    address: '75 Eagle Landing St', 
    city: 'Brooklyn', 
    state: 'New York', 
    country: 'United States', 
    lat: -84.2343, 
    lng: 159.24567, 
    name: 'White Bride', 
    description: 'Boasting an array of sleek finishes and a thoughtful open plan layout, this immaculate 1-bedroom, 1-bathroom condo is a paradigm of contemporary Brooklyn living', 
    price: 235
  }, 
  {
    ownerId: 3, 
    address: '89 Courter Ave', 
    city: 'Houston', 
    state: 'Texas', 
    country: 'United States', 
    lat: -23.8987, 
    lng: 150.2345, 
    name: 'York Ville', 
    description: 'The building has an elevator, a bicycle room, private storage, and parking spaces. It is less than a block away from all the restaurants, shops, and grocery stores that line Rockaway Avenue', 
    price: 800
  }, 
  {
    ownerId: 9, 
    address: '123 Roseland Drive', 
    city: 'Phoenix', 
    state: 'Arizona', 
    country: 'United States', 
    lat: 58.34534, 
    lng: -165.234, 
    name: 'Old Babbler', 
    description: 'Nearby subway lines include the A/C/L/J. Pets are welcome.', 
    price: 550
  }, 
  {
    ownerId: 8, 
    address: '579 Atlantic St', 
    city: 'San Jose', 
    state: 'California', 
    country: 'United States', 
    lat: 80.34534, 
    lng: -134.234, 
    name: 'Drago Village', 
    description: 'Updated vanity with granite counters, and a beautiful tile and glass shower remodel make this entire room an owners retreat! Youll enjoy the back patio both morning and night', 
    price: 230
  }, 
  {
    ownerId: 4, 
    address: '76 Caroline Dr', 
    city: 'Columbus', 
    state: 'Ohio', 
    country: 'United States', 
    lat: -2.21443, 
    lng: 150.23435, 
    name: 'The Parkdon Square', 
    description: 'The Beautiful Kitchen Is The Heart Of The Home Complete With Large Customized Granite Island & Stainless Steel Appliances.', 
    price: 180
  }, 
  {
    ownerId: 6, 
    address: '876 Moose Ave', 
    city: 'Charlotte', 
    state: 'North Carolina', 
    country: 'United States', 
    lat: 55.2349, 
    lng: -139.6574, 
    name: 'Haling Cove', 
    description: 'Enjoy The Fully Fenced Backyard Perfect For Kids & Pets. The 2.5 Car Extended Garage Allows Room For Extra Storage Or Work Area.', 
    price: 250
  }, 
  {
    ownerId: 5, 
    address: '893 Hamilton St', 
    city: 'Denver', 
    state: 'Colorado', 
    country: 'United States', 
    lat: 45.9341, 
    lng: -118.5443, 
    name: 'Peterborough Town', 
    description: 'Stunning large late 80s contemporary home with soaring ceilings and windows, split levels, great floor plan including open dining and living room.', 
    price: 900
  }, 
  {
    ownerId: 4, 
    address: '242 Washington St', 
    city: 'El Paso', 
    state: 'Texas', 
    country: 'United States', 
    lat: -82.1222, 
    lng: 148.1240, 
    name: 'Old Norwich', 
    description: 'Located in the beautiful hilly and treed, desirable Windmill Hill section of Desoto you are conveniently located to shops, dining, and 20 minutes to downtown', 
    price: 800
  }, 
  {
    ownerId: 6, 
    address: '3 Monroe Ave', 
    city: 'Milwaukee', 
    state: 'Wisconsin', 
    country: 'United States', 
    lat: 2.034345, 
    lng: 93.5678, 
    name: 'Solaris Village', 
    description: '3 bedroom, 3.1 bath home is large and accommodating to both guests for entertaining with 2 living areas, office, wet bar, with a Master suite located on the 1st floor.', 
    price: 750
  }, 
  {
    ownerId: 8, 
    address: '10 Park Street', 
    city: 'Omaha', 
    state: 'Nebraska', 
    country: 'United States', 
    lat: -83.84920, 
    lng: -92.47789, 
    name: 'Eastern Trinzall', 
    description: 'Perfectly set on a tree-shaded lot, this North Waco beauty feels like home the minute you pull up. The living room is warm and inviting, centered by a wood-burning fireplace and built-in shelving.', 
    price: 680
  }
]; 

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Spots', spotData)
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Spots', {
    ownerId: {
      [Op.in]: [3, 4, 5, 6, 8, 9]
    }
   })
  }
};
