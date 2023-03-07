"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "Spots";

const spotData = [
  {
    ownerId: 1,
    address: "75 Eagle Landing St",
    city: "Brooklyn",
    state: "NY",
    country: "United States",
    lat: -84.2343,
    lng: 159.24567,
    name: "White Bride",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 235,
  },
  {
    ownerId: 3,
    address: "89 Courter Ave",
    city: "Houston",
    state: "TX",
    country: "United States",
    lat: -23.8987,
    lng: 150.2345,
    name: "York Ville",
    description:
      "Sasdorem ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 800,
  },
  {
    ownerId: 1,
    address: "123 Roseland Drive",
    city: "Phoenix",
    state: "AZ",
    country: "United States",
    lat: 58.34534,
    lng: -165.234,
    name: "Old Babbler",
    description:
      "Through ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 550,
  },
  {
    ownerId: 6,
    address: "579 Atlantic St",
    city: "San Jose",
    state: "CA",
    country: "United States",
    lat: 80.34534,
    lng: -134.234,
    name: "Drago Village",
    description:
      "Vanity ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 230,
  },
  {
    ownerId: 4,
    address: "76 Caroline Dr",
    city: "Columbus",
    state: "OH",
    country: "United States",
    lat: -2.21443,
    lng: 150.23435,
    name: "The Parkdon Square",
    description:
      "Incredible ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 180,
  },
  {
    ownerId: 2,
    address: "876 Moose Ave",
    city: "Charlotte",
    state: "NC",
    country: "United States",
    lat: 55.2349,
    lng: -139.6574,
    name: "Haling Cove",
    description:
      "Family ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 250,
  },
  {
    ownerId: 5,
    address: "893 Hamilton St",
    city: "Denver",
    state: "CO",
    country: "United States",
    lat: 45.9341,
    lng: -118.5443,
    name: "Hamilton Kings",
    description:
      "Crediblels ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 900,
  },
  {
    ownerId: 1,
    address: "242 Washington St",
    city: "El Paso",
    state: "TX",
    country: "United States",
    lat: -82.1222,
    lng: 148.124,
    name: "Old Norwich",
    description:
      "Jubildxe ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 800,
  },
  {
    ownerId: 8,
    address: "3 Monroe Ave",
    city: "Milwaukee",
    state: "WI",
    country: "United States",
    lat: 2.034345,
    lng: 93.5678,
    name: "Solaris Village",
    description:
      "Muscathraic ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 750,
  },
  {
    ownerId: 2,
    address: "10 Park Street",
    city: "Omaha",
    state: "NE",
    country: "United States",
    lat: -83.8492,
    lng: -92.47789,
    name: "Eastern Trinzall",
    description:
      "Unfathomagic ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 680,
  },
  {
    ownerId: 5,
    address: "75 Murray Hill",
    city: "Washington",
    state: "DC",
    country: "United States",
    lat: -34.8492,
    lng: -9.47789,
    name: "Eagle Landing",
    description:
      "Quixodically ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe, dolorum laboriosam aliquid odit corporis nemo quis accusantium fugit autem aperiam cupiditate ut vitae, vero possimus, sunt reiciendis. Accusamus, alias labore ex quo fugit et dolor molestiae ipsum inventore! Suscipit, ratione. Maiores ipsum adipisci rerum recusandae repellat officiis doloribus ducimus.",
    price: 480,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, spotData);
  },

  async down(queryInterface, Sequelize) {
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
    //  {ownerId: {[Op.in]: [3, 4, 5, 6, 8, 9]}}
  },
};
