
const config = require('./index'); 

// key into index.js file object i.e. 'config' to access local environment variables 
module.exports = {
  development: {
    storage: config.dbFile, 
    dialect: "sqlite", 
    seederStorage: "sequelize", 
    logQueryParameters: true, 
    typeValidation: true
  }, 
  production: {
    use_env_variable: 'DATABASE_URL', 
    dialect: 'postgres', 
    seederStorage: 'sequelize', 
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false 
      }
    }, 
    define: {
      schema: process.env.SCHEMA
    }
  }
}; 

/* 

• this will allow you to load the database configuration environment variables 
from the .env file into the config/index.js 

• when you deploy application to production, your database will be read from 
a URL path instead of a local database file 

• in production: you will also use 'postgres' as a production-level rdbms rather 'sqlite3'


*/