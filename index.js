const connect= require('./db/connection')
const inquirer = require('inquirer')
require('console.table') 

if (connect) {
    console.log(" ------------------------")
    console.log("|                        |")
    console.log("|                        |")
    console.log("|                        |")
    console.log("|                        |")
    console.log("|    Employee Manager    |")
    console.log("|                        |")
    console.log("|                        |")
    console.log("|                        |")
    console.log("|                        |")
    console.log("|                        |")
    console.log(" ------------------------")

    startQuestion()
}

function startQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'startQuestion',
            message: "What would you like to do?",
            choices : ['View Roles', 'Add Role', 'Update Employee Role', 'View Employees', 'Add Employee', 'View Departments', 'Add Department', 'Quit']
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
            case 'Update Employee Role':
                updateEmployee()
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

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter the new employee role:'
            },
        ])
        .then(answers => {
            const { firstName, lastName, newRole } = answers;

            let updateRole = `UPDATE employee SET role_id = '${newRole}' WHERE first_name = '${firstName}' AND last_name = '${lastName}'`;

            connect.query(updateRole, (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Successfully updated ${firstName} ${lastName} to role ID# ${newRole}`);
                }
            });
            viewEmployees()
        });
}

function viewDeparments() {
    connect.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data)
    })
    startQuestion()
}

function addDepartment() {
    inquirer.prompt([
        {
        type: 'input',
        name: 'newDepartment',
        message: "What is your new department's name?"
        }
    ])
    .then(answer => {
        console.log(answer);
        connect.query(`INSERT INTO department (name) VALUES('${answer.newDepartment}')`, (err, data) => {
            if (err) throw err;
            console.log(" ")
            viewDeparments()
            })
        })
    };