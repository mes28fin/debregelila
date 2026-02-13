const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false, // Cleaner logs in production
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: {
        rejectUnauthorized: false
      }
    } : {},
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.attendance = require("./attendance.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);

module.exports = db;
