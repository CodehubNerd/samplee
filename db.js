const mysql = require('mysql');

function db() {
    mysql.createPool({
        host: 'localhost',
        user:'root',
        password:'1234',
        database:'nuafricadb'
    })
}

module.exports = db;
