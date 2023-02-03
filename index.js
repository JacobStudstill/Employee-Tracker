const connect= require('./db/connection')
const inquirer = require('inquirer')
require('console.table') 

if (connect) {
    console.log("Datebase is running")
    startQuestion()
}

function startQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'startQuestion',
            message: "What would you like to do?",
            choices : ['View All', 'View Employees', 'View Departments', 'Quit']
        }
    ]).then(answer => {
        switch (answer.startQuestion) {
            case 'View All':
                viewAll()
                break;
            case 'View Employees':
                viewEmployees()
                break;
            case 'View Departments':
                viewDeparments()
                break;
            default:
                connect.end()
        }
    })
}

function viewAll() {
    console.log('view all tables in a join')
    connect.query("SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id", (err,data) => {
        if(err) throw err;
        console.log('')
        console.table(data)
    })
    startQuestion()
}

function viewEmployees() {
    console.log('view only employees table');
    startQuestion()
}

function viewDeparments() {
    connect.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data)
    })
    startQuestion()
}