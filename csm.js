const mysql = require ("mysql");
const inquirer = require ("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "Project_3psilon",
    database: "csm_db"
});

connection.connect(function (err) {
    if (err) throw err;
    startMenu();
});

function startMenu() {
    inquirer
        .prompt({
            name:"action",
            type: "rawlist",
            message: "Hello, what would you like to do today?",
            choices: [
                "Add Department",
                "Add Role",  
                "Add Employee",
                "View Departments", 
                "View Roles", 
                "View Employees",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function(answer) {
            if (answer.action === "Add Deparment") {
                addDepartment();
            }
            else if (answer.action === "Add Role") {
                addRole();
            }
            else if (answer.action === "Add Employee") {
                addEmployee();
            }
            else if (answer.action === "View Department") {
                viewDepartments();
            }
            else if (answer.action === "View Roles") {
                viewRoles();
            }
            else if (answer.action === "View Employees") {
                viewEmployees();
            }
            else if (answer.action === "Update Employee Role") {
                updateEmpRole();
            } else {
                connection.end();
            }
        });
}

function addDepartment() {
    inquirer
        .prompt ([
            {
                name: "DepartmentName",
                type: "input",
                message: "What is the name of the department that you would like to add?"
            }
        ])
        .then((answer) => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    dep_name: answer.DepartmentName
                },
                (err) => {
                    if(err) throw err;
                    console.log("Department has been added successfully!");
                    startMenu();
                }
            );
        });

}

function addRole() {
    inquirer
        .prompt ([
            {
                name: "TitleName",
                type: "input",
                message: "What title would you like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the average salary associated with this role?"
            },
            {
                name:"depID",
                type: "input",
                message: "Please provide the department Id"
            }
        ])
        .then((answer) => {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.TitleName,
                    salary: answer.salary,
                    department_id: depID
                },
                (err) => {
                    if(err) throw err;
                    console.log("Information has been added successfully!");
                    startMenu();
                }
            );
        });

}

function addEmployee() {
    inquirer
        .prompt ([
            {
                name: "firstEmpName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastEmpName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "roleID",
                type: "input",
                message: "What is the employee's Role ID (Please note: This information can be found in the email that was provided by HR)?"
            },
            {
                name: "managerID",
                type: "input",
                message: "What is the employee's Manager ID?"
            },
            
        ])
        .then((answer) => {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstEmpName,
                    last_name: answer.lastEmpName,
                    role_id: answer.roleID,
                    manager_id: answer.managerID
                },
                (err) => {
                    if(err) throw err;
                    console.log("Employee information has been added successfully!");
                    startMenu();
                }
            );
        });

}

function viewDepartments() {
    connection.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;
        startMenu();
    })
}

function viewRoles() {
    connection.query("SELECT * FROM roles", (err, results) => {
        if (err) throw err;
        startMenu();
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        startMenu();
    })
}

function updateEmpRole() {
    connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
            {
                role_id: answer
            }
        ]
    )
    startMenu();
}