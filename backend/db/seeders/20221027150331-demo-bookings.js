"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "Bookings";

const dateFormatter = (date) =>
  new Date(Date.parse(date)).toISOString().split("T")[0];
const BookingData = [
  {
    spotId: 1,
    userId: 3,
    startDate: dateFormatter("2023-09-25"),
    endDate: dateFormatter("2023-09-28"),
  },
  {
    spotId: 2,
    userId: 5,
    startDate: dateFormatter("2023-05-10"),
    endDate: dateFormatter("2023-05-18"),
  },
  {
    spotId: 3,
    userId: 8,
    startDate: dateFormatter("2023-02-10"),
    endDate: dateFormatter("2023-02-16"),
  },
  {
    spotId: 4,
    userId: 2,
    startDate: dateFormatter("2023-06-08"),
    endDate: dateFormatter("2023-06-15"),
  },
  {
    spotId: 5,
    userId: 1,
    startDate: dateFormatter("2023-05-15"),
    endDate: dateFormatter("2023-05-18"),
  },
  {
    spotId: 6,
    userId: 4,
    startDate: dateFormatter("2023-08-20"),
    endDate: dateFormatter("2023-08-22"),
  },
  {
    spotId: 7,
    userId: 6,
    startDate: dateFormatter("2023-12-20"),
    endDate: dateFormatter("2023-12-28"),
  },
  {
    spotId: 8,
    userId: 2,
    startDate: dateFormatter("2023-09-01"),
    endDate: dateFormatter("2023-09-05"),
  },
  {
    spotId: 9,
    userId: 4,
    startDate: dateFormatter("2023-10-10"),
    endDate: dateFormatter("2023-10-11"),
  },
  {
    spotId: 10,
    userId: 7,
    startDate: dateFormatter("2023-05-23"),
    endDate: dateFormatter("2023-05-25"),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, BookingData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {});
  },
};
