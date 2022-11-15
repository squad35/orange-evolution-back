const Pool = require('pg').Pool;
const dbConfig = require('../config/db.config.js');

//Criando a conexão com o banco...
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    // ssl: {
    //     rejectUnauthorized: false
    // },
    port: 5432
});

module.exports = pool;