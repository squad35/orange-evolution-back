const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

//Criando a conexão com o banco...
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//open the mysql connection...
connection.connect(error => {
    if(error) throw error;
    console.log('Banco de dados conectado com sucesso!');
});

module.exports = connection;