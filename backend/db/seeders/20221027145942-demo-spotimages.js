"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "SpotImages";

const SpotImageData = [
  {
    spotId: 1,
    url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1765&q=80",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://images.unsplash.com/photo-1479292889369-1a48f234247e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFwYXJ0bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1826&q=80",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://media.istockphoto.com/id/1406585605/photo/modern-bathroom-with-old-beige-walls-concrete-floor.jpg?s=612x612&w=0&k=20&c=fFZQIqsC5JNUw4Nvd7vxOTlnJlrR6XWZR0hfxU5xv0M=",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://images.unsplash.com/photo-1638454795595-0a0abf68614d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmVhdXRpZnVsJTIwaG91c2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYXV0aWZ1bCUyMGhvdXNlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw4Njg5Nzg4fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8ODY4OTc4OHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGJlYXV0aWZ1bCUyMGhvdXNlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://images.unsplash.com/photo-1600360694537-2c1601501a27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fGJlYXV0aWZ1bCUyMGhvdXNlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGx1eHVyeSUyMGFwYXJ0bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://images.unsplash.com/photo-1545457060-fa0ce5cffdc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://plus.unsplash.com/premium_photo-1661843926966-679bd9242e32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://images.unsplash.com/photo-1434434319959-1f886517e1fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA2fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://images.unsplash.com/photo-1496328289142-9a47ef5b544b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://images.unsplash.com/photo-1583743089745-1b4da736bd6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA4fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://images.unsplash.com/photo-1571654443889-863482ff3f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIwfHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://plus.unsplash.com/premium_photo-1661954372617-15780178eb2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMxfHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://images.unsplash.com/photo-1561753757-d8880c5a3551?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://images.unsplash.com/photo-1521543387600-c745f8e83d77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU2fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://plus.unsplash.com/premium_photo-1661930527039-f809e14b8102?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTYwfHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjE1fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://images.unsplash.com/photo-1571654443889-863482ff3f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://images.unsplash.com/photo-1604696533648-651a298b069f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzAyfHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: true,
  },
  {
    spotId: 10,
    url: "https://plus.unsplash.com/premium_photo-1661962720375-ce9097fb4d69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzAzfHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://images.unsplash.com/photo-1562932831-afcfe48b5786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://images.unsplash.com/photo-1610295186968-7ad29a75199e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://images.unsplash.com/photo-1602075432748-82d264e2b463?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: true,
  },
  {
    spotId: 11,
    url: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://images.unsplash.com/photo-1625690027053-1ca198dc4c8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://images.unsplash.com/photo-1568749655433-5fe22f634ab8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1878&q=80",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    preview: false,
  },
];

/*
https://images.unsplash.com/photo-1585544314038-a0d3769d0193?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzgyfHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60
https://images.unsplash.com/photo-1613368889129-9ca726d84391?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzc3fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60
https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDAyfHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60
https://images.unsplash.com/photo-1618168138573-fb0ca752e4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDA5fHxsdXh1cnklMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60
*/

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, SpotImageData);
  },

  async down(queryInterface, Sequelize) {
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
    // {spotId: {[Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}}
  },
};
