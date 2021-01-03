import { customHTTP } from "./api/customHTTP.js"

const serverURL = `http://127.0.0.1:3000/api/`

// GET button
let getButton = document.querySelector('#get-btn')

getButton.addEventListener('click', function () {
    fetchEmployees()
})


// POST button 
let postButton = document.querySelector('#post-btn')

postButton.addEventListener('click', function () {
    let http = new customHTTP()

    let employee = {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@gmail.com",
        gender: "female",
        ip_address: "127.0.0.4"
    }

    http.post(`${serverURL}/employees`, employee, (err, employees) => {
        if (err) throw err
        //console.log(JSON.stringify(employees))
        fetchEmployees()
    })
})

// put Button 
let putButton = document.querySelector('#put-btn')

putButton.addEventListener('click', function () {
    let http = new customHTTP()

    let emplID = "1";
    let employee = {
        id: emplID,
        first_name: "Joe",
        last_name: "Doe",
        email: "jane.doe@gmail.com",
        gender: "female",
        ip_address: "127.0.0.4"
    }

    http.put(`${serverURL}/employees/${emplID}`, employee, (err, employees) => {
        if (err) throw err
        fetchEmployees()
    })
})

let deleteButton = document.querySelector('#delete-btn')

deleteButton.addEventListener('click', function () {
    
    let http = new customHTTP()

    let emplID = "1";

    http.delete(`${serverURL}/employees/${emplID}`, (err, employees) => {
        if (err) throw err
        // console.log(JSON.stringify(employees))
        fetchEmployees()
    })
})

let fetchEmployees = () => {
    // AJAX calls
    let http = new customHTTP()
    http.get(`${serverURL}/employees`, (err, employees) => {
        if (err) throw err
        drawEmployees(employees)
    })
    
}

let drawEmployees = (employees) => {
    let tableRows = ''
        for (const empl of employees) {
            tableRows += `<tr>
                            <td>${empl.id}</td>
                            <td>${empl.first_name}</td>
                            <td>${empl.last_name}</td>
                            <td>${empl.email}</td>
                            <td>${empl.gender}</td>
                            <td>${empl.ip_address}</td>
                        </tr>
                `
        }
        document.querySelector('#table-body').innerHTML = tableRows
}
