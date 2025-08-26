require('dotenv').config();
const connect_DB = require('./mongoose');
module.exports= {
    PORT: process.env.PORT || 3001,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    connect_DB
}
