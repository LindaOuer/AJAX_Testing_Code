// Create an api router
// 7. modify package.json: add the script "start": "node app.js"    and use the command: node start to start the server

const { response, request } = require('express')
const express = require('express')

const router = express.Router()

// Employees Data
let employees = [
    {
        "id": "1",
        "first_name": "Leanne",
        "last_name": "Graham",
        "email": "Sincere@april.biz",
        "gender": "female",
        "ip_address": "127.0.0.1",
    },
    {
        "id": "2",
        "first_name": "Ervin",
        "last_name": "Howell",
        "email": "Shanna@melissa.tv",
        "gender": "male",
        "ip_address": "127.0.0.1",
    }
]

let getID = () => {
    return '_' + Math.random().toString(36).substr(2, 9)
}

// REST API configuration
// 6. Configure the GET -
// To access the data use the url: http://127.0.0.1:3000/api/employees
router.get('/employees', (request, response) => {
    response.json(employees)
})

// 8. POST request
router.post('/employees', (request, response) => {
    let employee = {
        "id": getID(),
        "first_name": request.body.first_name,
        "last_name": request.body.last_name,
        "email": request.body.email,
        "gender": request.body.gender,
        "ip_address": request.body.ip_address,
    }
    employees.push(employee)
    console.log(`POST Request recieved at server .. ${new Date().toLocaleDateString()}`)
    response.json({msg: 'POST Request is successful'})
})

// 9. PUT request
// request.params.id ==> gets the id from the url
router.put('/employees/:id', (request, response) => {
    
    let updateEmployee = {
        "id": request.params.id,
        "first_name": request.body.first_name,
        "last_name": request.body.last_name,
        "email": request.body.email,
        "gender": request.body.gender,
        "ip_address": request.body.ip_address,
    }
    let employee = employees.find((emp) => {
        return emp.id === request.params.id
    })

    employees.splice(employees.indexOf(employee), 1, updateEmployee)
    console.log(`PUT Request recieved at server .. ${new Date().toLocaleDateString()}`)
    response.json({msg: 'PUT Request is successful'})
})

// 10. DELETE Request
router.delete('/employees/:id', (request, response) => {

    employees = employees.filter((emp) => {
        return emp.id !== request.params.id
    })

    console.log(`DELETE Request recieved at server .. ${new Date().toLocaleDateString()}`)
    response.json({msg: 'DELETE Request is successful'})
})


module.exports = router