const mysql = require('mysql')

module.exports = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'userAngular',
        password: '1232019An',
        database: 'shop_bodega'
    })
}