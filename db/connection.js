const mysql2 = require("mysql2")

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employees_db"
})

connection.connect(function(err) {
    if (err) throw err;
})

module.exports = connection