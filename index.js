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
            choices : ['View Roles', 'Add Role', 'View Employees', 'Add Employee', 'View Departments', 'Add Department', 'Quit']
        }
    ]).then(answer => {
        switch (answer.startQuestion) {
            case 'View Roles':
                viewRoles()
                break;
            case 'Add Role':
                addRole()
                break;
            case 'View Employees':
                viewEmployees()
                break;
            case 'Add Employee':
                addEmployee()
                break;    
            case 'View Departments':
                viewDeparments()
                break;
            case 'Add Department':
                addDepartment()
                break; 
            default:
                connect.end()
        }
    })
}

function viewRoles() {
    console.log('view all tables in a join')
    connect.query("SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id", (err,data) => {
        if(err) throw err;
        console.log('')
        console.table(data)
    })
    startQuestion()
}

function addRole(){
    console.log('Add role to role table')
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the title for the new role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this new role?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the department id for this new role?',
        }
    ])
    .then(answer => {
        connect.query(`INSERT INTO role VALUES(id,'${answer.role}', ${answer.salary}, ${answer.id})`, (err,data) => {
        if(err) throw err;
        console.log('')
        viewRoles()

    })
})
}

function viewEmployees() {
    console.log('view only employees table');
    connect.query("SELECT * FROM employee", (err,data) => {
        if(err) throw err;
        console.log('')
        console.table(data)
    })
    startQuestion()
}

function addEmployee(){
    console.log('Add employee to employee table')
    startQuestion()
}

function viewDeparments() {
    connect.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data)
    })
    startQuestion()
}

function addDepartment(){
    console.log('Add department to department table')
    startQuestion()
}