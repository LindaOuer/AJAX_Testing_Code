import { customHTTP } from './api/customHTTP.js';
let serverURL = `http://127.0.0.1:3000/api`

// DOM content loaded

window.addEventListener('DOMContentLoaded', function () {
    fetchEmployees()
})

// Add employee

let addForm = document.querySelector('#add-form')

addForm.addEventListener('submit', function (e) {
    e.preventDefault() //stop auto submit

    $('#modelAdd').modal('hide')

    /* let employee = {
        first_name : document.querySelector('#add-firstName').value,
        last_name: document.querySelector('#add-lastName').value,
        email : document.querySelector('#add-email').value,
        gender : document.querySelector('#add-gender').value,
        ip_address : document.querySelector('#add-IPaddress').value
    } */

    let employee = {
        first_name: document.querySelector('#add-firstName').value,
        last_name: document.querySelector('#add-lastName').value,
        email: document.querySelector('#add-email').value,
        gender: document.querySelector('#add-gender').value,
        ip_address: document.querySelector('#add-IPaddress').value
    }

    let http = new customHTTP()

    let url = `${serverURL}/employees`

    http.post(url, employee, (err, employees) => {
        if (err) throw err

        console.log(employee)
        fetchEmployees()
        clearForm()
    })
})


// click event on table 
let tableBody = document.querySelector('#table-body')

tableBody.addEventListener('click', function (e) {
    let targetElement = e.target

    let http = new customHTTP()

    let parentElement = targetElement.parentElement.parentElement // get the tr corresponding to the clicked button 

    let emplID = parentElement.firstElementChild.innerHTML


    let url = `${serverURL}/employees/${emplID}`

    if (targetElement.classList.contains('delete')) {

        http.delete(`${serverURL}/employees/${emplID}`, (err, employees) => {
            if (err) throw err
            
            fetchEmployees()
        })
    }

    if (targetElement.classList.contains('update')) {

        let geturl = `${serverURL}/employees`
        http.get(geturl, (err, employees) => {
            if (err) throw err
            let employee = employees.find((employee) => {
                return employee.id === emplID.trim()
            })

            $('#modelUpdate').modal('show')

            document.querySelector('#update-ID').value = employee.id
            document.querySelector('#update-firstName').value = employee.first_name
            document.querySelector('#update-lastName').value = employee.last_name
            document.querySelector('#update-email').value = employee.email
            document.querySelector('#update-gender').value = employee.gender
            document.querySelector('#update-IPaddress').value = employee.ip_address
            
            
        })
    }
})

let updateForm = document.querySelector('#update-form')

updateForm.addEventListener('submit', function (e) {
    e.preventDefault() //stop auto submit

    $('#modelUpdate').modal('hide')

    let emplID = document.querySelector('#update-ID').value

    let employee = {
        id: emplID,
        first_name: document.querySelector('#update-firstName').value,
        last_name: document.querySelector('#update-lastName').value,
        email: document.querySelector('#update-email').value,
        gender: document.querySelector('#update-gender').value,
        ip_address: document.querySelector('#update-IPaddress').value
    }

    let http = new customHTTP()

    http.put(`${serverURL}/employees/${emplID}`, employee, (err, employees) => {
        if (err) throw err
        fetchEmployees()
    })

})



let fetchEmployees = () => {
    let http = new customHTTP()

    let url = `${serverURL}/employees`

    http.get(url, (err, employees) => {
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
                            <td>
                                <button class="btn btn-warning btn-sm mt-2 update">Update</button>
                                <button class="btn btn-danger btn-sm mt-2 delete">Delete</button>
                            </td>                            
                        </tr>
                `
        }
        document.querySelector('#table-body').innerHTML = tableRows
}

let clearForm = () => {
    document.querySelector('#add-firstName').value = ''
    document.querySelector('#add-lastName').value = ''
    document.querySelector('#add-email').value = ''
    document.querySelector('#add-gender').value = ''
    document.querySelector('#add-IPaddress').value = ''
}