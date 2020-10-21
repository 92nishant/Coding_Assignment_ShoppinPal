'use strict';
const db = {
    url: 'mongodb://mongo/'+process.env.MONGO_DBNAME
}

module.exports = db;
