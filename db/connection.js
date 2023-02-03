const mysql2 = require("mysql2")

const connect = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db"
})

connect.connect(function(err) {
    if (err) throw err;
})

module.exports = connect