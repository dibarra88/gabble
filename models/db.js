const config = require('config')
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: config.get('db.host'),
    database: config.get('db.database'),
    user: config.get('db.user'),
    password: config.get('db.password'),
    charset: 'utf8mb4'
  })

  module.exports = conn