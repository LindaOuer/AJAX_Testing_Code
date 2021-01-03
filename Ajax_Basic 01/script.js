let textButton = document.querySelector('#text-btn')

textButton.addEventListener('click', function () {
    // Create an AJAX Request
    let xhr = new XMLHttpRequest()

    // Prepare the request
    xhr.open('GET', './Data/message.txt', true)

    // Send the request
    xhr.send()

    // Process the request
    xhr.onload = () => {
        if (xhr.status === 200) { // successful response
            let data = xhr.responseText
            displayTextData(data)
        }
    }
})

let displayTextData = (data) => {
    document.querySelector('#text-card').innerHTML = `<h3>${data} </h3>` 
}

let jsonButton = document.querySelector('#json-btn')

jsonButton.addEventListener('click', function () {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', './Data/mobile.json', true)

    xhr.send()

    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = xhr.responseText

            let mobile = JSON.parse(data)

            displayJsonData(mobile)
        }
    }
})

let displayJsonData = (data) => {
    document.querySelector('#json-card').innerHTML = `
                <ul class = "list-group mt-1">
                    <li class = "list-group-item">ID: ${data.id}</li> 
                    <li class = "list-group-item">Brand: ${data.brand}</li> 
                    <li class = "list-group-item">Color: ${data.color}</li> 
                    <li class = "list-group-item">Price: ${data.price}</li>                                 
                </ul>
                        ` 
}

let apiButton = document.querySelector('#api-btn')

apiButton.addEventListener('click', function () {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true)

    xhr.send()

    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = xhr.responseText

            let users = JSON.parse(data)

            displayApiData(users)
        }
    }
})

let displayApiData = (data) => {
    let htmlTemplate = ``
        
    data.forEach(element => {
        htmlTemplate+= `<ul class = "list-group mt-2">
                <li class = "list-group-item">ID: ${element.id}</li> 
                <li class = "list-group-item">Name: ${element.name}</li> 
                <li class = "list-group-item">Email: ${element.email}</li> 
                <li class = "list-group-item">Street: ${element.address.street}</li>  
                <li class = "list-group-item">City: ${element.address.city}</li>                               
            </ul>
            ` 
    });
    document.querySelector('#api-card').innerHTML = htmlTemplate         
}