"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "Reviews";

const ReviewsData = [
  {
    spotId: 1,
    userId: 2,
    review:
      "Neighborhood here is actually better - livelier with tons of restaurants, music in the summer, a great park down the street",
    stars: 3,
  },
  {
    spotId: 1,
    userId: 5,
    review:
      "The building is awesome, close to downtown Bethesda and all the essential shops, and everything is in top quality, and the maintenance team is always punctual and efficient. ",
    stars: 4,
  },
  {
    spotId: 1,
    userId: 7,
    review:
      "Totally safe and clean community, but after the manager was changed around beginning of 2022, we havent got any email to notify events in this apartment.",
    stars: 3,
  },
  {
    spotId: 1,
    userId: 8,
    review:
      "Undomulating ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 3,
  },
  {
    spotId: 2,
    userId: 8,
    review:
      "Poor move-in experience, unit was basically a disaster. Doors missing, toilet a mess, kitchen cabinet doors misaligned, bike storage is a cluster.",
    stars: 2,
  },
  {
    spotId: 2,
    userId: 6,
    review:
      "The community is very inclusive and the staff are extremely friendly, professional and courteous. ",
    stars: 4,
  },
  {
    spotId: 3,
    userId: 3,
    review:
      "This is a fantastic place to live. It has great amenities, the staff is very friendly and helpful, and with the location you have convenient access to both the freeways and shopping centers. ",
    stars: 5,
  },
  {
    spotId: 3,
    userId: 7,
    review:
      "Hostunic ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 4,
  },
  {
    spotId: 4,
    userId: 1,
    review:
      "About average community in the south SJ. Apartment was not cleaned properly at the move-in. ",
    stars: 3,
  },
  {
    spotId: 5,
    userId: 6,
    review:
      "Love the location and I love the property -it is very well kept! Resident events, friendly neighbors and property manager is awesome!",
    stars: 5,
  },
  {
    spotId: 5,
    userId: 3,
    review: "It feels like a personal hotel here with the pool gym dog park.",
    stars: 4,
  },
  {
    spotId: 6,
    userId: 8,
    review:
      "People park where they want without the cars be registered. Need to be more strict those policies. ",
    stars: 3,
  },
  {
    spotId: 6,
    userId: 2,
    review:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 3,
  },
  {
    spotId: 6,
    userId: 1,
    review:
      "Crid ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 4,
  },
  {
    spotId: 8,
    userId: 3,
    review:
      "Thraxught ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 3,
  },
  {
    spotId: 8,
    userId: 4,
    review:
      "Muluxant ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 4,
  },
  {
    spotId: 9,
    userId: 4,
    review:
      "Numination ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 4,
  },
  {
    spotId: 9,
    userId: 5,
    review:
      "Frudient ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 5,
  },
  {
    spotId: 10,
    userId: 3,
    review:
      "Hudoughmi ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 3,
  },
  {
    spotId: 10,
    userId: 6,
    review:
      "Awesome ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 4,
  },
  {
    spotId: 11,
    userId: 1,
    review:
      "Phunixan ipsum, dolor sit amet consectetur adipisicing elit. Quasi fuga eum quos unde dolorem doloribus temporibus provident. Fugit, ab deleniti.",
    stars: 4,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, ReviewsData);
  },

  async down(queryInterface, Sequelize) {
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
    // spotId: {[Op.in]: [1, 2, 3, 5, 6, 8, 9, 10]}}
  },
};
